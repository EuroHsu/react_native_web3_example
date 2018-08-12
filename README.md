# react_native_web3_example

## Usage

### 1. Install dependencies

    npm install

### 2. Run in Android or iOS

    react-native run-android
    react-native run-ios

## Testing (Jest)

### 1. Setting your privateKey in `__tests__/env.js`

### 2. Try it

    npm test

## How to install web3 in react native

### 1. Open your react native project

### 2. Install [node-libs-browser](https://github.com/webpack/node-libs-browser)

    npm install node-libs-browser

### 3. Create a file called rn-cli.config.js on the root of the project and add the following code into it:

```
const extraNodeModules = require('node-libs-browser');

module.exports = {
  extraNodeModules,
};
```

### 4. Create a file called global.js on the root of the project and add the following code into it:

```
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
```

### 5. Import the global.js file into your App.js file

    import './global';

### 6. Install [web3](https://github.com/ethereum/web3.js)

    npm install web3

### 7. Initialize web3

```
import Web3 from 'web3';
let web3 = new Web3(Web3.givenProvider || 'https://mainnet.infura.io');
```

### 8. Try it

```
componentWillMount() {
  web3.eth.getBlock('latest').then(console.log).catch(console.error);
}

or

componentWillMount() {
  web3.eth.getBlock('latest', (err, result) => {
    if (err) {
      console.error(err);
    } else {
      console.log(result);
    }
  });
}

or

async componentWillMount() {
  try {
    console.log(await web3.eth.getBlock('latest'));
  } catch (err) {
    console.error(err);
  }
}
```

ref: [How to set up web3.js with CRNA](https://gist.github.com/dougbacelar/29e60920d8fa1982535247563eb63766)

ref: [web3.js - Ethereum JavaScript API](http://web3js.readthedocs.io/en/1.0/index.html)
