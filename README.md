# grunt-mailgun

> Send emails though mailgun as part of your build. Created to test our email template builds.

This is being hastily deployed for internal consumption. You probably shouldn't use this yet.

## Getting Started
This plugin requires Grunt `~0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-mailgun --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-mailgun');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4)*


## Use case

We have a build pipeline that compiles jade and sass into inline-styled HTML pages for email msgs.

The final step is to shoot out tests of each template to make sure nothing looks wonky.

## mailgun task
_Run this task with the `grunt mailgun` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

#### key
Type: `String`

Your [Mailgun API key](http://documentation.mailgun.com/quickstart.html#authentication)

#### sender
Type: `String`

The 'from' name and address. Acceptable domains may be restricted by your mailgun account settings

#### recipient
Type: `String` or `Array`

One or more email addresses to send your msg to. Multiple addresses should be
entered as an array.


#### subject
Type: `String`

The subject of your email

#### body
Type: `String`

If no files are specified in `src:`, the mailgun task will send a plaintext email
using `body` for the msg content.



## Usage

You probably shouldn't use this right now, but if you insist...

`src:` is one or more files to be used as an email body. A new email will be sent for each file.

```coffeescript
module.exports = (grunt) ->

  grunt.initConfig
    mailgun:
      mailer:
        options:
          key: 'your-mailgun-API-key'
          sender: 'noreply@testsauce.biz'
          recipient: 'email.you.want.to.send.to@email.com'
          subject: 'This is a test email'
        src: ['templates/*.html']
  
  grunt.loadNpmTasks 'grunt-mailgun'
```
