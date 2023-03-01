![Pi eCard Logo](https://miro.medium.com/max/520/1*1ihnvEGPNAC8wGGxiPgQBA.webp)

  Pi eCard is the easy POS (Point of Sale) system for the Pi Network, enabling in-person vendors and Pioneers to invoice others without the need to type in long public keys. The status of the payment can be seen at any stage by both the vendor and the client for [pi network](https://minepi.com/).

  <!-- [![NPM Version][npm-version-image]][npm-url]
  [![NPM Install Size][npm-install-size-image]][npm-install-size-url]
  [![NPM Downloads][npm-downloads-image]][npm-downloads-url] -->

  # Quick Start
#### Get your API keys

Your API requests are authenticated using API keys. Any request that doesn't include an API key will return an error. <br/> <br/>

> You can get your API keys in your dashboard at any time, visit [developers](https://gateway.piecard.app) to _generate_ or _get_ your keys.

<br />

  [See an example of how to use our package](example)

<br />

```js
const { PieCard } = require('@decentapps/piecard')

// Initialization
const piecard = new PieCard("Client_ID", "Client_Secret", "Access_Token");

// CREATE PAYMENT
const paymentData = {
  amount: NUMBER, // amount of service >= 0
  memo: STRING, // memo of the transaction
  metadata: OBJECT // key-value pairs of metadata
};

piecard
  .createPayment(paymentData)
   .then((result) => {
     console.log("Create payment response : ", result);
  })
  .catch((err) => {
    console.log("Response error : ", err);
  });

// GET PAYMENT BY ID
const paymentId = STRING // 63e064aebc26563e677a9ae1
piecard
  .getPaymentById(paymentId)
  .then((result) => {
  	console.log("Get payment : ", result);
  })
  .catch((err) => {
    console.log("Get payment error : ", err);
  });

// GET A SECURE PAYMENT PAYLOAD
const encryptedData = STRING;
piecard
  ._decryptPayment(encryptedData)
   .then((result) => {
     console.log("Decrypted Payment response : ", result);
  })
  .catch((err) => {
    console.log("Decrypting Payment error : ", err);
  });

```


## Installation

This is a [Node.js](https://nodejs.org/en/) module available through the
[npm registry](https://www.npmjs.com/).

Before installing, [download and install Node.js](https://nodejs.org/en/download/).
Node.js 0.10 or higher is required.

If this is a brand new project, make sure to create a `package.json` first with
the [`npm init` command](https://docs.npmjs.com/creating-a-package-json-file).

Installation is done using the
[`npm install` command](https://docs.npmjs.com/getting-started/installing-npm-packages-locally):

```console
$ npm install @decentapps/piecard
```

Follow [our installing guide](https://docs.piecard.app/quick-start)
for more information.

## Features

  * Low fees on micropayments
  * Super-high test coverage
  * Pay via usernames
  * Pay with scannable QR codes
  * Invoice over URLs
  * Content negotiation
  * Use with or without a Pi eCard balance
  * Focus on high performance
  * HTTP helpers (redirection, caching, etc)
  * Executable for completing transactions quickly

## Docs & Community

  * [Website and Documentation](https://www.piecard.co.uk/)  [[website repo](https://github.com/decentappsltd/piecard) ---- [Documentation](https://docs.piecard.app/)]
  * [#piecard](https://twitter.com/pi_ecard) on [twitter Chat](https://mobile.twitter.com/pi_ecard) @piecard
  * [GitHub Organization](https://github.com/decentappsltd) for Official Middleware & Modules
  * [Twitter Group](https://twitter.com/decentappsltd) for discussion
  * [Discord Server](https://discord.gg/mzvR6vcfc6) for events and discussion
  * [Contact](https://decentapps.co.uk/contact.html) for support and discussion



## Contributing

  <!-- [![Linux Build][github-actions-ci-image]][github-actions-ci-url]
  [![Windows Build][appveyor-image]][appveyor-url]
  [![Test Coverage][coveralls-image]][coveralls-url] -->

The PieCard project welcomes all constructive contributions. Contributions take many forms,
from code for bug fixes and enhancements, to additions and fixes to documentation, additional
tests, trigging incoming pull requests and issues, and more!

See the [Contributing Guide](Contributing.md) for more technical details on contributing.

### Security Issues

If you discover a security vulnerability in PieCard, please see [Security Policies and Procedures](Security.md).

### Running Tests

To run the test suite, first install the dependencies, then run `npm test`:

```console
$ npm install
$ npm test
```

## People

The original author of PieCard is [Duniya Naphtali](https://github.com/kouqhar)

The current lead maintainers are [Oliver Crockett](https://github.com/olivercrockett) and [Duniya Naphtali](https://github.com/kouqhar)

## License

  [MIT](LICENSE)
