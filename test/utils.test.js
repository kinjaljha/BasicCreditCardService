import {
  validateCard,
  getNumericAmount,
  getDataFromFile,
  getPrintableTransactionSummary,
} from "../utils/index.js";
import { Transaction } from "../src/handlers/Transaction.js";

describe("Validate Credit Card by Luhn 10 tests", () => {
  it.each`
    creditCard            | expected
    ${"4111111111111111"} | ${true}
    ${"4417123456789113"} | ${true}
    ${"79927398713"}      | ${true}
    ${"5454545454545454"} | ${true}
    ${"4111111111111112"} | ${false}
    ${"1234567890123456"} | ${false}
    ${"nonNumeric"}       | ${false}
    ${"-1"}               | ${false}
  `('"$creditCard" should be "$expected"', (params) => {
    const { creditCard, expected } = params;
    expect(validateCard(creditCard)).toBe(expected);
  });
});

describe("getNumericAmount tests", () => {
  it.each`
    amount        | expected
    ${"$1000"}    | ${1000}
    ${"$1"}       | ${1}
    ${"$0"}       | ${0}
    ${"$1000.00"} | ${1000}
    ${"$1000.23"} | ${1000}
  `('"$amount" should be "$expected"', (params) => {
    const { amount, expected } = params;
    expect(getNumericAmount(amount)).toBe(expected);
  });
});

test("getDataFromFile test", () => {
  const fileName1 = "assets/inputTest.txt";
  const fileName2 = "assets/spacedDataTest.txt";
  const fileName3 = "assets/emptyTest.txt";

  const expectedDataChunk1 = [
    "Add Tom 4111111111111111 $1000",
    "Add Lisa 5454545454545454 $3000",
    "Add Quincy 1234567890123456 $2000",
    "Charge Tom $350",
    "Charge Tom $800",
    "Charge Lisa $7",
    "Credit Lisa $100",
    "Credit Quincy $200",
  ];

  expect(getDataFromFile(fileName1)).toEqual(expectedDataChunk1);
  expect(getDataFromFile(fileName2)).toEqual(expectedDataChunk1);
  expect(getDataFromFile(fileName3)).toEqual([]);
});

test("getPrintableTransactionSummary test", () => {
  const transactionMapper = new Map();
  const transactionInstance = new Transaction("5454545454545454", 200, 2000);

  transactionMapper.set("White", transactionInstance);
  transactionMapper.set("Gilfoyle", transactionInstance);
  transactionMapper.set("Dinesh", transactionInstance);

  const expectedDataChunk = [
    ["Dinesh", "$200"],
    ["Gilfoyle", "$200"],
    ["White", "$200"],
  ];
  expect(getPrintableTransactionSummary(transactionMapper)).toEqual(
    expectedDataChunk
  );
});
