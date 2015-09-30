var test          = require('tape'),
    thread        = require('../lib/threading'),
    hideRecipient = require('../lib/hideRecipient'),
    mail          = require('../lib/mail'),
    output        = require('stream-output/obj'),
    stream        = require('mutate-stream');

var start = stream(function (obj) {
    this.push(obj);
});

test('Prevent threading', function (t) {
  t.test('true', function (st) {
  var obj   = { subject: "this is a subject", preventThreading: true },
      regex = /this is a subject - [0-9a-fA-F]{10}/;

  var unit = function (data) {
    st.ok(data.subject.match(regex));
    st.end();
  };

  start(obj)
    .pipe(thread())
    .pipe(output(unit));
  });

  t.test('false', function (st) {
  var obj  = { subject: "this is a subject", preventThreading: false };

  var unit = function (data) {
    st.equal(obj.subject, 'this is a subject');
    st.end();
  };

  start(obj)
    .pipe(thread())
    .pipe(output(unit));
  });
  
  t.end();
});

test('Hide Recipient', function (t) {
  t.test('true', function (st) {
  var obj   = { recipient: "foo@bar.com", rcp: '', hideRecipient: true };

  var unit = function (data) {
    st.equal(obj.rcp,'');
    st.end();
  };

  start(obj)
    .pipe(hideRecipient())
    .pipe(output(unit));
  });

  t.test('false', function (st) {
  var obj   = { recipient: "foo@bar.com", rcp: '', hideRecipient: false };
  var unit = function (data) {
    st.equal(obj.rcp, ' to foo@bar.com');
    st.end();
  };

  start(obj)
    .pipe(hideRecipient())
    .pipe(output(unit));
  });
  
  t.end();
});
