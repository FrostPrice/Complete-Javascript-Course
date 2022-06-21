/* Values and Variables
let js = "amazing";
console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

let firstName = "Matilda"; // A variable is a box where we can store value

console.log(firstName);
console.log(firstName);
console.log(firstName);

// Variable name conventions
let jonas_matilda = "JM";
let $function = 27; // It's allowed to use $ and _

let person = "jonas"; // First letter upercase is for object oriented programming
let PI = 3.1415; // For values that never changes

let myFirstJob = "Coder"; // Make descriptive variables names
let myCurrentJob = "Teacher";

let job1 = "programmer"; // Never do this
let job2 = "teacher";

console.log(myFirstJob);

/////////////////////////////////////////////
// Data Type
let javascriptIsFun = true; // The type of data is in the value and not the variable
console.log(javascriptIsFun);

// console.log(typeof true); // Typeof returns the type of the values
console.log(typeof javascriptIsFun);
// console.log(typeof 23);
// console.log(typeof "jonas");
// Dynamic typing means that you can change the type of a value that is inside a variable
javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);

let year; // Undefined is an empty value. A value that has not been defined yet
console.log(year);
console.log(typeof year);

year = 1991;
console.log(typeof year);

console.log(typeof null); // Null is the same as undefined and the typeof is also null

/////////////////////////////////////////////
//Let, Const and Var
let age = 30; // Let is used when a value changes (reassigning a value)
age = 31;

const birthYear = 1991; // Const is used for values that doesn't change
// birthYear = 1990;
// const job; // Cannot assing an empty valu for a const

var job = "programmer"; // Don't use var
job = "teacher";

lastName = "Schedtmann"; // Don't code like this
console.log(lastName);

/////////////////////////////////////////////
// Basic operators
// Math operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah); // You can log diferent values at the same time

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 means 2 to the power of 3 = 2 * 2 * 2

const firstName = "Jonas";
const lastName = "Schmedtmann";
console.log(firstName + " " + lastName); // You can concatonate(Put together) strings together with +

// Assignment operators
let x = 10 + 5; // 15 // = assign a value
x += 10; // x = x + 10 = 25 // += adds a value to the existing value
x *= 4; // x = x * 4 = 100 // *= multiplicates the existing value
x++; // x = x + 1 // ++ adds 1 to the value
x--; // -- removes the value by 1
x--;
// There is also a /= operator
console.log(x);

// Comparison operators (Returns a boolean)
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018);


/////////////////////////////////////////////
//Operator precedence
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

let x, y; // You can declare 2 varibales at the same time
x = y = 25 - 10 - 5; // x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);

/////////////////////////////////////////////
// Strings and Template Literals

const firstName = "Jonas";
const job = "teacher";
const birthYear = 1991;
const year = 2037;

const jonas =
  "I'm " + firstName + ", a " + (year - birthYear) + " years old " + job + "!";
console.log(jonas);

// A template literal can assemble multiple things in only one string
// To create a Template Literal use `` and then put the things you can, like variables inside this ${}
const jonasNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(jonasNew);

console.log(`Just a regular string...`);

// \n\ creates a new line
console.log("String with \n\
multiple \n\
lines ");

// With `` you can create multi lines strings
console.log(`String
multiple
lines`);

/////////////////////////////////////////////
// Taking decisions: If / Else Statements
const age = 15;

// Controled Scructure
if (age >= 18) {
  console.log("Sarah can start driving license");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sarah is too young. Wait another ${yearsLeft} years :)`);
}

const birthYear = 2012;

let century; // To make a variable acessible on the global scope declare it outside the function and then just reassign it on the funtion
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

/////////////////////////////////////////////
// Type Conversion and Coercion

// Type Conversion is when you manually convert a data type from one to another
const inputYear = "1991";
console.log(Number(inputYear), inputYear); // The Number function converts a String into a Number type of data
console.log(Number(inputYear) + 18);

console.log(Number("Jonas")); // Returns Nan (Not a Number), it means an invalid number
console.log(typeof NaN);

console.log(String(23), 23); // The String function converts a Number to a String

// Type Coercion is when JavaScript converts automatically converts a data type for us
console.log("I am " + 23 + " years old"); // The + converts automatically the Number to a String
console.log("23" - "10" - 3); // The - converts automatically the String to a Number
console.log("23" / "2"); // The * and / converts automatically the String to a Number
console.log("23" > "18"); // It also converts the String to a Number with the Logical operators

let n = "1" + 1; // "11"
n = n - 1; // 10
console.log(n);

/////////////////////////////////////////////
// Truthy and Falsy Values

// Falsy is the values that will become false if we convert them
// 5 Falsy values: 0, "", undefined, null, Nan

console.log(Boolean(0)); // The Boolean function convets a value to either True or False
console.log(Boolean(undefined));
console.log(Boolean("Jonas"));
console.log(Boolean({})); // An empty Object is Truthy
console.log(Boolean(""));

const money = 100;

if (money) {
  console.log("Don't spend it all ;)");
} else {
  console.log("You should get a job!");
}

let height = 0;
if (height) {
  console.log("YAY! Height is defined");
} else {
  console.log("Height is UNDEFINED");
}

/////////////////////////////////////////////
// Equality Operators: == vs ===
// The Equality Operators return a boolean value
// There is the a big diference between the assignment operator (=) and the Equality operators (=== and ==)

const age = "18";
if (age === 18) console.log("You just became an adult :D (Strict)"); // The === (strict equlity operator) doesn't do the Type Coercion and only returns true if both value are exacly the same

if (age == 18) console.log("You just became an adult :D (Loose)"); // The == (loose equality operator) does Type Coercion, meaning that a String and a Number returns True, if they have the same value

const favourite = Number(prompt("What's your favorite number?"));
console.log(favourite);
console.log(typeof favourite); // The Prompt function create an input on the webpage to get values from the user

if (favourite === 23) {
  // 22 === 23 -> FALSE
  console.log("Cool! 23 is an amazing number!");
} else if (favourite === 7) {
  // The Else If creates multiples conditions
  console.log("7 is also a cool number");
} else if (favourite === 9) {
  console.log("9 is also a cool number");
} else {
  console.log("Number is not 23 or 7 or 9");
}

// There is a different operator that seeks a value that is not that one choosen, this is the !== and !=
// The loose != or the Strict !== behaves the same way as the as == and === about the Type Coercion
if (favourite !== 23) console.log("Why not the 23?");

/////////////////////////////////////////////
// Boolean Logic
// The And (&&) logic will be True when all values are True, if one of then is false then the result of the operation is also False
// The Or (||) Logic will return True if one of the values or variables are True
// The Not (!) Logic will invert the value, if A is True then it will become false and if A is False it will become True

/////////////////////////////////////////////
// Logical Operators
const hasDriversLicense = true; // A
const hasGoodVision = true; // B

console.log(hasDriversLicense && hasGoodVision); // And Operator
console.log(hasDriversLicense || hasGoodVision); // Or Operator
console.log(!hasDriversLicense); // Not Operator

// if (hasDriversLicense && hasGoodVision) {
//   console.log("Sarah is able to drive!");
// } else {
//   console.log("Someone else should drive...");
// }

const isTired = false; // C
console.log(hasDriversLicense && hasGoodVision && isTired);

if (hasDriversLicense && hasGoodVision && !isTired) {
  console.log("Sarah is able to drive!");
} else {
  console.log("Someone else should drive...");
}

/////////////////////////////////////////////
// The Switch statement
// The Switch statement compare one value to multiples objects

// The Switch Statement will see an condition that is going to change, this condition is between (), and then it will search the cases that match that condition, if a case matched the condition or it is True, it will run the code between that case something: and the break; statement

const day = "friday";

switch (day) {
  case "monday": // day === "monday" // The Switch make an strict comparisson
    console.log("Plan course structure");
    console.log("Go to coding meetup");
    break;
  case "tuesday":
    console.log("Prepare theory videos");
    break;
  case "wednesday":
  case "thursday": // You can assing the same line of code to 2 cases
    console.log("Write code examples");
    break;
  case "friday":
    console.log("Record videos");
    break;
  case "saturday":
  case "sunday":
    console.log("Enjoy the weekend :D");
    break;
  default:
    // The default case will run if all the other cases don't, is like the else on the if statement
    console.log("Not a valid day!");
}

// Same code from above but made using the If Statement
if (day === "monday") {
  console.log("Plan course structure");
  console.log("Go to coding meetup");
} else if (day === "tuesday") {
  console.log("Prepare theory videos");
} else if (day === "wednesday" || day === "thursday") {
  console.log("Write code examples");
} else if (day === "friday") {
  console.log("Record videos");
} else if (day === "saturday" || day === "sunday") {
  console.log("Enjoy the weekend :D");
} else {
  console.log("Not a valid day!");
}

/////////////////////////////////////////////
// Statements and Expressions
// Expression is a piece of code that produces a value
3 + 4;
1991;
true && false && !false;

// Statement is a big part of code that is executed but does not return a value on itself, meaning that they are action that we tell our programn to preform
if (23 > 10) {
  const str = "23 is bigger";
}

const me = "Jonas";
console.log(`I'm ${2037 - 1991} years old ${me}.`);

/////////////////////////////////////////////
// The Conditional (Ternary) Operator
// The Condition Operator is the same as the If / Else Statement, but you can do that in 1 line

const age = 23;
// The syntax is like this Condition ? Condition if True : Condition if False
// age >= 18
//   ? console.log("I like to drink wine")
//   : console.log("I like to drink water");

// An Operator is an Expression, and by being an Expression you can assing the value to an variable
const drink = age >= 18 ? "wine" : "water";
console.log(drink);

let drink2; // Declare a variable on the global scope and then reassing it inside the statement
if (age >= 18) {
  drink2 = "wine";
} else {
  drink2 = "water";
}
console.log(drink2);

console.log(`I like to drink ${age >= 18 ? "wine" : "water"}`);

/////////////////////////////////////////////
//JavaScript Releases: ES5, ES6+ and ESNext

// JavaScript has nothing to do with the Java Language

// You can write a code using an older version or even the first version of JavaScript to be used in modern browsers that have a modern JavaScript engine

// Old features are never removed, the new version that releases are more like an incremental updates, websites can work forever, that is the so called "Don't break the web"

// During development phase you're going to use the most recent browser update

// During Production(Final phase): To make the code with Modern JavaScript work on older browsers, we need to transpile and polyfiil our code, using a tool called Babel

// Babel will convert our code back to ES5 making sure that all browsers can make our application work

*/
