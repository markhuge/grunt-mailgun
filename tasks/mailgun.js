/*
 * grunt-mailgun
 * http://github.com/markhuge/grunt-mailgun
 *
 * Copyright (c) 2014 Mark Wilkerson
 * Licensed under the MIT license.
 */

/*jslint esversion: 6, node: true */
'use strict';

const mail  = require('../lib/mail.js');
const clone = require('lodash.clone');

const task = {
  name: 'mailgun',
  description: 'Send emails through Mailgun as part of your build'
};


module.exports = function (grunt) {

  grunt.registerMultiTask(task.name, task.description, function () {
    
    var done   = this.async(),
        opts   = this.data.options,
        count  = this.filesSrc.length;

    if (count < 1) { return mail(opts, function () { 
      done(); });
    }
    
    // Otherwise iterate over files
    this.filesSrc.forEach(function (filepath) {
      var options = clone(opts);
     
      options.file = filepath;
      options.body = grunt.file.read(filepath);
      mail(options, function () {
        count--;
        if (count < 1)  { return done(); }
      });
    });
      
  });
};

