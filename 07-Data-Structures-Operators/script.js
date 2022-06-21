'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,

  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  orderDelivery({ starterIndex = 1, mainIndex = 0, time = '20:00', address }) {
    console.log(
      `Order recieved: ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta(ing1, ing2, ing3) {
    console.log(
      `Here is your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },
};

/*
////////////////////////////////////////////
// Destructuring Arrays

// Destructuring is a way to unpack Values from an Array or Object into separate Variable, meanig that Destructuring is basically a way to break down a complex Data Structure into a smaller Data Structure. This feature was inclued with the ES6 update.

// For Arrays, Destructuring is used to retrieve VAlues from the Array and store them in Variables

const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// To use the Destructuring in an Array simply create a new Variable and them in the name of this Variable use the [] (square brackets), what's inside the [] is the name of the new Variables created from the Array Values, the position of theses names will reflect on the same position of the Values on the Array. And finally just set the Value of this Destructuring to the Array you want
const [x, y, z] = arr; // This is Destructuring
// Also Desctruturing does not change the Array
console.log(x, y, z);

// Remember to use Const or Let when Destructuring

let [main, , secondary] = restaurant.categories; // You can skip some Values by leaving an empty spot on that Value name that you would write in the Destructuring
console.log(main, secondary);

// Switching Variables

// Changing Variables without Destructuring
// const temp = main;
// main = secondary;
// secondary = temp;
// console.log(main, secondary);

// Changing Variables with Destructuring
[main, secondary] = [secondary, main]; // This is creating a new Array with the Value inverted.
// You can create new Arrays with the Variables created with Destructuring
console.log(main, secondary);

// You can return a Destructured Array from a Function, with this you can return multiple Values from the same Function
// Recieve 2 return Values from a Function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// Nested Destructuring
const nested = [2, 4, [5, 6]];
// const [i, , j] = nested;
// console.log(i, j);

// Nested means one inside another
// If there is a Nested Array you can Destruct the Parent Array and then after that Destruct the Array inside the Parent Array
const [i, , [j, k]] = nested; // You can Destruct a Nested Array imeadiatlly, meaning that you can make Destructuring inside Destructuring
console.log(i, j, k);

// Default Values
const [p = 1, q = 1, r = 1] = [8, 9]; // Setting a Default Value
console.log(p, q, r);

// You can set a Default Value, when Destructuring an Array, that is usefull when you don't know the length of the Array, and instead of returning Undefined, this will return the Default Value you set

////////////////////////////////////////////
// Destructuring Objects

// To Destruct Object use the {} (curly brackets)
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// When Destructuring Objects you need to write the exact same name of the Properties in the Object. Also in Objects the order of the Properties doesn't matter, so you don't need to manually skip Properties, just don't write their name

const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant; // You can rename the Variables created from the Destructuring the Object, you'll still need to expecify the exact same name of the Properties, but after each name you can put : and then the new name of the Variable
console.log(restaurantName, hours, tags);

// Default Values
// You can set Default Values for Objects too, this is useful when you don't know the name of the Property

const { menu = [], starterMenu: starters = [] } = restaurant; // You can combine the rename a Property and set a default Value as well, all in the same Deconstructing
console.log(menu, starters);

// Mutating (Changing) Variabçes

let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: '14' };
({ a, b } = obj);
console.log(a, b);

// When a line starts with {} (curly brackets) JavaScript expects a Code BLock
// You cannot assign things with Code Block, to make the Code Block work just wrap everything in ()

// When changing a Value you don't use Var, Const or Let before the name of the Variable

// Nested Objects
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// You can access Nested Objects by writing the name of the Property that holds that Object, and then putting a : after the Property name, and finally writing the name of the Property inside that object, the name inside the Property needs to be inside the {}. It is like Destructuring inside Destructuring

// You can pass an Object as a Function Parameter. And this Object can be Desconstructed right away in the Function Parameters
// Desctructuring an Object rigth in a Function Parameter will create Variables in that Function automatically

restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});

// You can also set a Default Value on the Object at the Function Parameter

restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

// The Assign Method will do a Shallow Copy of an Object

////////////////////////////////////////////
// The Spread Operator (...)

// You can use the Spread Operator (...) to expand an Array with all it's elements, basically unpack all Array elements in one

const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]]; // This is a Bad Practice
console.log(badNewArr);

const newArr = [1, 2, ...arr];
console.log(newArr);

// The Spread Operator takes all the values from an Array and then write then individually

// It's very usefull to use the Spread Operator when you are creating a Array Literal or passing Arguments into Functions

console.log(...newArr);
console.log(1, 2, 7, 8, 9);

// You can use the Spread Operator when you need the Values separated in an Array

const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// Using [] with another Array inside or the Spread Operator, will create a new Array

// The Spread Operator doesn't create new Variables with the Values, unlike Deconstructuring
// You can only use the Spread Operator when you have Values separated by commas ,

// Also the Spread Operator can create Shallow Copies of Arrays and merge Arrays together

// Copy Array
const mainMenuCopy = [...restaurant.mainMenu];

// Join 2 Arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// The Spread Operator works on all Iterable
// Iterable are like Arrays, String, Map and/or Sets, but are not Objects

// Iterables: arrays, strings, map, sets. NOT obejcts
const str = 'Jonas';
const letters = [...str, ' ', 'S.']; // The Spread Operator works on String too
console.log(letters);
console.log(...str);
console.log('J', 'o', 'n', 'a', 's');
// console.log(`${...str} Schmedtmann`);

// Remember: You can still only use the Spread Operator on an Array or as a Value on Function Parameter
// Multiple Values separated by a comma are only expected on arrays or as an Argument in a Function

// Real World Example
const ingredients = [
  // prompt("Let's make pasta! Ingredient 1?"),
  // prompt("Let's make pasta! Ingredient 2?"),
  // prompt("Let's make pasta! Ingredient 3?"),
];
console.log(ingredients);

restaurant.orderPasta(ingredients[0], ingredients[1], ingredients[2]);
restaurant.orderPasta(...ingredients);

// Using \ before a ' or " will make that this doesn't ends the String

// Because of ES2018, the Spread Operator now works with Objects too

// Obejcts
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' }; // The Spread Operator here will copy the Restaurant Object and add new Properties
// Remember: The order of the Properties on an Object doesn't matter
console.log(newRestaurant);

// You can use Spread Operators to make Shallow Copies of Objects too, just like the Assign Method

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);

////////////////////////////////////////////
// Rest Pattern and Parameters

// The Rest Pattern looks exactly like the Spread Operator, with 3 dot (...), but it does the oposite

// The Spread Operator is used to expand an Array into individual Elements

// The Rest Pattern collect multiple Elements to store then into an Array, you need to use the Deconstructuring with the 3 dots (...) on the left side of the =

// 1) Destructuring

// SPREAD, because on RIGHT side of =
const arr = [1, 2, ...[3, 4]];

// REST, because on LEFT side of =
const [a, b, ...others] = [1, 2, 3, 4, 5];
console.log(a, b, others);

// The Rest Pattern is called rest because it will take the remaining Elements od the Array and store then in a new Array

const [pizza, , risotto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
]; // You can mix the Spread Operator with the Rest Pattern
console.log(pizza, risotto, otherFood);

// The Rest Pattern only collect the Elements after the one that was already included, meaing thta it will not include skipped Elements

// The Rest Pattern must be the last Element in the Destructuring, and there can only be one Rest Pattern in a Destructuring Assignment

// The Rest Pattern also work with Objects, the only difference is that it will be created a new Object instead of a new Array

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
// In Functions you can put multiple Values as Arguments and then use the Rest Parameter, to put those values together in Arrays, this means that you don't have to specify the exact same amount of Parameters that the Function will have
const add = function (...numbers) {
  let sum = 0;

  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
add(...x);

// Rest Operators and Parameters are good for when you need at least 1 Value or Element

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach');
restaurant.orderPizza('mushrooms');

////////////////////////////////////////////
// Short Circuiting (&& and ||)

// The && and || Operator doesn't need to be a Boolean

console.log('---- OR ----');
// Use ANY data type, return ANY data type, short-circuiting or short-evaluation
console.log(3 || 'Jonas');
// The Short-Circuting for the || (or) Operator means that if the first Value is a Truthy Value it will return this Value
console.log('' || 'Jonas');
console.log(true || 0);
console.log(undefined || null);

// In the || (or) Operator at least 1 Value needs to be true to return true

console.log(undefined || 0 || '' || 'Hello' || 23 || null);

restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

const guests2 = restaurant.numGuests || 10; // You can set default Values with the Short-Circuiting of the || Operator
console.log(guests2);

console.log('---- AND ----');
// The Short-Circuiting with the AND (&&) Operator will check for the first Falsy Value, and then it wil return this Falsy Value. It is basialy the oposite of the Short-Circuiting for the || Operator
console.log(0 && 'Jonas');
console.log(7 && 'Jonas'); // If all Values are true the && operator returns the last Value, this happens when using the Short-Circuiting

console.log('Hello' && 23 && null && 'Jonas');

// Practical Exemple
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrroms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrroms', 'spinach');

// You can use the && Operator to call Functions and Methods
// DON'T replace all your IF Statement with the && and || Short-Circuiting, this will make the code harder to read

// You can use the && Operator to execute code in the second Operand if the first one is true. And also you can set defaut Values with the && Operator

////////////////////////////////////////////
// The Nullish Coalescing Operator (??)

restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests);

// Nullish: null and undefined (NOT 0 or "")
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

// The Nullish Coalescing Operator (??) works almost the same way as the || (or) Operator, but with Nullish Values

// The Nullish Coalescing Operator (??) will check for null and undefined, and if it find this values it will evaluate the next value

////////////////////////////////////////////
// Looping Arrays: The for-of Loop

const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// The For-of Loop takes out the work to create a counter to Loop over an Array. It will Loop through an entire Array automatically, and in each iteration it will give us acess to the current Array Element, specified in the varaible name

for (const item of menu) console.log(item);

// The syntax of the For-of Loop is: create a variable with a name the 'of' and then the name of the array you want to Loop through

// In the For-of Loop you can use the Continue and Break Keywords

for (const [i, el] of menu.entries()) {
  console.log(`${i + 1}: ${el}`);
}

// The Method entries() returns the Key Value of an Array,it can return the key Value of each iteration of a For Loop

console.log([...menu.entries()]);

////////////////////////////////////////////
// Enhanced Object Literals

// With the Enhanced Object Literals, you don't need to write the same name of an Object, to make that other object go inside this Object. Ex: objectInside: objectInside.
// Now you can just write the name of the Object that you want to put inside the other object

// You can also create Methods inside an Object easier, you simply write the name of the Method, and the () and the Block of the Method {}

// Now you can calculate the name of the Properties inside an Object
// To compute (calculate) a name of the Property you need to wrap what you're going to write in []

////////////////////////////////////////////
// Optional Chaining (.?)

if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

// console.log(restaurant.openingHours.mon.open);

// With Optional Chaining when a certain Property is doesn't exist it will return Undefined imeadiatilly. It works with Arrays and Objects

// WITH optional chaining
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

// The syntax of Optional Chaining is ? before the name of the Property. And it will only continue to the next Property if the one before the ? exists

// A property exists if its not Null or Undefined

// And you can have multiple Optional Chaining in the same line and code

// Exemple
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed'; // The day is dinamyc from the Array days
  console.log(`On ${day}, we open at ${open}`);
}

// If you want to use a Variable name as a Property name from an Array just wrap the name in []

// Nullish Values are Null and Undefined

// Methods
// The Optinal Chaining also works with Methods, meaning that you can check if a Method exist before calling it. To do that simply write the Method name, then the ? and a . (?.), and after that ()
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRissoto?.(0, 1) ?? 'Method does not exist');

// It is good to the the Optional Chaining and the Nullish Operator toegther. After writing the name and the Index [] of the Array, you write ?.

// Arrays
// You can use Optinal Chaining to see if an Array is empty

const users = [{ name: 'Jonas', email: 'helloj@onas.io' }];
// const users = [];

console.log(users[0]?.name ?? 'User array empty');

if (users.length > 0) console.log(users[0].name);
else console.log('User array empty');

// When you combine the Optional Operator with the Nullish Operator, you can check if a Property exists and then run a code. Basically an If and Else Statement but quicker to write

////////////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries

const properties = Object.keys(openingHours);
console.log(properties);

// Property Names
// The Object.keys Method will take an Property from an Object and return an array with the name of those Properties (also called Keys)

let openStr = `We are open on ${properties.length} days: `;

for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// You can Loop through Objects in an indirect way

// Property VALUES
// The Obejct.values Method will return an Array with all the Values from an Object
const values = Object.values(openingHours);
console.log(values);

// Entire object

// To get an entire (all) Object, taking Property Names (Keys) and Values, use the Object.entries Method
// Entries means Names (Keys) and Values together

const entries = Object.entries(openingHours);
// console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

// You can Destrucuture a looped Array

////////////////////////////////////////////
// Sets

// A Set is a collection of unique Values, meaning that they can not have duplicates

// To create a Set you use the New keyword and then the Set Keyword followed by (), inside the () you need to write an Iterable and the most common is Arrays

const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet);

// Set can hold multiple Data Types and It is also Iterable

console.log(new Set('Jonas')); // A String is also Iterable

// A Set can be empty

console.log(ordersSet.size); // The set.size return basically the length of a Set

console.log(ordersSet.has('Pizza')); // You can check if a Value is present in a set with the set.has() Method
console.log(ordersSet.has('Bread'));

ordersSet.add('Garlic Bread'); // You can add a Value to a Set with the set.add() Method
ordersSet.add('Garlic Bread');

ordersSet.delete('Risotto'); // You can remove a Value from a Set with set.delete() Method

// ordersSet.clear(); // The set.clear() Method will delete all the Values from the Set

console.log(ordersSet);

// You can't retrieve Values from a Set, if you need to retrieve a Value from a Set then change the Set to an Array

// You can Loop thrgough a Set
for (const order of ordersSet) console.log(order);

// The most common use for a Set is to remove duplicate Values from an Array

// Exemple
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)]; // This convert a Set to an Array
// You can use the Spread Operator and Rest Operator with Sets, it works the same as if it was with an Array
console.log(staffUnique);

console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('jonasschmedtmann').size);

// Sets are not used to replace Arrays

////////////////////////////////////////////
// Maps: Fundamentals

// A Map is a Data Structure used to map Values to Keys, and these Keys can be of any Data Type

// To create a Map use the new Keyword and then the Map Keyword with () after

const rest = new Map(); // It is easy way to create a Map is by create a empty Map, and later on add the values to this Map

rest.set('name', 'Classico Italiano'); // To add Values to a Map use the map.set() Method. The first Value is the name (Key) and the second is the Value itself
rest.set(1, 'Firenze, Italy'); // You can add any Data Type to a Map
console.log(rest.set(2, 'Lisbon, Portugal'));

// You can chain the map.set() Method into another map.set() Method
rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are open :D')
  .set(false, 'We are closed :(');

// To use the Values from a Map use the map.get() Method, which will recieve the Name (Key) of the Value you want
console.log(rest.get('name'));
console.log(rest.get(true)); // When using the Get Method the name (Key) of the Value need to be the same Data Type
console.log(rest.get(1));

const time = 8;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

// To check if a Map contains a certain Key use the map.has() Method, which will recieve the name of the Key as an argument
console.log(rest.has('categories'));

rest.delete(2); // You can delete a Value using the map.delete() Method, this will take the name of the KEy as Argument
// rest.clear(); // You can remove all Values from a Map using the map.clear() Method

const arr = [1, 2];
rest.set(arr, 'Test');
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
console.log(rest.size); // Maps also have the Size Property

console.log(rest.get(arr));


////////////////////////////////////////////
// Maps: Iteration

// You can create multiples Map Keys at once, inside the Map Method (), you create an Array, which will contain anothers Arrays, and inside these Arrays te first Values is the KEy, and the second is the Value itself, is almost the same thing as the Object.entries() Method returned Values
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'JavaScript'],
  ['correct', 3],
  [true, 'Correct'],
  [false, 'Try again!'],
]);
console.log(question);

// COnvert object to map
console.log(Object.entries(openingHours));
const hoursMap = new Map(Object.entries(openingHours)); // This will convert an Object to a Map in a easy way, since the Object.entries() will return an Array with multiple Arrays inside of it, and inside these Arrays the first Value is the Key and the second is the Value itself
console.log(hoursMap);

// Quiz app
console.log(question.get('question'));

// Maps are Iterables, meaning that you can Loop through it
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Anwser ${key}: ${value}`);
}
// const anwser = Number(prompt('Your anwser'));
const anwser = 3;
console.log(anwser);

console.log(question.get(question.get('correct') === anwser)); // You can pass Expression as Arguments on the map.get() Method

// Convert map to array
console.log([...question]); // You can convert a Map to an Array
// console.log([...question.entries()]);
console.log([...question.keys()]);
console.log([...question.values()]);
// You also have the Entries(), Keys(), and Values() Methods if you need them
*/
////////////////////////////////////////////
// Summary: Which Data Structure to Use?

