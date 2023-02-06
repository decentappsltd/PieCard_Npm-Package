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

const { httpReq } = require("../utils/request/Request");

// Global Variables
let clientValidationMessage =
  "Cannot validate your credentials, please provide the valid credentials !!!";

/**
 * This object is used to interface with the PieCard API.
 *
 * @param {string} clientId     Client Identifier
 * @param {string} clientSecret Client Secret Key
 * @param {string} accessToken  Client Access Token [Unique to single url]
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
  let clientValidation = false;

  if (!clientid || !clientsecret || !accesstoken) clientValidation = true;

  return clientValidation;
};

/**
 * Get payment by ID.
 *
 * This `{ func } getPaymentByID is used to get payments by ID.
 *
 * @param {string} id  Receive "id", Validate client and return payment by its ID.
 *
 * @return {Object} `{ payment }`
 */
PieCard.prototype.getPaymentById = async function (id) {
  const clientValidation = this._validateClientCredentials();

  if (!id) return "No or invalid ID provided!!!";
  else if (clientValidation) return clientValidationMessage;
  else {
    const { clientid, clientsecret, accesstoken } = this;
    const reqOptions = {
      path: `/payment/${id}`,
      headers: {
        clientid,
        clientsecret,
        accesstoken,
        Authorization: `${accesstoken.toString()}`,
      },
    };

    const response = await httpReq(reqOptions);
    delete response?.data?.payment["payee"];
    return response;
  }
};

/**
 * Create payment.
 *
 * This `{ func } createPayment is used to create payments.
 *
 * @param {Object} data  Receive { data }, and creates payments with the given parameters.
 * `Example : Options`
 * ```javascript
 *          {
                amount: number;
                memo: string;
                metadata: string;
                successURL: string;
                cancelURL: string;
 *          }
 * ```
 *
 * @return {Object} `{ payment }`
 */
PieCard.prototype.createPayment = async function (data) {
  const clientValidation = this._validateClientCredentials();

  if (!data) return "No or invalid data provided!!!";
  else if (clientValidation) return clientValidationMessage;
  else {
    const { clientid, clientsecret, accesstoken } = this;
    const reqOptions = {
      path: `/payment`,
      method: "POST",
      headers: {
        clientid,
        clientsecret,
        accesstoken,
        Authorization: `${accesstoken.toString()}`,
      },
      data,
    };

    const response = await httpReq(reqOptions);
    return response;
  }
};

// TODO: WEBHOOK VALIDATION

module.exports = { PieCard };
