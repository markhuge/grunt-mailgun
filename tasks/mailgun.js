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
    _      = require('lodash');


module.exports = function (grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('mailgun', 'Send emails through mailgun as part of your build.', function () {
    var done = this.async();
    var opts = _.pick(this.data.options,['sender','recipient','subject','body']);
  
    // Register our mailer instance with out API key
    mailer.config({key: this.data.options.key});
    
    if (this.files.length > 0) {
      var i = this.files.length;
      this.filesSrc.forEach(function (filePath) {
        var _opts = _.clone(opts);
        _opts.body = grunt.file.read(filePath);
        mailer.send(_opts, function () {
          grunt.log.writeln('Sent' + filePath + ' to ' + _opts.recipient);
          if (i < 1) { done(); } else { i--; } // This seems dirty
        });
        
      });

    } else {
      mailer.send(opts, function () {
        grunt.log.writeln('Sent mailgun msg to ' + opts.recipient);
        done();
      });
       }
    
  });

};
