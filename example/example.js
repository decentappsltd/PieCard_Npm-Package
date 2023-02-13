const { PieCard } = require("@decentapps/piecard");

// You can get your API keys at "https://gateway.piecard.app"
const {
  client_id,
  client_secret,
  access_token,
} = require("./config/keys/keys");

// Initialization
const piecard = new PieCard(client_id, client_secret, access_token);

// GET PAYMENT
const paymentId = STRING; // "63e064aebc26563e677a9ae1"
piecard
  .getPaymentById(paymentId)
  .then((response) => {
    console.log("Get Payment : ", response);
  })
  .catch((err) => console.log("Get payment error : ", err));

// CREATE PAYMENT
const paymentData = {
  amount: 5,
  memo: "Payment for soccer voucher",
  metadata: {
    productId: "af2adf985fs1d63s21a1d",
    tags: ["payment", "paymentData", "json"],
  },
};
piecard
  .createPayment(paymentData)
  .then((response) => {
    console.log("Create Payment : ", response);
  })
  .catch((err) => console.log("New payment error : ", err));

// GET A SECURE PAYMENT PAYLOAD
const encryptedData = STRING; // See "./keys_sample" for example data
piecard
  ._decryptPayment(encryptedData)
  .then((response) => {
    console.log("Decrypted response : ", response);
  })
  .catch((err) => console.log("Decrypting error : ", err));
