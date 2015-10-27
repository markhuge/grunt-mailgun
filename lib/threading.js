var stream   = require('mutate-stream'),
    nothread = require('nothread');

module.exports = stream(transform);

function transform (obj, encoding, callback) {
    if (!obj.preventThreading) { 
      this.push(obj);
      return callback();
    }
    this.push(nothread(obj));
    callback();
  }