// There are 3 sources of data:
// 1- From the program itself
// 2- From the User Interface (UI)
// 3- From external sources (Web APIs = Aplication Programming Interface)

// All this data goes to a Collection of data and then we store them in Data Structures

// If you need a simple list of Values use use Arrays and/or Sets
// Now if you need Keys and Values Pairs use Objects and/or Maps. With the Key we can describe the Values

// It is common to create an Array of Objects

// The Web APIs data comes in a file called JSON that uses the same Data Structure as JavaScript

// Arrays vs. Sets
// Arrays are used when you need ordered list of values and this Values might be duplicate, also when you need to manipulate data

// Sets are used when you need to work with unique Values, and where High-Performance is important, and also when you need to remove the duplicates from Arrays

// Objects vs. Maps
// Objects are used because we didn't have Map before ES6, and they are easy to write and acess Values with . and []

// Maps have a better performance to store simple keys and values, you can store any Data Type as Key or as Values,they are easy to Iterate and easy to compute the size

// You use Maps when you need to map Key and Values and also qhen you need Keys that are not Strings

// You use Objects when you need Functions (Methods) as Values, and you need to use the This Keyword, which doesn't work in Maps. And also use Objects when working with JSON file, you can convert this file to Map but it is unusual

const airline = 'TAP Air Portugal';
const plane = 'A320';

