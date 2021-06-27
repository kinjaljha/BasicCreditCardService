import fs from "fs";
import { Currency, InvalidData } from "../src/types.js";

export const getNumericAmount = (data) =>
  parseInt(data.split(Currency.DOLLAR)[1]);

/**
 *
 * @param {String} fileName
 * @returns {Array}
 * File Reading function
 */
export const getDataFromFile = (fileName) => {
  const data = fs.readFileSync(fileName, { encoding: "utf8", flag: "r" });
  const tuple = data.split("\n").filter((ele) => ele.length);
  return tuple;
};

/**
 *
 * @param {Map} transactionMap
 * @returns {Array}
 * Converts the Map data -> Array of readable Summary format
 */
export const getPrintableTransactionSummary = (transactionMap) => {
  const summaryList = [];

  for (let [key, val] of transactionMap) {
    let balance = val.getBalance();
    const finalBalance =
      balance !== InvalidData.ERROR ? Currency.DOLLAR + balance : balance;
    summaryList.push([key, finalBalance]);
  }

  summaryList.sort(function compareKey(key1, key2) {
    (key1 = key1[0].toLowerCase()), (key2 = key2[0].toLowerCase());

    if (key1 < key2) return -1;
    if (key1 > key2) return 1;

    return 0;
  });

  return summaryList;
};

/**
 *
 * @param {string} cardNumber
 * @returns {boolean}
 * Validates the card via Luhn 10 algorithm
 */
export const validateCard = (cardNumber) => {
  let nDigits = cardNumber.length;

  if (nDigits > 19) return false;
  let sum = 0;
  let isSecond = false;

  for (let i = nDigits - 1; i >= 0; i--) {
    let d = cardNumber[i].charCodeAt() - "0".charCodeAt();

    if (isSecond == true) d = d * 2;

    sum += parseInt(d / 10, 10);
    sum += d % 10;

    isSecond = !isSecond;
  }
  return sum % 10 == 0;
};
