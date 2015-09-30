var stream = require('mutate-stream'),
    crypto = require('crypto');

module.exports = stream(transform);

function transform (obj, encoding, callback) {
    if (!obj.preventThreading) { 
      this.push(obj);
      return callback();
    }

    var pad = crypto.randomBytes(10).toString('hex');
    obj.subject += ' - ' + pad;
    obj.headers = "\nIn-Reply-To: <" + pad + ">";
    this.push(obj);
    callback();
  }
