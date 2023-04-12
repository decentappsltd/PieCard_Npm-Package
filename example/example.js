const { PieCard } = require("@decentapps/piecard");

// You can get your API keys at "https://gateway.piecard.app"
const {
  client_id,
  client_secret,
  access_token,
} = require("./config/keys/keys");

// Initialization
const piecard = new PieCard(client_id, client_secret, access_token);

// GET PAYMENT BY ID
const paymentId = STRING; // "63e064aebc26563e677a9ae1"
piecard
  .getPaymentById(paymentId)
  .then((response) => {
    console.log("Returned Payment : ", response);
  })
  .catch((err) => console.log("Getting payment error : ", err));

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
    console.log("Created Payment : ", response);
  })
  .catch((err) => console.log("Creating payment error : ", err));

// SEND PI FROM APP TO USER (APP-TO-USER TRANSACTION)
const appToUserData = {
  amount: NUMBER, // Will be deducted from your wallet, plus the 0.02 Pi fee
  recipient: STRING, // Either Pi Username OR Wallet Address
  wallet_public_key: STRING, // Your Mainnet wallet address
  wallet_secret_key: STRING, // We will never see or store this
  memo: STRING, // Optional - this will appear on the blockchain
};
piecard
  .makePaymentToUser(appToUserData)
  .then((response) => {
    console.log("Pi Payment response : ", response);
  })
  .catch((err) => console.log("Sending pi to user error : ", err));

// GET A SECURE PAYMENT PAYLOAD
const encryptedData = STRING; // See "./keys_sample" for example data
piecard
  ._decryptPayment(encryptedData)
  .then((response) => {
    console.log("Decrypted payment response : ", response);
  })
  .catch((err) => console.log("Decrypting payment error : ", err));
