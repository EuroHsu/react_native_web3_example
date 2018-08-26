# react_native_web3_example

## Usage

### 1. Install dependencies

    npm install

### 2. Run in Android or iOS

    react-native run-android
    react-native run-ios

## Testing (Jest)

### 1. Setting your ethereum network configuration in `__tests__/env.js`

There are 3 informations you need to provide.

1. `web3Url`: Ethereum full node websocket url.
2. `privateKey`: Your private key in ethereum.
3. `password`: Password of your private key.

```javascript
let env = {
  web3Url: 'wss://rinkeby.infura.io/_ws',
  privateKey: '<YOUR_PRIVATE_KEY>',
  password: '<YOUR_PASSWORD>'
};
```

### 2. Setting your contract configuration in `__tests__/contract.js`

Deploy [solidity_simplestore](https://github.com/EuroHsu/solidity_simplestore) in ethereum network.

There are 3 informations you need to provide.

1. `address`: Contract address in ethereum network.

```javascript
> truffle deploy --reset --network testnet
Running migration: 2_simple_store.js
  Deploying SimpleStore...
  ... 0x45054dcb0d0847391870a7dbf007fd8cc5bb1b852d92b50a5cbce3629023da33
  SimpleStore: 0xddaa77aecb79d70e396e50f3d28c7a5dae3da5e7 // contract address here
Saving successful migration to network...
```

2. `abi`: Contract application binary interface.
3. `bytecode`: Contract bytecode.

```javascript
// solidity_simplestore/build/contract/SimpleStore.json
{
  ...
  "abi": [],
  "bytecode": ""
  ...
}
```

```javascript
// react_native_web3_example/__tests__/contract.js
let contract = {
  address: '',
  abi: [],
  bytecode: ''
};
```

### 3. Try it

    npm test

## How to install web3 in react native

### 1. Open your react native project

### 2. Install [node-libs-browser](https://github.com/webpack/node-libs-browser) and [react-native-randombytes](https://github.com/mvayngrib/react-native-randombytes)

    npm install node-libs-browser react-native-randombytes
    react-native link

### 3. Create a file called rn-cli.config.js on the root of the project and add the following code into it:

```javascript
const extraNodeModules = require('node-libs-browser');

module.exports = {
  extraNodeModules,
};
```

### 4. Create a file called global.js on the root of the project and add the following code into it:

```javascript
// Inject node globals into React Native global scope.
global.Buffer = require('buffer').Buffer;
global.process = require('process');
let randomBytes = require('react-native-randombytes').randomBytes;

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

global.crypto = {
  randomBytes(size, cb) {
    return randomBytes(size, cb);
  }
};
```

### 5. Import the global.js file into your App.js file

    import './global';

### 6. Install [web3](https://github.com/ethereum/web3.js)

    npm install web3

### 7. Initialize web3

```javascript
import Web3 from 'web3';
let web3 = new Web3(Web3.givenProvider || 'wss://rinkeby.infura.io/_ws');
```

### 8. Try it

```javascript
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
