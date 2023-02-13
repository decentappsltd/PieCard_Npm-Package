const { PieCard } = require("@decentapps/piecard");

// You can get your API keys at "https://gateway.piecard.app"
const {
  client_id,
  client_secret,
  access_token,
} = require("./config/keys/keys");

// Initialization
const piecard = new PieCard(client_id, client_secret, access_token);

// Get payment
const paymentId = STRING; // "63e064aebc26563e677a9ae1"
piecard
  .getPaymentById(paymentId)
  .then((response) => {
    console.log("Get Payment : ", response);
  })
  .catch((err) => console.log("Get payment error : ", err));

// Create payment
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

const encryptedData = STRING; // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJldmVudF90eXBlIjoicGF5bWVudC5jb21wbGV0ZWQiLCJjcmVhdGVkIjoiMjAyMy0wMi0xMlQxOTo1MTo1MS4yMTZaIiwicGF5bWVudCI6eyJpZCI6IjYzYmZlNmFhNmZhN2JmMDUxOTU0ZTdkZiIsImFtb3VudCI6MTAwLCJjbGllbnQiOiJvbGl2ZXJtYzMiLCJtZW1vIjoidGVzdCIsInNhbmRib3giOmZhbHNlLCJtZXRhZGF0YSI6eyJpZCI6IjEyMyJ9LCJzdWNjZXNzIjp0cnVlfSwiaWF0IjoxNjc2MjMxNTExfQ.q-iRL0-O3Ud_oxVZLehQZTq6THwTtnDhsi99aqBEtl8"
piecard
  .validate(encryptedData)
  .then((response) => {
    console.log("Validate : ", response);
  })
  .catch((err) => console.log("Validate error : ", err));