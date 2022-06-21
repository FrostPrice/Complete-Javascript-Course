/////////////////////////////////////////////
// Activating Strict Mode
// The Strict Mode make it easier for us to write secure JavaScript code, by avoiding and showing us bugs and errors
"use strict"; // This activate the Strict Mode nad it needs to be the first thing in the code

/*
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive :D");

// It also add a list of KeyWords that are reserved for upcoming features
// const interface = "Audio";
// const private = 543;
// const if = 23; // Reserved KeyWords cannot be used as variables names


/////////////////////////////////////////////
// Functions
// A Function is a piece of code that we can reuse in our code, that can have complex line of code

function logger() {
  // This is the function body and this will run when the function is runnig
  console.log("My name is Jonas");
}

// Calling / Running / Invoking Function
logger(); //This is calling, invoking or runnig the function, all of the 3 are the same. Aka this will execute the function and the code within
logger();
logger();

// A Function get recieve and return information or data
// Paremeters are like variables that are expecific only for the function his is in
// Define the paremeters in the () we creating a function, they are the input data for the function
// The data of the paremeters are created and defined when the function is called
function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice; // This is the result of the function
  // The Return KeyWord makes that the value are returned, meaning that the value will be avaliable on the global scope to be used anywhere
}

// The values of the parameters are called Arguments
const appleJuice = fruitProcessor(5, 0); // These are the Arguments that are going to be used in the function
console.log(appleJuice);
// When the function runs, the result(Return) of the function will become the function, basically replacing the function with the result(Return). By the end a funtion is a value that can be stored on a variable

//Now you can reuse the function with different Arguments
const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number("23"); // This is a Build-in Funtion, like console.log()

// DO NOT REPEAT YOURSELF

/////////////////////////////////////////////
//Function Declarations vs. Expressions
// Function Declarations is when you use the Function KeyWord to declare a Function, just like a variable

function calcAge1(birthYear) {
  return 2037 - birthYear; // You can return an Expression directly
}
const age1 = calcAge1(1991);

// Function Expressions is when you declare the Function as a value of a variale, without naming the Function directly
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};

const age2 = calcAge2(1991); // To call a Function Expression, you do it the same way as with a Function Declaration

console.log(age1, age2);
// You can call Function Declarations before they are defined in the code

/////////////////////////////////////////////
// Arrow Functions

// Arrow Function is a Function Expression, but shorter and quicker to write
// And on a Arrow Function the vaue is returned implicitly, meaning that we don't need to write the Return KeyWord for 1 line Functions
const calcAge3 = (birthYear) => 2037 - birthYear; // The Arrow Function is perfect for 1 line functions
const age3 = calcAge3(1991);
console.log(age3);

const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  //   return retirement;
  return `${firstName} retires in ${retirement} years`;
}; // You can use {} for bigger lines of code using the Arrow Function, and when using {} you need the Return KeyWord

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1980, "Bob"));
// The Arrow Functions don't have the This KeyWord, unlike the Functions Declarations and Functions Expression which have

/////////////////////////////////////////////
// Functions Calling Other Functions

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} piece of apples and ${orangePieces} pieces of oranges`;
  return juice;
}
console.log(fruitProcessor(2, 3));

/////////////////////////////////////////////
// Reviewing Functions

const calcAge = function (birthYear) {
  return 2037 - birthYear;
};
// There can be Parameters with the same name in different Functions, they are not related at all
const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;

  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement; // The Return KeyWord immediately exists the function, returning it
  } else {
    console.log(`${firstName} has already retired`);
    return -1; // -1 or 9999 means that it has no meaning
  }
};
// It is a good practice to return the same Data Value as it was recieved
console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));

// Function Declarations can be used before they are declared in the code
// Function Expression is a Function that is stored as a value in a variable
// Arrow Function are like Function Expression, but are quicker to write and has no This KeyWord
// All Function recieve input data, transform the data, and output the data

// Parameters are placeholders to recieve input data, like a local Variable jsut for that Funtion
// Functions are made to reuse a piece of code
// The Return KeyWord output the data from the Function and it need to be the last thing on the Function
// To call the function, write the name of the Function on the use () After it
// Without the (), the Function is just a value, and with the  () you are calling the Function
// Arguments are the values that are being input in the faunction Parameters
// At the end a Function is just a value that can be stored in a Variable
// You can call a Function as many times as you want
// It doesn't matter where the values of the arguments passed in the Paremeters comes from

/////////////////////////////////////////////
// Introduction to Arrays
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";

// Array is like a big container for a lot of information, like variables, and later on reference them
// The most important Data Structures are: Arrays and Objects

// To create use [] and use the , to separate the values
const friends = ["Michael", "Steven", "Peter"];
console.log(friends); // Most common way to create an Array, also called Literal Syntax

const y = new Array(1991, 1984, 2008, 2020);
// An Array can hold as many values as we want, nad many data types as we want

// The Index (number) of an element of an Array, start from 0
// And to call the element by the Index use the [] after the name of the Array (or the variable)
console.log(friends[0]);
console.log(friends[2]);

// The Length propertie for Array will return the amount of elements that Array have
console.log(friends.length); // Starts from 1
console.log(friends[friends.length - 1]); // This will return the last Element of the Array
// On the arrayName[], can be any Expression on the []

friends[2] = "Jay"; // You can reassign an Element of an Array directly
console.log(friends);
// An Array isn't an imutable(changeble) variable, meaning that its values can be change even if the Array is store on a const
// friends = ["Bob", "Alice"] // Cannot reassign the whole Array, only its Elements

const firstName = "Jonas";
const jonas = [firstName, "Schemedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);
// You can store Expressions as an Array Element
// You can put an Array inside another Array

// Exercise
const calcAge = function (birthYear) {
  return 2037 - birthYear;
};
const years = [1990, 1967, 2002, 2010, 2018];

// You can't calculate (use) a whole Array, but instead you need to calculate (use) its Elements
const age1 = calcAge(years[0]);
const age2 = calcAge(years[1]);
const age3 = calcAge(years[years.length - 1]);
console.log(age1, age2, age3);

// It's a good pratice to output a value in the same Data Types he was input
const ages = [
  calcAge(years[0]),
  calcAge(years[1]),
  calcAge(years[years.length - 1]),
];
console.log(ages);

/////////////////////////////////////////////
// Basic Array Operations (Methods)
// Array Method are like functions that help you manage the data in your Array

const friends = ["Michael", "Steven", "Peter"];

// Add Elements
// The Push Method adds a value to the end of an Array, returns the Array Length
const newLength = friends.push("Jay"); // The . (dot) means that something is attached to another thing

// As the Push Method and all other Methods, are actually a Function, it returns a value, that can be stored in a variable
console.log(friends);
console.log(newLength);

// The Unshift Method adds a value in the start of an Array
friends.unshift("John");
console.log(friends);

// Remove Elements
// The Pop Method removes the last Element of an Array, return the Element Removed
friends.pop(); // Last // It doesn't need an Argument
const popped = friends.pop();
console.log(popped);
console.log(friends);

// The Shift Method removes the first Element of an Array, return the Element Removed
friends.shift(); // First // It doesn't need an Argument
console.log(friends);

// The IdexOf returns the position of an Element in the Array
console.log(friends.indexOf("Steven"));
console.log(friends.indexOf("Bob")); // Returns -1 since the Element doesn't exist

friends.push(23);
// The Includes Method returns a True or False value whether the Array have the Element asked (This MEthod uses Strict Equality)
console.log(friends.includes("Steven"));
console.log(friends.includes("Bob"));
console.log(friends.includes(23));

if (friends.includes("Steven")) {
  console.log("You have a friend called Steven");
}

// It is normal to give an Array a plural name, since it have multiple information of that genre

/////////////////////////////////////////////
// Introduction to Objects
// Objects is Data Structure where you can define a name for the different types of information, it is different from an Array where is usually one type of information

// Array
// const jonasArray = [
//   "Jonas",
//   "Schemedtmann",
//   2037 - 1991,
//   "teacher",
//   ["Michael", "Peter", "Steven"],
// ];

// Obejct
// To create an Obejct use the {}, and inside the {} you need to define a variable name with : after it. And the value after the : can be of any type
const jonas = {
  // Using the {} is called an Obejct Literal Syntax
  firstName: "Jonas", // Separate the variables with ,
  lastName: "Schmedtmann",
  age: 2037 - 1991, // You can put Expressions as values too
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"], // You can use Arrays as values too
};
// The name of the Variables inside a Object can also be called Properties
// The order of the values doesn't matter in the Objects
// Use Arrays for more ordered Data and Object for more unstructured Data, where you want to get the data from its name than from its position

/////////////////////////////////////////////
// Dot vs. Bracket Notation
const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  age: 2037 - 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
};
console.log(jonas);

// You can use the . (Dot Notation) to select a Property inside an Object. Syntax: objectName.propertyName
console.log(jonas.lastName); // The . is an Operator

// You can use the [] (Bracket Notation) to select Property inside an Object. Syntax: objectName["propertyName"]
console.log(jonas["lastName"]); // The name of the Property needs to be inside ""

// The difference between the . and the [], is that the [] accepts an Expression
const nameKey = "Name";
console.log(jonas["first" + nameKey]);
console.log(jonas["last" + nameKey]);

// console.log(jonas."last" + nameKey); // This won't work, with the Dot Notation it needs to be the Property Name

// Use the Bracket Notation when you want to compute the Property name first, otherwise use the Dot Notation

const interestedIn = prompt(
  "What do you want to know about Jonas? Choose between: firstName, lastName, age, job, and friends"
);

// Undefined is a value that we get for trying to acess a property on a Obejct that doesn't exist

if (jonas[interestedIn]) {
  console.log(jonas[interestedIn]);
} else {
  console.log(
    "Wrong request! Choose between: firstName, lastName, age, job, and friends"
  );
}

// To add a new Property using the Dot Notation, simply use the name of the Object with the . (Dot) and after the name of the new Property, and then set that = (Equal) to the value you want
jonas.location = "Portugal";
// To add a new Property using the Bracket Notation, simply use the name of the Object with the [] (Bracket) and inside the [] the name of the new Property, and then set that = (Equal) to the value you want. Also on the name of the new Property can be an Expression if you want
jonas["twitter"] = "@jonasschedtman";
console.log(jonas);

// Challenge
// "Jonas has 3 friends, and his best friend is called Michael"
console.log(
  `${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`
);

/////////////////////////////////////////////
// Object methods
// Object can hold another Object inside of it
// You can add Functions to Objects

const jonas = {
  firstName: "Jonas",
  lastName: "Schmedtmann",
  birthYear: 1991,
  job: "teacher",
  friends: ["Michael", "Peter", "Steven"],
  hasDriversLicense: true,

  // Use a Function Expression to create a Function inside an Object
  // calcAge: function (birthYear) {
  //   return 2037 - birthYear;
  // },
  // Any Function attached to an Object is a Method

  // The This KeyWord or Variable is equal to the Obejct in which the Method is localed. Is equal to the Object calling the Method or the This
  // calcAge: function () {
  //   // console.log(this);
  //   return 2037 - this.birthYear;
  // },

  calcAge: function () {
    this.age = 2037 - this.birthYear; // Here we are creating a new Property in 'This' (jonas) Object and assigning an expression to it
    return this.age;
  },

  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-years old ${
      this.job
    }, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license`;
  },
};
// A Method is a Property that holds a Function value

// To call a Function inside an Obejct is the same way as always, but you need to use the Dot or Bracket Notation, since the Function is inside an Object
console.log(jonas.calcAge());

console.log(jonas.age);
console.log(jonas.age);
console.log(jonas.age);
// console.log(jonas["calcAge"](1991)); // To call a function using the Bracket Notation [], wrap the name of the Function with the [] and with "", and outside the [] use the ()

// What appear before the . (Dot), when calling the Method, aka is the This KeyWord

// Chellenge
// "Jonas is a 46-years old teacher, and he has a driver's license"

console.log(jonas.getSummary());

// Never assume a Function is going to be called before another Function

// Arrays are a special kind of Objects, which have a built-in Methods or Functions to manipulate them

/////////////////////////////////////////////
// Iteration: The for Loop
// Loop help us automate repetitive tasks, meaning that we are going to use Loop for tasks that we are going to do over and over again

// This is a bad practice
// console.log("Lifting weights repetition 1");
// console.log("Lifting weights repetition 2");
// console.log("Lifting weights repetition 3");
// console.log("Lifting weights repetition 3");
// console.log("Lifting weights repetition 4");
// console.log("Lifting weights repetition 5");
// console.log("Lifting weights repetition 6");
// console.log("Lifting weights repetition 7");
// console.log("Lifting weights repetition 8");
// console.log("Lifting weights repetition 9");
// console.log("Lifting weights repetition 10");

// The For Statement has 3 part for the condition: the initial value for the counter, a logical condition that evaluated before each iteration of the Loop ( If the condition turn False, the Loop stops), update the counter after each iteration
// For Loop keeps running while condition is TRUE
for (let rep = 1; rep <= 30; rep++) {
  // This is what the For Loop will run, until those 3 conditions are True
  console.log(`Lifting weights repetition ${rep}`);
  // The Variable created in the condition can be used anywhere within the For Loop it was created, and it is the counter itself
}

// In the For Statement you must create a Let Variable, since the value are going to change

// ++ increases the value by 1

/////////////////////////////////////////////
// Looping Arrays, Breaking and Continuing
// The most common use for the For Statement is to Loop through an Array

const jonas = [
  "Jonas",
  "Schemedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];
const types = []; // You can create an empty Array

// console.log(jonas[0]);
// console.log(jonas[1]);
// ...
// console.log(jonas[4]);
// jonas[5] does NOT exist

// Since an Array start from 0, the Loop also will start from 0. And it's common to name the variable of a For Loop "i"
for (let i = 0; i < jonas.length; i++) {
  // Reading From Jonas Array
  console.log(jonas[i], typeof jonas[i]);

  // Filling Types Array
  // types[i] = typeof jonas[i];
  types.push(typeof jonas[i]);
}

console.log(types);

// The 2º condition in a For Statement to Loop through an Array is basically the variable created in the For Loop lesser than the length of the Array

// Since we get the value of an Array by its Index, that why we increment the variable in the For Loop by 1, doing that we will get all element in the Variable

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
  ages.push(2037 - years[i]);
}
console.log(ages);

// Continue and Break
// Continue exits the current iteration of the Array and go to the next iteration. Continue will SKIP to the next Iteration, when using the If Statement if the value is TRUE the Continue will pass to the next iteration
// Break terminates (ends) the entire Loop

console.log("--- ONLY STRINGS ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== "string") continue;
  console.log(jonas[i], typeof jonas[i]);
}

console.log("--- BREAK WITH NUMBER ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === "number") break;
  console.log(jonas[i], typeof jonas[i]);
}

for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== false) continue;
  console.log(jonas[i]);
}

/////////////////////////////////////////////
// Looping Backwards and Loops in Loops
const jonas = [
  "Jonas",
  "Schemedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];

// 0, 1, ..., 4
// 4, 3, ..., 0

// Looping Backwards
for (let i = jonas.length - 1; i >= 0; i--) {
  console.log(i, jonas[i]);
}

// Loop inside Loop
// You can create a Loop inside a Loop
for (let exercise = 1; exercise < 4; exercise++) {
  console.log(`-------- Staring exercise ${exercise} --------`);
  for (let rep = 1; rep < 6; rep++) {
    console.log(`Exercise ${exercise}: Lifting weights repetition ${rep}`);
  }
}

// A Loop will thats inside another Loop, will repeat the same task as many times as defined in the parent Loop

/////////////////////////////////////////////
// The while Loop

// for (let rep = 1; rep <= 10; rep++) {
//   console.log(`Lifting weights repetition ${rep}`);
// }

// The While Loop needs the same conditions as the For Loop
// Conditions: A counter thats going to be defined outside the While Loop, A condition that going to be True or False (When it's True the code will keep runing), And the update of the value
let rep = 1; // 1º Condition
while (rep <= 10) { //2º Condtiion, inside the ()
  // console.log(`WHILE: Lifting weights repetition ${rep}`); // Code that will run
  rep++; // 3º Condition
}
// The While Loop is more versitale than a For Loop
// A While Loop only needs the Logical Condition to work. As long as that condition is True

let dice = Math.trunc(Math.random() * 6) + 1;

while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 6) + 1;
  if (dice === 6) console.log("Loop is about o end...");
}

// The While Loop is good when you don't know how many iteration the Loop will have

// Math.random give us a random number, which we can multiply by another number that will be the limit where that random number can go. The random number will always be one value below to the number multiplied
// Math.trunc return the integer of a number, ignoring the decimals
*/
