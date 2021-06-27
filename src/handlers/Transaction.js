export class Transaction {
  constructor(creditCardNumber, balance, limit) {
    let __creditCardNumber = creditCardNumber;
    let __balance = balance;
    let __limit = limit;

    this.getBalance = function () {
      return __balance;
    };
    this.getLimit = function () {
      return __limit;
    };
    this.getCreditCardNumber = function () {
      return __creditCardNumber;
    };
    this.setBalance = function (amount) {
      __balance = amount;
    };
  }
}
