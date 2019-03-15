/*jslint esversion:6, node: true */

const thru = require('through2');
const mail = require('mailgun-stream');
const tap  = require('stream-output/obj');


function start (obj) {
  var stream = thru.obj();
  stream.write(obj);
  return stream;
}

function output (obj) {
  // obj.to comes from the mailgun-send module
  console.log(`Sent msg to ${obj.to}`);
}

module.exports = function (options, cb) {
  if (!options.key) { throw("Missing Mailgun API key"); }
  if (!options.domain) { throw("Missing Mailgun domain"); }

  start(options)
    .pipe(tap(() => mail.config(options)))
    .pipe(mail.send())
    .pipe(tap(output));
};
