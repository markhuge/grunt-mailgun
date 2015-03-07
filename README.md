# grunt-mailgun [![Code Climate](https://codeclimate.com/github/markhuge/grunt-mailgun.png)](https://codeclimate.com/github/markhuge/grunt-mailgun) [![Dependency Status](https://gemnasium.com/markhuge/grunt-mailgun.svg)](https://gemnasium.com/markhuge/grunt-mailgun)
[![NPM](https://nodei.co/npm/grunt-mailgun.png?compact=true)](https://nodei.co/npm/grunt-mailgun/)
> Send emails though mailgun as part of your build. Created to test our email template builds.

## Abstract

We have a build pipeline that compiles jade and sass into inline-styled HTML pages for email msgs. 

The final step is to shoot out tests of each template to make sure nothing looks wonky.

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



## Usage

`src:` is one or more files to be used as an email body. A new email will be sent for each file.

```javascript
mailgun: {
  marketingTemplates: {
    options: {
      key: 'key-yourmailgunapikey',
      sender: 'noreply@example.com',
      recipient: 'recipient@example.com',
      subject: 'This is a test email',
      preventThreading: true
    },
    src: ['templates/marketing/*.html']
  }
}
```

## mailgun task
_Run this task with the `grunt mailgun` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.
### Options

Required:

- key (string) - Your [Mailgun API key](http://documentation.mailgun.com/quickstart.html#authentication)
- sender (string) - The 'from' name and address. Acceptable domains may be restricted by your mailgun account settings
- recipient (string | array) - One or more email addresses to send your msg to. Multiple addresses should be
entered as an array.


Optional:

- subject (string) - The subject of your email. Defaults to 'grunt-mailgun'
- body (string) - The body content. If no files are specified in `src:`, the mailgun task will send a plaintext email
using `body` for the msg content. Defaults to 'grunt-mailgun'.
- preventThreading (boolean) - Attempt to suppress conversation threading behavior in email clients by varying the 
subject text and the In-Reply-To header.
