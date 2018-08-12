// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');

if (typeof btoa === 'undefined') {
  global.btoa = function (str) {
    return new Buffer(str, 'binary').toString('base64');
  };
}

if (typeof atob === 'undefined') {
  global.atob = function (b64Encoded) {
    return new Buffer(b64Encoded, 'base64').toString('binary');
  };
}

// Don't do this in production. You're going to want to patch in
// https://github.com/mvayngrib/react-native-randombytes or similar.
global.crypto = {
  randomBytes(size, cb) {
    // phantomjs needs to throw
    if (size > 65536) throw new Error('requested too many random bytes');
    // in case browserify  isn't using the Uint8Array version
    var rawBytes = new global.Uint8Array(size);

    // This will not work in older browsers.
    // See https://developer.mozilla.org/en-US/docs/Web/API/window.crypto.getRandomValues
    if (size > 0) {
      // getRandomValues fails on IE if size == 0
      for (let i = 0; i < rawBytes.length; i++) {
        rawBytes[i] = Math.floor(256 * Math.random());
      }
    }
    // XXX: phantomjs doesn't like a buffer being passed here
    var bytes = Buffer.from(rawBytes.buffer);

    if (cb) {
      cb(bytes);
    }
    return bytes;
  }
};
