/*jslint esversion:6, node: true */

var defaults      = require('stream-defaults'),
    thru          = require('through2'),
    mail          = require('mailgun-stream'),
    hideRecipient = require('./hideRecipient'),
    thread        = require('./threading'),
    log           = require('stream-output/obj'),
    opts          = {
      hideRecipient:  false,
      msg:            'mailgun msg',
      rcp:            '',
      subject:        'grunt-mailgun',
      body:           'grunt-mailgun'
    };


function start (obj) {
  var stream = thru.obj();
  stream.write(obj);
  return stream;
}

function output (obj) {
  obj.log("Sent " + obj.msg + obj.rcp);
}

module.exports = function (options, cb) {
  if (!options.key) { throw("Missing Mailgun API key"); }
  if (!options.domain) { throw("Missing Mailgun domain"); }
  mail.config({
    key: options.key,
    domain: options.domain
  });

  start(options)
    .pipe(defaults(opts))
    .pipe(thread())
    .pipe(hideRecipient())
    .pipe(mail.send())
    .pipe(log(output));
};
