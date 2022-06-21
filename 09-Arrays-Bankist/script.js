'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__value">${mov}€</div>
    </div>
`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
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
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Event handler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    inputLoginPin.blur();

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const recieverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    recieverAcc &&
    currentAccount.balance >= amount &&
    recieverAcc?.username !== currentAccount.usernmae
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    recieverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23);

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;

    // Reset message
    labelWelcome.textContent = 'Log in to get started';
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

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
/*
/////////////////////////////////////////////////
// Simple Array Methods

// Methods are Functions that we can call on Objects
// Arrays are Objects hence they have Methods

let arr = ['a', 'b', 'c', 'd', 'e'];

// SLICE
// With the slice() Method you can extract any part of an Array without changing the original Array, creates a new Array. The first Argument is which Index it will start extracting from and the Second Argument is where it stop extracting, and the Second Argument will not Include the index passed
console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2)); // If a negative Argument is used then the extraction will run from right to left
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice()); // You can use the slice() Method to create a Shallow Copy af an Array
console.log([...arr]); // This also create a Shallow Copy

// The length of that is returned from sliced Array will be the Second Argument - the First Argument

// Use the slice() Method when you want to chain multiple Methods together

// SPLICE
// The splice() Method works the same as the slice() Method, but the splice() Method does change the original Array, basically extract the Values from the Array removing them. The First Argument works the same as in the slice() Method, but the Second Argument is how many Values you want to extract from the Array
// console.log(arr.splice(2));
arr.splice(-1);
console.log(arr);
arr.splice(1, 2);
console.log(arr);

// The splice() Method is usually used to remove unwanted VAlue from an Array

// REVERSE
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// The reverse() Method simply reverse an entire Array, but the reverse() Method does change (mutate) the original Array

// CONCAT
// The concat() Method will bring together (It will concatonate) 2 Arrays. You will use (attach) the concat() Method on the Array you want to join with another Array, and the concat() will recieve another Array as the Argument. This Method doesn't mutate the Original Array
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]); // This is the same thing as the concat() Method

// JOIN
console.log(letters.join(' - '));
// The join() Method will put together the Values from an Array into a String, this Method will take another String that will be what will separate the Values

// Check the MDN website if you need to remember any Method

/////////////////////////////////////////////////
// Looping Arrays: forEach

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, movement] of movements.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
}

// The Math.abs() will remove the sign of any number, basically taking only the absolute number

console.log('---- FOREACH ----');
// The forEach() Method is attached to an Array and it will Loop through this Array. As an Argument it requires a Call Back Function that will run the code on each Value of the Array and. On each teration of the Loop, the forEach() Method will pass the current Value as the Argument of the CallBack Function
movements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// The forEach() Method will pass into the CallBack Function the current Element of the Array, the current Index, and the Array itself, exactly in this order. And to access them simply put more Parameter on the CallBack Function

// The big diferrence betwen a For of Loop and a forEach Loop is that you can't Break and Continue a forEach Loop

/////////////////////////////////////////////////
// forEach With Maps and Sets
// You also Loop through Maps and Sets with the forEach() Method

// Map
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

// With a Map the CallBack Function of the forEach() Method, can also have 3 Parameters: the current Value, the Key of the current Value, and the whole Map itself, on the same order as presented here.
currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// With a Set the CallBack Function of the forEach() Method, can also have 3 Parameters: the current Value, the Key of the current Value, and also a Map of the Set, on the same order as presented here.
currenciesUnique.forEach(function (value, _, map) {
  console.log(`${value}: ${value}`);
});
// On a Set there in no Key or Index, basically when Loop through a Set the 'Key' and the Value are the same thing. this was done to avoid confusion

// Using an _ as a Variable or Parameter means that this Parameter is unecessary

/////////////////////////////////////////////////
// PROJECT: "Bankist" App

// Data that comse from a Web API is usually in the form of Objects

// It is common to have Objects, and then store this Objects inside an Array if the information of those Objects are the same

/////////////////////////////////////////////////
// Creating DOM Elements

// It is not always a good practice to write code on the Global Scope, it is always best to create a Function

// It's better to have a Parameter in a Function that recieves the Data. Than to have a Global Variable and work with that, never to this

// Template Literal are amasing for the creation of HTML code with Scripts

// The insertAdjacentHTML() will put a HTMl code that you created in the Script on the HTML File. The fisrt Argument is the position in which you to attach the HTML on the HTML Element that called the Method and the second Argument is the String containing the HTML that you want to insert

// The insertAdjacentHTML() will NOT overwrite ony code in the HTML File, it will only add Elements to it

// You can remove Element from the HTML File using the innerHTML Property and setting it to an empty String

// The innerHTML Property return the textContent and also the HTML text

/////////////////////////////////////////////////
// Data Transformations: map, filter, reduce

// Data Transformation means that you get a Data like an Array and transform this Array into another Array

// The map() Method can be used to Loop over Arrays, but map() creates another Array based on the looped Array, this Method takes a CallBack Function as Argument. And on each iteration it will run the code on the Elements of the Array and return a new Array with the Values tranformed by the CallBack Function
// Basically the map() Method returns a new Array containig the results of applying an operation on all original Array Elements

// The filter() Method will filter through an Array in search of Elements that are true to certain conditions
// Basically filter() returns a new Array containing the Array Elements that passed a specified test condition

// The reduce() Method will Loop through an Array reduce all Arrays Elements down to one and returns a single Value and not another Array

/////////////////////////////////////////////////
// The map Method

// The map() Method will return an Array containing as Elements the result of what a the CallBack Function executed. And the CallBack Function takes as Argument the current Array Element. All the Element that are returned from the CallBack Function are then stored in a new Array, that later can be stored in a Variable

const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd; // REMEMBER: To see if you need to explicitly Return a Value from a Function
// });

// You can use Arrow Functions as a CallBack Function
const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);
// In JavaScript using Methods and Function is becoming more and more of a common thing

const movementsUSDFor = [];
for (const mov of movements) movementsUSDFor.push(mov * eurToUsd);
console.log(movementsUSDFor);

// The map() Method also have access to 3 Parameters: the current Element, the current Index, and the whole Array, in the same order as writen here
const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

// You can have more than one Return Statement in a Function as long as one Return is runnig

// We do not call the CallBack Function inside an Array Method, is the own Method that is calling the CallBack Function on each ELement of the Array

// The forEach() Method does not create a new Array, it simply execute the CalBack Function on the Elements and then returns this Element individually

/////////////////////////////////////////////////
// Computing Usernames

// If an Arrow Function has only one line this Function will return the code imeadiatelly

// A Function should recieve the Data that it is going to work with, tahn to work with a Global Variable

// REMEMBER: If you need a new Array from the result of a Function use the map() Method, otherwise use the forEach() Method

// A Side Effect is when you do some work without returning anything. Basically, e.g mutate a Data so that you can use it

/////////////////////////////////////////////////
// The filter Method

// The filter() Method returns a new Array of Elements that passed a certain condition. The CallBack Function will have access in the Parameters to the: current Value, current Index, and the whole Array, in this order
// Also it is on the CallBack Function that you will give the condition for the Elements to pass. You will write this condition by returning a boolean Value

const deposits = movements.filter(function (mov, i, arr) {
  return mov > 0;
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);

// REMEMBER: the push() Method

// You can Chain Methods, basically use one after another

/////////////////////////////////////////////////
// The reduce Method

// The reduce() Method is used to reduce all the Elements of an Array to one single Value, nad the reduce() Method doesn't return an Array. This Method also get a CallBAck Function, and this CallBack Function will have access, in its Parameter, to a Accumulator, this Accumulator will accumulate the Values so in the end you can return the final Value, to the Current Value, to the current Index and to the entire Array, on this same order
// In each call of the CallBack Function the Accumulator will be the current Value of some expression based on all the previous Values
// The reduce() Method have a second Argument, after the CallBack Function, this second Argument is the initial Value of the Accumulator on the Loop Iteration number 0

console.log(movements);

// accumulator -> SNOWBALL
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;

console.log(balance2);

// With the reduce() Method is more common to use only the accumulator and the current value as a Parameter

// REMEMBER: The name of the Parameters in the CallBack Function doesn't matter, but the order does

// Label is the things where you want to put some text

// Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);

// The reduce() Method can return a lot of Values, like a String, an Object, a multiplication, etc

// When using reduce() asks yourself the question: What is the porpouse of the accumulator?

// You your looking for the max and min Value of an Array always start from the Index 0

/////////////////////////////////////////////////
// The Magic of Chaining Methods

// You can chain Methods, meaining that you can usea Method agter another Method together in the same line
// Just be carefull with the order of the Methods, meaning that you can only use an Array Method after another Method that return an Array, and so on

const eurToUsd = 1.1;
console.log(movements);

// PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // .map(mov => mov * eurToUsd)
  .map((mov, i, arr) => {
    // console.log(arr);
    return mov * eurToUsd;
  })
  .reduce((acc, mov) => acc + mov, 0);

console.log(totalDepositsUSD);

// It is kinda tricky to Debug when you have chained Method. But when you need to Debug, you will have to go thrpugh each Method to see waht they are returning, and to do that you can use the Array Parameter in the next Method to see what the previous Method returned

// REMEMBER: When you are chaining Method, the Method are called in the result of the previous Method

// The Math.abs() return the absolute Value of a Number without any sign

// DO NOT overuse chaining
// It is a bad practice to chain Methods that mutate (change) the original Array, like the splice() or reverse() Method

/////////////////////////////////////////////////
// The find Method

// The find() Method Loops over an Array and retrieves a Value from that Array based on a certain condition, this Method needs a CallBack Function. And inside this CallBack Function goes the condition, meaning that it needs to return a Boolean
// The find() Method returns the first Value of the Array that passes the condition

const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

// The difference between the filter() and find() is that filter() return another Array with ALL the Values that are true to the condition passed, while the find() return only the FIRST Value that passes a certain condition and not another Array

// Using find you can retrieve a Object from an Array of Object by searching a Property of that Object
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

// You usually use the find() Method with a condition that is specific to a certain Element of Value, like a person's name and so on

for (const acc of accounts)
  acc.owner === 'Jessica Davis'
    ? console.log(acc)
    : "This Object doesn't exists";

/////////////////////////////////////////////////
// Implementing Login

// Some Event Handlers have some default functionalities, and to stop that default functionality use need to pass an event on the CallBack Function Parameter and attach this event Parameter to the preventDefault() Method

// Hitting ENTER on a Input Field is the same as click a Button on the same Form as the Inputs

// Keep important informations or data that you need to remember outside assigned a Function and just reassign it later

// REMEMBER: If you need to see the text in the Input, select the Input and use .value. And also all the values in the Input will come as a String

// The find() Method returns Undefined if not value matches the condition

// If you put a ? after a Variable or Element, JavaScript will check if that Element exists and the will continue running, otherwise it will stop

// The Assignment Operator works from right to left, meaning that you can do something like this: inputLoginUsername.value = inputLoginPin.value = '';

// The blur() Method will make that an Object looses the focus, like a input will have its selection removed and so you have you select it again

/////////////////////////////////////////////////
// Implementing Transfers

// It is really normal to use preventDefault() when working with Forms

// REMEMBER: That with Object you only make a reference to the Object in Memory heap and not a copy of it

/////////////////////////////////////////////////
// The findIndex Method

// The findIndex() Method needs a CallBack Function and in this CallBack Function it will recieve and a condition, and if this condition is true the findIndex() Method returns the first Index that passed the condition and not the Element itself

// To delete, remove or extract an Element from an Array use the splice() Method, and this Method mutate (change) the original Array

// The findIndex() Method is similar to the find() Method, but findIndex() Method returns the Index of the ELement and find() Method return the Element

// Also the indexOf() can only find the Index of Elements that are in the Array, like a number, but with findIndex() Method you can create complex conditions

// The find() and findIndex() Method also have access to the current Element, current Index and current Array in the Paramters of the CallBack Function. And they are an ES6 features

/////////////////////////////////////////////////
// some and every

console.log(movements);

// EQUALITY
// You can use the includes() Method to check if an Array has exactly the same Element, as the Argument passed into the Method
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some(mov => mov === -130));
// The some() Methos check if an Array have some Elements based on a certain condition, and this condition will be put in the CallBack Function, that return true if there is at least 1 Element based on the condition
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// If you think in the word any remember that this means that you could use the some() Method

// EVERY
// The every() Method check if all Elements at an Array passed a condition, if all Elements passed then returns true, but if 1 is false the every() return false. This Method recieves a CallBack Function and in this CallBack Function goes the condition
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

// Separate callback
// The CallBack Function doesn't need to be writen directly in the Method Argument, but instead you can write the Function outside the Method and then pass this Function as a CallBack Function for the Method
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

/////////////////////////////////////////////////
// flat and flatMap

// The flat() Method will basically get an Array that has Arrays inside and create another Array with all the Element from the Array and the nested Array, and make one Array containing all the Values from the others Arrays. This Method doesn't need an Argument

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat(2)); // You can pass a Number as Argument to say how deep will the flat() Method go in the Array

// The flat() Method only goes 1 level deep when flattening Arrays, this means that if you have deeply nested Array some of the Elements would still be inside some Arrays

// flat
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov);
console.log(overalBalance);

// It is common to map() and then later to flat() the result

// flatMap
// The flatMap() Method is the combination of the map() and flat() Method together. This flatMap() takes the same Callback Function as the map() Method. But this Method only goes 1 level deep in the Array and you cannot change it, unlike the flat() Method itself, where you can change how deep the Method goes in the Array
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov);
console.log(overalBalance2);

/////////////////////////////////////////////////
// Sorting Arrays

// The sort() Method is used to organize, to sort (ordenar) an Array, it can have a CallBack Function, but it is not necessary. And this Method mutates the original Array

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B ,A (switch order)

// Ascending
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);
// The sort() Method does the sorting based on Strings, meaning that it will convert a Number to a String and then do the sorting
// And to fix the sorting problem with Number, you need to pass a Compare CallBack Function as the Methods Argument
// The CallBack Function for the sort() Method has 2 Parameters, the First Parameter is the current value and the Second Paremeter is the next Value

// if we return something less than 0 the first Paramter will be before the Second Parameter, if we return something greater than 0 the Second Paramter will be before the First Parameter. And this 'something' can be any positive number or negative number, as long as it makes sense on the condition. (a - b) or (b - a)
// If a and b are the same, thus returning 0 their postion remains the same

// Ascending Order is from small to big numbers

// If you have mixed types of Data in an Array, don't use use the sort() Method

// Don't use the Spread Operator if you're going to Chain Methods, instead use the slice() Method

// A State Variable is a Variable that keeps track of a changing Value

/////////////////////////////////////////////////
// More Ways of Creating and Filling Arrays

const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// You can create Arrays programmaticaly, this means that you don't need to write the data manually

// Empty arrays + fill method
const x = new Array(7); // This is the Array Constructor
// If you pass only one Argument when creating an Array with the Array Constructor (new Array()), an empty Array will be create with the length of the number passed
console.log(x);

// You cannot use the map() Method at an Array that was created with the Array Constructor, it will do nothing to the Array
// console.log(x.map(() => 5));

// The fill() Method will basically push a value passed in the Argument of the Method, to an Array until that Array is filled with whatever was passed in the Method, this mutate the Original Array
x.fill(1);
// The fill() Method can take 3 Arguments, the first is the Value that will fill the Array, the second is the Index where this Method will start filling the Array, and the third is the Index where the Method will stop filling the Array, the third will not be included in the Array
x.fill(1, 3, 5);
console.log(x);

// It doesn't need to be an empty Array to use the fill() Method, but this will overwrite the Values from the Array if it was specified on that position

arr.fill(23, 2, 6);
console.log(arr);

// Array.from
// The Array.from() Method will create an Array based on a give iterable. This Method will take 2 Arguments, the first is an Object with a property called length, that will have a number corresponding to the length of the Array, and the second will be a CallBack Function, and on this CallBack Function will return what should the Array have as Values
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

// The CallBack Function of the Array.from() Method has access to the current Value and current Index in the Parameter section
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

// When you put a _ as a Parameter, this means that this Parameter will not be used

// The Array.from() Method it was created to create Arrays from Arrays-like Structures (iterables).
// querySelectorAll returns a NodeList, but it is an iterable, and you can convert this NodeList to an Array

// You can attach Event Listener to all Objects
labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')]; // You can also use the Spread Operator to create an Array from an iterable
});

// You can use all Array Methods with a data that was converted with the Array.from() Method
// Also you can map an Array directly in the Array.from() Method, this is the second Parameter of the Method
*/
/////////////////////////////////////////////////
// Summary: Which Array Method to Use?

// When thinking in what Array Method to use, first ask the question: "I want...":
// To mutate original Array: add to original (push, unshift), remove from original (pop, shift, splice), others (reverse, sort, fill)
// A new array: computed from original (map), filtered using condition (filter), portion of original (slice), adding orginal Array to other Array (concat), flattening the original (flat, flatMap)
// An Array index: based on a value (indexOf), based on test condition (findIndex)
// An Array Element: based on a test condition (find)
// To know if an Array includes: based on a Value (includes), based on test condition (some, every) this returns a Boolean
// A new String: based on a separator of the String (join)
// To transform to Value: based on a accumulator (reduce)
// To just Loop through an Array: based on CallBack (forEach), doesn't returns a new Array

// REMEMEBER:  With the sort() Method you still have access to the Objects Properties