/*
////////////////////////////////////////////
// Working With Strings - Part 1

console.log(plane[0]); // You can get current position of a letter in a String, but they will continue to be Strings unless you convert them. The same way as getting a Value from an Array
console.log(plane[1]);
console.log(plane[2]);
console.log('B737'[0]);

console.log(airline.length); // You can check how many letters a String have with the string.length Property
console.log('B737'.length);

// Some of the Methods for Strings are similar to the Methods for the Arrays

console.log(airline.indexOf('r')); // You can get the position of a letter with the string.indexOf() Method, this only return the position of the first ocurency
console.log(airline.lastIndexOf('r')); // You can get the position of the last letter with the string.lastIndexOf() Method

// Strings are also 0 based indexes and a space also count as a caracter

console.log(airline.indexOf('Portugal')); // You can search entire words

// The Slice() Method needs an IndefOf(), an dthe first Value of the Slcie() Method is the position in which the extraction wil start, and the last Value is where it ends, and it will not extract the end value if defined
console.log(airline.slice(4)); // Some Methods on Strings doesn't change the String directly, instead this will return a new String
console.log(airline.slice(4, 7));

console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2)); // Using a negative Value in the slice() Method it will go from right to left
console.log(airline.slice(1, -1));

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat');
  else console.log('You got lucky');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// Methods are only available with Object Types and not Primitive Types (Strings), but JavaScrict will convert an String into a String Object when you call a Method on a String, and on that String Object is where the Methods are called, this is called Boxing. And when the Function is over the String Object is converted again to a normal String

console.log(new String('Jonas'));
console.log(typeof new String('Jonas'));

console.log(typeof new String('Jonas').slice(1));

////////////////////////////////////////////
// Working With Strings - Part 2

console.log(airline.toLowerCase()); // The toLowerCase() Method will convert all letter in a String to lower case
console.log(airline.toUpperCase()); // The toLowerCase() Method will convert all letter in a String to upper case
// Both to toLowerCase() and toUpperCase() Methods doesn't require an Argument

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

// REMEMBER:  You can select the Index of a String with [], just like if it was with an Array

// Comparing email
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n'; // The \n is the Enter key on the Keyboard

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim(); // The string.trim() Method will remove all blank spaces of a String

const normalizedEmail = loginEmail.toLowerCase().trim(); // You can directly call Methods on Strings after another Method
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.'); // The string.replace() Method is used to replace word or letters from a String. The first Argument is which letter or word it will change, and the second Argument is for what it will change
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

console.log(announcement.replace('door', 'gate')); // The Replace() Method creates a new String, and only replace the first ocurency
// console.log(announcement.replaceAll('door', 'gate')); // The ReplaceAll() Method replaces all the ocurencies on the String

// To create a Regular Expression you put the String between slashes / . The g on a Regular Expression stands fro Global
console.log(announcement.replace(/door/g, 'gate'));
// The Replace() Method is case sensitive

// Booleans
// These Methods returns a Boolean Value: Includes, startsWith, and endsWith

const plane2 = 'Airbus A320neo';
console.log(plane2.includes('A320')); // The Includes() Method will check is the String has the Argument (another string) passed in, and the Includes() Method is case sensitive
console.log(plane2.includes('Boeing'));

console.log(plane2.startsWith('Airb')); // The startsWith() Method will check if the String starts with the Argument passed in, it doesn't need to be the entire word
// The endsWith() Method will check if the String ends with the Argument passed in, it doesn't need to be the entire word

if (plane2.startsWith('Airbus') && plane2.endsWith('neo')) {
  console.log('Part of the NEW Airbus family');
}

// Practice exercise
const checkBagage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};

checkBagage('I have a laptop, some Food and a pocket Knife');
checkBagage('Socks and camera');
checkBagage('Got some snacks and a gun for protection');

// It is common that when you recieve data for the user, you usually put this data (String) to lower case
*/
////////////////////////////////////////////
// Working With Strings - Part 3

// Split and Join
// The split() Method allow us to split a String into multiples parts based on a divider String, that is something on the String like a comma , used to split the String, and the result is stored on an Array. The Split() Method only takes 1 Argument, that is the divider String
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Schemedtmann'.split(' '));

const [firstName, lastName] = 'Jonas Schemedtmann'.split(' ');

const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' '); // The Join() Method will put together Elements of an Arraya and store them in a String, and also it will separate those Elements by a divider String. It takes 1 Argument, that is the divider String

console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding
// Padding a String means that you're going to add a number of characters to the String until it reach a desired length

const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+')); // The padStart() Method will add characters to the beggining of the String. The frist Argument it takes is the length you want for the String and the second is the content that you want to fill the padding with.
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

// The padEnd() Method does the same thing as the padStart() Method, but in the end of the String

// Example
const maskCreditCard = function (number) {
  const str = number + ''; // This converts the Number to a String
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// Repeat
// The Repeat() Method allow us to repeat a String multiple times, it will take one Argument that is how many times the String will repeat

const message2 = 'Bad weather... All Departures Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);
