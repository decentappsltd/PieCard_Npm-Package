"use strict";
/**
 *   Copyright 2023 PieCard
 *
 *   Licensed under the Apache License, Version 2.0 (the "License");
 *   you may not use this file except in compliance with the License.
 *   You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 *   Unless required by applicable law or agreed to in writing, software
 *   distributed under the License is distributed on an "AS IS" BASIS,
 *   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *   See the License for the specific language governing permissions and
 *   limitations under the License.
 */

const StellarSdk = require('stellar-sdk');
const { httpReq } = require("../utils/request/Request");
const { isStringCheck } = require("../utils/custom-validation/typeof_checks");

// Global Variables
let clientValidationMessage =
  "Cannot validate your credentials, please provide the valid credentials !!!";

/**
 * This object is used to interface with the PieCard API.
 *
 * @param {string} clientId     Client Identifier
 * @param {string} clientSecret Client Secret Key
 * @param {string} accessToken  Client Access Token [ Unique to single url ]
 */
const PieCard = function PieCard(clientId, clientSecret, accessToken) {
  this.clientid = clientId;
  this.clientsecret = clientSecret;
  this.accesstoken = accessToken;
};

PieCard.prototype.clientid = null;
PieCard.prototype.clientsecret = null;
PieCard.prototype.accesstoken = null;
let _pioneerToken = null;

/**
 * Validate client's credentials to be used with library requests.
 *
 *
 * @return {Boolean} `clientValidation`
 */
PieCard.prototype._validateClientCredentials = function () {
  const { clientid, clientsecret, accesstoken } = this;
  const stringCheck = isStringCheck([clientid, clientsecret, accesstoken]);
  let clientValidation = false;

  if (!clientid || !clientsecret || !accesstoken) clientValidation = true;
  else if (stringCheck) {
    clientValidation = true;

    const message = "Invalid typeof [API KEYS] provided";
    return message;
  }

  return clientValidation;
};

/**
 * Get payment by ID.
 *
 * This `{ func }` getPaymentByID is used to get payments by ID.
 *
 * @param {string} id  Receive `"id"`, Validate client and return payment by its ID.
 *
 * @return {Object} `{ payment }`
 */
PieCard.prototype.getPaymentById = async function (id) {
  const clientValidation = this._validateClientCredentials();

  if (clientValidation) return clientValidationMessage;
  else if (!id || typeof id !== "string") return "No or invalid ID provided!!!";
  else {
    const { clientid, clientsecret, accesstoken } = this;
    const reqOptions = {
      path: `/payment/${id}`,
      headers: {
        clientid,
        clientsecret,
        accesstoken,
      },
    };

    const response = await httpReq(reqOptions);
    if (response?.success) {
      delete response?.data?.payment["payee"];
      return response?.data;
    } else return response?.message;
  }
};

/**
 * Create payment.
 *
 * This `{ func }` createPayment is used to create payments.
 *
 * @param {Object} data  Receive `{ data }`, and creates payments with the given parameters.
 
* `Example : Options`
 * ```javascript
 *          {
                amount: NUMBER;
                memo: STRING;
                metadata: OBJECT;
                successURL: STRING;
                cancelURL: STRING;
 *          }
 * ```
 *
 * @return {Object} `{ payment }`
 */
PieCard.prototype.createPayment = async function (data) {
  const clientValidation = this._validateClientCredentials();

  if (clientValidation) return clientValidationMessage;
  else if (!data || typeof data !== "object")
    return "No or invalid data provided!!!";
  else {
    const { clientid, clientsecret, accesstoken } = this;
    const reqOptions = {
      path: `/payment`,
      method: "POST",
      headers: {
        clientid,
        clientsecret,
        accesstoken,
      },
      data,
    };

    const response = await httpReq(reqOptions);
    if (response?.success) return response?.data;
    else return response?.message;
  }
};

/**
 * Decode an incoming webhook.
 *
 * This `{ func }` _payment is used to retrieve data securely from an incoming webhook.
 *
 * @param {String} encryptedData  Receive `{ params }`, and decodes the request body in the webhook.
 *
 * @return {Object} `{ event_type, { payment } }`
 */
PieCard.prototype._decryptPayment = async function (encryptedData) {
  const clientValidation = this._validateClientCredentials();

  if (clientValidation) return clientValidationMessage;
  else if (!encryptedData || typeof encryptedData !== "string") {
    return "No or invalid encryptedData provided!!!";
  } else {
    const { clientid, clientsecret, accesstoken } = this;
    const reqOptions = {
      path: `/decrypt_payment/${encryptedData}`,
      headers: {
        clientid,
        clientsecret,
        accesstoken,
      },
    };
    const response = await httpReq(reqOptions);
    if (response?.success) return response?.data;
    else return response?.message;
  }
};

/**
 * Make a App-to-User transaction
 *
 * This `{ func }` makePayment will send Pi from the app to the user. 
 *
 * @param {Object} data  Receive `{ data }`, and creates payments with the given parameters.
 * 
 * `Example : Options`
 * ```javascript
 *          {
                amount: NUMBER; // Will be deducted from your wallet, plus the 0.02 Pi fee
                recipient: STRING; // Either Pi username OR wallet address
                wallet_public_key: STRING; // Your Mainnet wallet address
                wallet_secret_key: STRING; // We will never see or store this
                memo: STRING; // Optional - this will appear on the blockchain
 *          }
 * ```
 *
 * @return {Object} `{ payment }`
 */
PieCard.prototype.makePayment = async function (data) {
  const clientValidation = this._validateClientCredentials();

  if (clientValidation) return clientValidationMessage;
  else if (!data || typeof data !== "object") {
    return "No or invalid encryptedData provided!!!";
  } else {
    const { clientid, clientsecret, accesstoken } = this;
    const { amount, recipient, wallet_public_key, wallet_secret_key, memo } = data;

    const verfiedWallet = await httpReq({
      path: `/payment/app-to-user/create`,
      headers: {
        clientid,
        clientsecret,
        accesstoken,
      },
      method: "POST",
      data: {
        recipient,
        amount,
      },
    });
    if (!verfiedWallet?.data?.isValid) return "Invalid wallet address provided!";

    const piMainnet = new StellarSdk.Server('https://api.mainnet.minepi.com');
    const myAccount = await piMainnet.loadAccount(wallet_public_key);
    const baseFee = await piMainnet.fetchBaseFee();

    const payment = StellarSdk.Operation.payment({
      destination: 'GALIT7MEVQ5RTSFJKXLBO2NV3IQ2TVL4KTYFZEFGXTTWA3PGO6SKH7SG',
      asset: StellarSdk.Asset.native(),
      amount: (amount + 0.01).toString()
    });

    const timebounds = await piMainnet.fetchTimebounds(180);
    let transaction = new StellarSdk.TransactionBuilder(myAccount, {
      fee: baseFee,
      networkPassphrase: "Pi Network",
      timebounds: timebounds
    });
    transaction.addOperation(payment);
    transaction = transaction.build();

    const myKeypair = StellarSdk.Keypair.fromSecret(wallet_secret_key);
    transaction.sign(myKeypair);
    const txid = await piMainnet.submitTransaction(transaction);

    const reqOptions = {
      path: `/payment/app-to-user/complete`,
      headers: {
        clientid,
        clientsecret,
        accesstoken,
      },
      method: "POST",
      data: {
        amount,
        recipient,
        id: verfiedWallet.data.id,
        txid: txid.hash
      }
    };
    const response = await httpReq(reqOptions);
    console.log(response);
    if (response?.success) return response?.data;
    else return response?.data?.message;
  }
};

module.exports = { PieCard };
