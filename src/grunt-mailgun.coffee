{Mailgun} = require 'mailgun'

module.exports = (grunt) ->

  grunt.registerMultiTask 'mailgun', 'Send emails through mailgun',  ->
    
    done = @async()
    
    {sender,recipient,subject,body,key} = @data.options
    mail = new Mailgun(key)


    if @files.length > 0

      @filesSrc.forEach (filePath) ->


        body = grunt.file.read(filePath)
        
        raw = "From: #{sender}\nTo: #{recipient}\nContent-Type: text/html; charset=utf-8\nSubject: #{subject}\n\n #{body}"
        

        mail.sendRaw sender, recipient, raw, (err) ->
          if err then grunt.log.error 'Error: ' + err
          else
            grunt.log.writeln 'Sent email to ' + recipient
          done()


    else
      mail.sendText sender, recipient, subject, body, (err) ->
        if err then grunt.log.error 'Error: ' + err
        else
          grunt.log.writeln 'Sent email to ' + recipient
        done()