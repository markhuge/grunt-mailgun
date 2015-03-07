/*
 * grunt-mailgun
 * http://github.com/markhuge/grunt-mailgun
 *
 * Copyright (c) 2014 Mark Wilkerson
 * Licensed under the MIT license.
 */

/*jslint node: true */
'use strict';

var mailer = require('mailgun-send'),
    clone  = require('lodash.clone'),
    pick   = require('lodash.pick');

var task = {
  name: 'mailgun',
  description: 'Send emails through Mailgun as part of your build'
};

module.exports = function (grunt) {

  grunt.registerMultiTask(task.name, task.description, function () {
    
    var done   = this.async(),
        opts   = this.data.options,
        params = buildParams(opts),
        count  = this.filesSrc.length;

    // Register our mailer instance with out API key
    mailer.config({ key: opts.key });
    
    // If there's no files, just send params
    if (count < 1) { return send(params, function () { done(); }); }
    
    // Otherwise iterate over files
    this.filesSrc.forEach(function (filepath) {
      var opts  = clone(params);
      opts.file = filepath;
      opts.body = grunt.file.read(filepath)
      send(opts, function () {
        count--;
        if (count < 1)  { return done(); }
      });
    });
      
  });

  function send (opts, cb) {
    mailer.send(opts, function (err) {
      if (err) { return grunt.log.error(err); }
      var msg = opts.file || 'mailgun msg';
      grunt.log.writeln('Sent ' + msg + ' to ' + opts.recipient);
      if (cb) { cb(); }
    });
  }

  function buildParams (obj) {
    obj.subject = obj.subject || 'grunt-mailgun';
    obj.body    = obj.body   || 'grunt-mailgun';
    return pick(obj, [ 'sender', 'recipient', 'subject', 'body' ]);
  }
};

