import readline from "readline";
import {
  Transaction,
  Currency,
  FILE_EXTENSION_TXT,
  END_OF_INPUT,
} from "../src/types.js";
import { TransactionMapper } from "./handlers/TransactionMapper.js";
import {
  getDataFromFile,
  getNumericAmount,
  getPrintableTransactionSummary,
} from "../utils/index.js";

/**
 *
 * @param {Array} data
 * @param {Map} transactionMap
 * Performs transactions provided by user
 */
const executeCreditCardTransactions = async (data, transactionMap) => {
  const dataTokens = data.split(" ");
  const username = dataTokens[1];
  switch (dataTokens[0]) {
    case Transaction.ADD:
      const [creditCardNumber, limit] = dataTokens.slice(2);
      const limitAmount = parseInt(limit.split(Currency.DOLLAR)[1]);
      await transactionMap.add(username, creditCardNumber, limitAmount);
      break;
    case Transaction.CHARGE:
      const chargeAmount = getNumericAmount(dataTokens[2]);
      transactionMap.charge(username, chargeAmount);
      break;
    case Transaction.CREDIT:
      const creditAmount = getNumericAmount(dataTokens[2]);
      transactionMap.credit(username, creditAmount);
      break;
    default:
      break;
  }
};
/**
 *
 * @param {Array} inputData
 */
const getTransactionSummary = (inputData) => {
  const transactionMap = new TransactionMapper();
  inputData.forEach((data) =>
    executeCreditCardTransactions(data, transactionMap)
  );
  const summaryList = getPrintableTransactionSummary(transactionMap.get());
  summaryList.forEach(([name, balance]) => console.log(name + ": " + balance));
};

let stdin = [];
const rl = readline.createInterface({
  input: process.stdin,
});

rl.prompt();

rl.on("line", function (cmd) {
  if (cmd.includes(FILE_EXTENSION_TXT)) {
    stdin = [];
    const fileData = getDataFromFile(cmd.trim());
    getTransactionSummary(fileData);
  }
  if (cmd.toLocaleLowerCase() === END_OF_INPUT) {
    getTransactionSummary(stdin);
  }
  if (cmd.length) {
    stdin.push(cmd);
  }
});
