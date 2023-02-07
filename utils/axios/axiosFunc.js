const axios = require("axios");
const gatewayURI = `https://api.piecard.app`

const axiosRequest = async (reqOptions) => {
  const defaultOptions = { url: "", method: "GET", data: {}, headers: {} };
  for (const key in reqOptions) {
    if (key === "path") defaultOptions["url"] = `${gatewayURI}${reqOptions[key]}`;
    else if (key === "headers")
      defaultOptions["headers"] = { ...reqOptions[key] };
    else defaultOptions[key] = reqOptions[key];
  }
  return axios(defaultOptions)
    .then((response) => {
      if (response.status === 200) {
        const detailText = {
          status: response?.status,
          data: response?.data,
        };
        return detailText;
      }
    })
    .catch((error) => {
      const detailText = {
        status: error?.response?.status,
        data: error?.message,
      };
      return detailText;
    });
};

module.exports = { axiosRequest };
