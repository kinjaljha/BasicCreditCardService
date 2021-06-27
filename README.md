## Basic Credit Card Service(v1.0.0)

## Design descisions

- Two classes **Transaction** and **TransactionMapper** in _handlers_
    - Each class properties are protected
    - For TransactionMapper functions add, charge and credit methods, async await is used to maintain synchronous flow for future API additions.
- Map is used to maintain user transactions.
    - Map cannot be used directly from anywhere, it can be used only by TransactionMapper getter
- _Utils_ include the helper functions like file read, luhn10 algorithm, etc
- _types.js_ include the enums and constants for one place future updatations
- _assets_ includes the data files
- _test_ include the unit tests for the functionality

## Why Javascript

- Basic Credit Card Processing doesn't includes CPU intensive tasks major IO or simple operations can be implemented with ease in Node.js
- DB changes/updating methods can be made synchronous using async await

## Installation

In command line enter following command

```sh
git clone https://github.com/kinjaljha/BasicCreditCardService.git
cd CreditCardService
npm i
```

## How to Run

Enter the project folder

```sh
node index.js
```

For testing

```sh
$ npm test
```

## Inputs Allowed

- _txt_ file name eg input.txt
- stdin in transaction format with (eoi - end of input)

```sh
Add Tom 4111111111111111 $1000
Add Lisa 5454545454545454 $3000
Add Quincy 1234567890123456 $2000
Charge Tom $350
Charge Tom $800
Charge Lisa $7
Credit Lisa $100
Credit Quincy $200
eoi
```
