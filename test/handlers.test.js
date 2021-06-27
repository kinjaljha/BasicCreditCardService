import { Transaction } from "../src/handlers/Transaction.js";
import { TransactionMapper } from "../src/handlers/TransactionMapper.js";

const user = "Bachman";
const creditCardNumber = "5454545454545454";
let limit = 1000;
let balance = 0;
const transaction = new Transaction(creditCardNumber, balance, limit);
const transactionMap = new Map();
const transactionMapper = new TransactionMapper();

const objectToDataMap = (user, transactionMapperObject) => {
  const localMapper = new Map();
  localMapper.set(user, {
    creditCardNumber: transactionMapperObject.getCreditCardNumber(),
    balance: transactionMapperObject.getBalance(),
    limit: transactionMapperObject.getLimit(),
  });
  return localMapper;
};

beforeEach(() => {
  transactionMap.clear();
});

describe("Transaction", () => {
  test("Should instantiate the Transaction", () => {
    expect(typeof transaction).toBe("object");
    expect(typeof transaction.getBalance).toBe("function");
    expect(typeof transaction.getCreditCardNumber).toBe("function");
    expect(typeof transaction.getLimit).toBe("function");
    expect(typeof transaction.setBalance).toBe("function");
    expect(typeof transaction.getBalance).toBe("function");
    expect(transaction.getBalance()).toStrictEqual(balance);
    expect(transaction.getCreditCardNumber()).toStrictEqual(creditCardNumber);
    expect(transaction.getLimit()).toStrictEqual(limit);
  });
});
describe("Transaction Mapper", () => {
  const expectedTransactionMapper = new Map();

  test("Should instantiate the constructor", () => {
    expectedTransactionMapper.set(user, transaction);
    transactionMapper.set(user, transaction);

    expect(typeof transactionMapper).toBe("object");
    expect(typeof transactionMapper.set).toBe("function");
    expect(typeof transactionMapper.get).toBe("function");
    expect(typeof transactionMapper.add).toBe("function");
    expect(typeof transactionMapper.charge).toBe("function");
    expect(typeof transactionMapper.credit).toBe("function");
    expect(transactionMapper.get()).toStrictEqual(expectedTransactionMapper);
  });

  test("Should Add transaction for user", async () => {
    await transactionMapper.add(user, creditCardNumber, limit);

    const transactionMap = objectToDataMap(
      user,
      transactionMapper.getUserTransaction(user)
    );
    const expectedTransactionMap = objectToDataMap(user, transaction);

    expect(transactionMap).toStrictEqual(expectedTransactionMap);
  });

  test("Should Charge the user", async () => {
    limit = 1000;
    balance = 1000;
    await transactionMapper.add(user, creditCardNumber, limit);
    await transactionMapper.charge(user, balance);

    const transactionMap = objectToDataMap(
      user,
      transactionMapper.getUserTransaction(user)
    );
    const expectedTransactionMap = objectToDataMap(
      user,
      new Transaction(creditCardNumber, balance, limit)
    );

    expect(transactionMap).toStrictEqual(expectedTransactionMap);
  });

  test("Should not Charge the user due to limit", async () => {
    limit = 500;
    balance = 1000;

    await transactionMapper.add(user, creditCardNumber, limit);
    await transactionMapper.charge(user, balance);

    const transactionMap = objectToDataMap(
      user,
      transactionMapper.getUserTransaction(user)
    );
    const expectedTransactionMap = objectToDataMap(
      user,
      new Transaction(creditCardNumber, balance, limit)
    );

    expect(transactionMap).not.toEqual(expectedTransactionMap);
  });

  test("Should Credit the amount from user", async () => {
    limit = 1000;
    const amount = 1000;

    await transactionMapper.add(user, creditCardNumber, limit);
    await transactionMapper.credit(user, amount);

    const transactionMap = objectToDataMap(
      user,
      transactionMapper.getUserTransaction(user)
    );
    const expectedTransactionMap = objectToDataMap(
      user,
      new Transaction(creditCardNumber, 0, limit)
    );

    expect(transactionMap).toStrictEqual(expectedTransactionMap);
  });
});
