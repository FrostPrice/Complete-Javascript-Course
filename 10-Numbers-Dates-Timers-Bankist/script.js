'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-12-14T14:43:26.374Z',
    '2020-12-16T18:49:59.371Z',
    '2020-12-17T12:01:20.894Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;

  // const day = `${date.getDate()}`.padStart(2, 0);
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // const year = date.getFullYear();
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(acc.movementsDates[i]);
    const displayDate = formatMovementDate(date, acc.locale);

    const formattedMov = formatCur(mov, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining Time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 sedonds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  let time = 120;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);

  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// // FAKE ALWAYS LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
// day/month/year

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === +inputLoginPin.value) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // Create current date and time
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      // weekday: 'long'  ,
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // const now = new Date();
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = +inputLoanAmount.value;

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add loan date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2500);
  }
  inputLoanAmount.value = '';

  // Reset timer
  clearInterval(timer);
  timer = startLogOutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

/*
/////////////////////////////////////////////////
// Converting and Checking Numbers

// In JavaScript, Numbers are represented always by decimals, and they are always stored in a binary format, so be carefull with the Bug that can happe because of that

console.log(23 === 23.0);

// Base 10 - 0 to 9. 1/10 = 0.1. 3/10 = 3.3333333...
// Binary base 2 - 0 and 1
console.log(0.1 + 0.2);

// When calculating 0.1 you will get an Error or a Bug, because it is dificult for a Binary based code to calculate 0.1, this will result in an infinite decimal

console.log(0.1 + 0.2 === 0.3);

// Conversion
console.log(Number('23')); // You can convert a String to a Number with the Number() Constructor
console.log(+'23'); // This is also converted to a Number, because of Type Coersion

// Parsing
// You can parse (analisar/converter) a Number from a String, to do this use parseInt or parseFloat of the Number Object, and with this Methods there can be letters in the String. Ex: Number.parseInt("23")
console.log(Number.parseInt('30px', 10)); // JavaScript will try to remove all the letters and leave the Numbers, but the String need to start with a Number
console.log(Number.parseInt('e23', 10)); // sing the 10 as the second Argument means that you are using the base 10 system

// The parseInt() (Int = Integers/ without decimals) Method have 2 Arguments, the first is the String to be converted and the second is the radix, and the radix is the base of the numeral system that we are using, basically is the base 10, binary and so on

// The parseFloat() Method does the same as the parseInt(), but JavaScript will search for decimals in the String too and not only the integers
console.log(Number.parseInt('  2.5rem  '));
console.log(Number.parseFloat('  2.5rem  '));

// console.log(parseFloat('  2.5rem  ')); // You don't need to call the parse Method with the Number Object, but this is a bad pratice
// Float or Float Poiting Number is a Number with decimals

// Check if value is NaN
// The isNaN() Method wil check is a Value is not a Number (NaN), and as Argument it will recieve the Value
console.log(Number.isNaN(23));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));
// Dividing something by 0 returns infinite
// isNaN() is not the perfect Method to check is a Value is not a Number

// Checking if value is number
// The isFinite() Method will check if a Value is a Number, this Method will return false to String and any Number that is Infinite. Meaning that this Method is the best to check if a Value is a Number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));

// The isInteger() Method will see if a Value is an Integer, meaning that decimals, Strings and Infinite will not count. This is good if you nily need to check for Numbers that are not an integer
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));

/////////////////////////////////////////////////
// Math and Rounding

// The Math.sqrt() Method will calculate the square root (raiz quadrada) of a Number
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); // Or you can use this equation
console.log(25 ** (1 / 3)); // And this is the only way to calculate a cubic root

// The Math.max() Method will return the maximum (higher) Value. As the Arguments you must pass Numbers separated by comma ,. And this Method does Type Coersion, but it doesn't do Parsing
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2));

// And there is also Math.min(), it does the same thing as the Math.max(), but this returns the minimun Value
console.log(Math.min(5, 18, 23, 11, 2));

// You can use the PI (3,14...) with the Math.PI Property
console.log(Math.PI * Number.parseFloat('10px') ** 2);

// The Math.random() Method returns random Numbers, each time this Method is called. This Method returns a Number between 0 and 1, but if you need an integer just multiply this Method by the Number you want to be the limit, this Number wil not be included, but if you want to include it just add 1 to the whole Expression
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min;
// 0...1 -> 0...(max - min) -> min...(max - min + min) -> min...max
// console.log(randomInt(10, 20));

// Rounding integers
// All this Method does Type Coersion

// The Math.round() Method will round (arredondar) a Number to its nearest integer
console.log(Math.round(23.3));
console.log(Math.round(23.9));

// The Math.ceil() Method return always the greater integer of a Value
console.log(Math.ceil(23.3));
console.log(Math.ceil(23.9));

// The Math.floor() Method will return always the lowest integer of a Value
console.log(Math.floor(23.9));
console.log(Math.floor('23.9'));

// The Math.trunc() Method removes all decimals of a Number leaving only the integer part of it
console.log(Math.trunc(23.3));

console.log(Math.trunc(-23.3));
console.log(Math.floor(-23.3)); // The floor() Method on negative Numbers will always return the lowest integer, basically -1.9 = -2, -23.3 = 24

// Rouding decimals
// The toFixed() Method will allow you to chose how many decimals you want to show, in the Argument is how many decimals will be shown. Also this Method needs to be called in the Value itself, meaning that sometimes you need to wrap the Value in (). And this Method converts the Value to a String
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.345).toFixed(2));
console.log(+(2.345).toFixed(2)); // You can convert a String to a Number with the + or the Number()

// Bosing means to convert a Value to an Object, so that this Object can access Methods, and once this Method finishes JavaScript will convert the Value back to its initial Data Type

/////////////////////////////////////////////////
// The Remainder Operator
// The Remainder Operator returns the remainder (restante) of a division, the Remainder Operator is %. This Operator only calculates the integer part of a Number that returns a decimal part. You can devide a Number with this Number having decimals in the end, the Value will be 0, basically this Operator works better with even Numbers
console.log(5 % 2);
console.log(5 / 2); // 5 = 2 * 2 + 1 <= this is the remainder

console.log(8 % 3);
console.log(8 / 3); // 8 = 2 * 3 + 2

console.log(7 % 2);
console.log(7 / 2);

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(514));

// You can check with the Remainder Operator is a Value is divisible of a certain Number, if the result is 0 then it is divisible

labelBalance.addEventListener('click', function () {
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    // 0, 2, 4, 6,
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0, 3, 6, 9
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
  });
});
// Nth
// If you need a to do something in some order or in every certain of time then use the Remainder Operator

/////////////////////////////////////////////////
// Working with BigInt

// BigInt is a special type of integer, and it is a new Primitive Type of Data used to store really big Numbers
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER); // You can see the highest safe Number in JavaScript with the Number.MAX_SAFE_INTEGER Property
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2);
console.log(2 ** 53 + 3);
console.log(2 ** 53 + 4);

// If you add a n after a Number that Number becomes a BigInt or you can use the BigInt() Function, but this Function is better to be used with small Functions
console.log(4646465489465132849651238496523489n);
console.log(BigInt(46464654));

// Operations
// The Operations works the same with BigInt as if it was with normal Numbers
console.log(10000n + 10000n);
console.log(4654654654564651321321163251651623n * 10000000n);
// console.log(Math.sqrt(16n)); // You cannot use the Math Object to do Operations with BigInt

// But you cannot mix BigInt with regular Numbers, but you can always convert a regular Number into a BigInt
const huge = 123165320546112165789231284131n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
// However you can still use regular Numbers to make a comparison with BigInt
console.log(20n > 15);
console.log(20n === 20); // Regular Numbers and BigInt are not extricly equal
console.log(typeof 20n);
console.log(20n == '20');

// REMEMBER: BigInt is a new Primitive Type from the ES2020

// And you can still concatonate (join) a BigInt into a String
console.log(huge + ' is REALLY big!!!');

// Divisions
// When doing a division with BigInt the value will always be rounded to the closest BigInt
console.log(11n / 3n);
console.log(10 / 3);

/////////////////////////////////////////////////
// Creating Dates

// There are many ways of creating dates, but they all use the new Date(), and this will change according to the Arguments you pass into the Function and/or if you attach a Method to this Function

// Create a date

const now = new Date(); // This returns the current date
console.log(now);

console.log(new Date('Dec 17 2020 20:31:08')); // If you give a String with a time inside JavaScrip will simply write this date with all the information you need about it
console.log(new Date('December 24,2015'));
console.log(new Date(account1.movementsDates[0]));

console.log(new Date(2037, 10, 19, 15, 23, 5)); // You can pass Numbers that are equivalent to the year, month, day, hours, minutes and seconds, in this order
console.log(new Date(2037, 10, 31)); // JavaScript will auto correct a date

// The month in JavaScript is 0 based

// In the Date() Constructor Function you can pass the time stamp, which is the mileseconds passed into the beggining of the Unix time, which is January 1, 1970
console.log(new Date(0));
console.log(new Date(3 * 24 * 60 * 60 * 1000));

// Working with dates
// Dates have Methods that can be used, you can use this Methods after a date was stored in a Variable or even when you create this date
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
// The getFullYear() Method will return the year of the date
console.log(future.getFullYear());
// The getMonth() Method will return the month of the date, and the month is 0 based
console.log(future.getMonth());
// The getDate() Method will return the day of the date
console.log(future.getDate());
// The getDay() Method will return the day of the week of the date, and this Method is 0 based, meaning that the week starts on sunday and sunday is 0
console.log(future.getDay());
// The getHours() Method will return the hour of the date
console.log(future.getHours());
// The getMinutes() Method will return the minutes of the date
console.log(future.getMinutes());
// The getSeconds() Method will return the seconds of the date
console.log(future.getSeconds());
// The toISOString() Method will make so that the date is return in a nicelly formated String
console.log(future.toISOString());
// The getTime() Method will return the time stamp of the date. The time stamp is the mileseconds that has passed the date January 1, 1970
console.log(future.getTime());

// NEVER use the getYear() Method

console.log(new Date(2142256980000)); // You can pass the mileseconds on the Date() Constructor Function Argument, and this mileseconds are converted to actual days

// The Date.now() Method will give us the time stamp of the time when the Method is called
console.log(Date.now());

// You can also set all these Values, like date, hour, etc, yourself. All these date Methods have a set Method, these set Methods perform auto correction and mutate the original Value
future.setFullYear(2040);
console.log(future);

/////////////////////////////////////////////////
// Adding Dates to "Bankist" App

// Refactoring makes it easier to implement new features as the time moves on

// You can loop through 2 Arrays at the same time, you can do this by using the Index

// REMEMBER: Sometimes you need to convert a Type of Data to be able to work with it

/////////////////////////////////////////////////
// Operations With Dates

// You can do calculations on Dates. This works because  when you try to convert a Date into a Number, the result will be in mileseconds and with this mileseconds you can preform calculations (time stamps)

// You can either convert a Date with the Number() Function or with the +

const future = new Date(2037, 10, 19, 15, 23);
console.log(+future);

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);

const days1 = calcDaysPassed(new Date(2037, 3, 4), new Date(2037, 3, 14));
console.log(days1);

// 1000 * 60 * 60 * 24 this will convert mileseconds to days

// If you need more precise Dates calculation use the library called Moment.js

/////////////////////////////////////////////////
// Internationalizing Dates (Intl)

// Internationalization means to easily format something based on the users location, language, etc

// To create this Internationalization, you use the new Intl. And to add the formating to dates simply put a dot after the Intl and the DateTimeFormat() Function, and inside this Function on the Arguments (), there is a locale String, which will take the language and dash (-) the country, and the country is in uppercase (en-US)
// After creating all of this you add another dot after the DateTimeFormat(), and add after the dot the format() Function, which will take a Date as Argument, and this Date passed inside the Argument will be formated based on the DateTimeFormat() Function Argument

// If you need to see the locale string of some country access the website called lingoes.net, in search for the ISO Language Code Table

// It is normal to have an Object that holds the configuration, like the configuration of a date for exemple

// And on this configurations Object you can specify the hour, minute, day, year, month and weekday. And on this Properties you can add the Value of a String to numeric ('numeric'), long ('long'), 2-digit ('2-digit'), short ('short'), narrow ('narrow')

// It is better to get the locale from the users browser. And to get the users locale dinamically use the navigator Object and then a dot, and after the dot the language Property. (navigator.language)

// You can search MDN for more of the Functions that the Intl API have

/////////////////////////////////////////////////
// Internationalizing Numbers (Intl)

const num = 3884764.23;

const options = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,
};

console.log('US:', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany:', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria:', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

// To use the Intl (Internationalization) with number use the new KeyWord and the after that the Intl Object, after the Intl add a dot and then the NumberFormat() Function , on this Function Arguments will be needed a locale String (e.g 'en-US'). After the () add another dot and then the format() Method which will take as an Argument the Number that you want to format

// As it is with date, with Numbers you can also create an configuration object. Inside this configuration Object you can specify the: style, and as a Value of this style you can add a String of unit ('unit'), making this unity availible to use as another Property, that you can add another String, which will contain the type of unit that you will use (e.g 'mile-per-hour')
// you can add porcent or currency to the style. For the porcent the unit and currency is ignored, but for the currency you need to create another Property with the name of currency and set a String of type of currency used (e.g 'EUR' or 'USD')

// And to see the different types of options that you can use access the MDN website

// And to add this configurations Object to the Numbers, simply put this Object after the locale on the NumberFormat() Function, separate the locale with the option with a comma (,)

// You can also add another Property called useGrouping on the configurations Object, to make that the Number get separated by the thousands, millions, ect. This Property will take a Bollean Value

// It is common to separate code into different files

/////////////////////////////////////////////////
// Timers: setTimeout and setInterval

// setTimeout
const ingredients = ['olives', 'spinach'];
// The setTimeout timer runs only once after the defined time, this Function recieve 2 Arguments, the first is a Call Back Function, and the second Argument is the amount of mileseconds that will passed before the CallBack Function runs
const pizzaTimer = setTimeout(
  (ing1, ing2) => console.log(`Here is your pizza with ${ing1} and ${ing2}`),
  3000,
  ...ingredients
);
console.log('Waiting...');

// You can pass Arguments into the CallBack Function of the timer by simply adding more Argument to the timer after the delayed time. You pass add a Parameter to the CallBack Function as you would do normaly, but the Arguments must be passed that other way

// Your code will not stop and wait for the timer to run the Function, it will simply run the code as normal but the CallBack Function on the timer will be save and will run after the specified mileseconds

// You can cancel the timer before the CallBack Function runs
// And to cancel the timer use the clearTimeout() Function, and as Argument this Function will recieve the setTimeout Function itself, which can be stored in a Variable

if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

// setInterval
// The setInterval timer keeps running forever until we stop it based on a given time of mileseconds. This Function works the same as the setTimeout() Function with the same CallBack Function, Arguments, etc. BUt this setInterval() Fucntion will keep running
setInterval(function () {
  const now = new Date();
  console.log(now);
}, 1000);

// SMALL CHALLENGE
setInterval(function () {
  const now = new Date();
  const hour = now.getDate();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  console.log(`${hour}:${minutes}:${seconds}`);
}, 1000);
*/
/////////////////////////////////////////////////
// Implementing a Countdown Timer

// REMEMBER: The Remainder Operator is good to create timers

// The clearInterval() Function will stop running a setInterval() Function, and on the clearInterval() Function Argumnet you need to pass as Argument the setInvertal() itself, you can do this by storing the setInterval in a Variable

// It is a good practice to store parts of your code in Function
