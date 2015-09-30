var stream = require('mutate-stream');

module.exports = stream(transform);

function transform (obj, encoding, callback) {
    if (!obj.hideRecipient) { 
      obj.rcp = ' to ' + obj.recipient;
    }
    this.push(obj);
    callback();
  }
