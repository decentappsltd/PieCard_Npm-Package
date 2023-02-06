const { axiosRequest } = require("../axios/axiosFunc");

let index = 0;
const Request = async (reqOptions) => {
  try {
    const response = await axiosRequest(reqOptions);
    const result = await response;

    if (typeof result?.status === "number" && result?.status === 200)
      return result?.data;
    else {
      if (index === 10) {
        index = 0;
        return result?.data;
      } else {
        index += 1;
        Request(reqOptions);
      }
    }
  } catch (error) {
    console.log("Loop request Error : ", error);
  }
};

const httpReq = async (reqOptions) => {
  let result;
  try {
    const response = await Request(reqOptions);
    if (!response) {
      result = response;
    } else {
      result = response;
    }
  } catch (error) {
    console.log("error : ", error);
    return error;
  }

  return result;
};

module.exports = { httpReq };
