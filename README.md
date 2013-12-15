# grunt-mailgun

> Send emails though mailgun as part of your build. Created to test our email template builds.

This is being hastily deployed for internal consumption. You probably shouldn't use this yet.

## Use case

We have a build pipeline that compiles jade and sass into inline-styled HTML pages for email msgs.

The final step is to shoot out tests of each template to make sure nothing looks wonky.

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