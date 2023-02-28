const isStringCheck = (args) =>
  [...args].some((elem) => typeof elem !== "string");

const isArrayCheck = (args) => [...args].some((elem) => !Array.isArray(elem));

const isNumberCheck = (args) =>
  [...args].some((elem) => typeof elem !== "number");

const isObjectCheck = (args) =>
  [...args].some((elem) => typeof elem !== "object");

const isBooleanCheck = (args) =>
  [...args].some((elem) => typeof elem !== "boolean");

module.exports = {
  isStringCheck,
  isArrayCheck,
  isNumberCheck,
  isObjectCheck,
  isBooleanCheck,
};
