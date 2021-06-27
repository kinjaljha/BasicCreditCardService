import { Transaction } from "./Transaction.js";
import { validateCard } from "../../utils/index.js";
import { InvalidData } from "../types.js";

export class TransactionMapper {
  constructor() {
    let __mapper = new Map();
    this.get = function () {
      return __mapper;
    };
    this.set = function (user, transaction) {
      __mapper.set(user, transaction);
    };
  }

  /**
   *
   * @param {String} username
   * @returns {Transaction} for a given user
   */
  getUserTransaction = function (username) {
    return this.get().get(username);
  };

  /**
   *
   * @param {String} username
   * @param {String} creditCardNumber
   * @param {Number} limit
   * Adds the transaction for the User
   */
  add = async (username, creditCardNumber, limit) => {
    const userTransaction = this.getUserTransaction(username);
    let balance = 0;
    if (!validateCard(creditCardNumber)) {
      creditCardNumber = InvalidData.NA;
      balance = InvalidData.ERROR;
      limit = InvalidData.NA;
    }
    const transaction = new Transaction(creditCardNumber, balance, limit);

    if (!userTransaction) {
      this.set(username, transaction);
    } else {
      if (
        userTransaction.getCreditCardNumber() === InvalidData.NA ||
        isNaN(userTransaction.getBalance())
      ) {
        this.set(username, transaction);
      }
    }
  };

  /**
   *
   * @param {String} username
   * @param {Number} amount
   * Charges User with given amount if valid
   */
  charge = async (username, amount) => {
    const userTransaction = this.getUserTransaction(username);

    if (!userTransaction) return;
    if (userTransaction.getCreditCardNumber() === InvalidData.NA) return;

    const currentUserBalance = userTransaction.getBalance() + amount;

    if (currentUserBalance > userTransaction.getLimit()) return;
    userTransaction.setBalance(currentUserBalance);
    this.set(username, userTransaction);
  };

  /**
   *
   * @param {String} username
   * @param {Number} amount
   * Credits User amount if valid
   */
  credit = async (username, amount) => {
    const userTransaction = this.getUserTransaction(username);

    if (!userTransaction) return;
    if (userTransaction.getCreditCardNumber() === InvalidData.NA) return;

    const currentUserBalance = userTransaction.getBalance() - amount;
    userTransaction.setBalance(currentUserBalance);
    this.set(username, userTransaction);
  };
}
