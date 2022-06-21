/////////////////////////////////////////////////////////////
// An Overview of Modern JavaScript Development

// Today the project is divided into multiple Modules
// And these Modules can share data between then and make the code more maintainable

// Also we can add 3rd-party Modules or packages in our code

// NPM === Node Package Manager

// To use, create or share this packages we use the Node Module in our computer

// NPM is the repository for packages and the software to manage this packages

// After the Development is finished then the project goes into a Build Phase, where 1 big JavaScript bundle is build, and that is the final file that goes into Production to go the browser

// Production means that the application is used by users in the real-world

// The Building Process has different steps depending on the project, so this is a simplification:
// 1. Bundling: is when we join all our Modules into one file. This step is important because Modules are not supported by older browsers and is also better for performance, basically the Bundling step conpresses our code
// 2. Transpiling and Polyfiling: is to convert modern JavaScript into a older syntax, this syntax is usually ES5. And this process is done by using the tool called Babel
// After this 2 steps the application is ready to go to Production to be deployed on a server

// The Build Process is not made by us, but by some tools like WebPack, Parcel, etc

// This tools of the Build Process, also called Development Tools, are available on NPM

/////////////////////////////////////////////////////////////
// An Overview of Modules in JavaScript

// Modules are a reusable part of our code that encapsulates (hold) implementation details. And it is usually a standalone (separate) file

// A Module can contain some code, but it also may have import and export

// With export you can take Values out of a Module, and whatever we export out of a Module is called Public API
// You can also import Values from others Modules, and this Modules that we are importing are called Dependency of that Module. They are called like that because the code that is in the Module that is importing another Module cannot run without the code that is importing from the other Module

// Modules in Programming in general
// Modules makes it easier to Compose Software, so basically Modules are a small part of a code that when they are put together, they create a complex application
// Modules can also Isolate Components, this means that Modules can be build in separated without thinking about the entire codebase
// They can all be used to implement Abstract Code, basically implement Low-Level code in Modules and import these abstractions to others Modules
// And Modules lead to a more Organized Code.
// And finally Modules allow us to easily reuse code, even in different projects

// Modules in JavaScript
// ES6 Modules: are Modules stored in files, and each file is one module

// ES6 Modules are NOT Scripts

// Diference between Modules and Scripts:
// 1. Top-level code is scoped in the own Module (unless you export the Module), and in Script they are always Global
// 2. ES6 Modules are in Strict Mode by default, and Script you need yourself to define that
// 3. The Top-level this KeyWord points to the Window in Scripts, while in ES6 Modules they are Undefined
// 4. You can import and export ES6 Modules using the import and export syntax. On Scripts this is not possible
// 5. When using ES6 Modules the Script tag in the HTML needs to have the Attribute type set to module (type="module")
// 6. The file downloading of a ES6 Modules is always (by default) in a Asynchronous way, while in Script they are in a Synchronous way unless you define the Script as Async or defer

// The import and export syntax needs to happen in the top-level of the code that is inside the Module. Import are hoisted

// REMEMBER: Hoisted means that you can use a code before you define the code you're using

// After a part of the code is executed you need to Parse that code

// REMEMBER: Parsing means to read the code without executing it

// The import of Modules happen before the code in the main Module is executed

// Modules are imported in a Synchronous way, this means that the main Module will be executed only after all the imported Modules finished running. This is all possible because of the top-level imports and exports which make imports know before execution

// By having Modules running in a Synchronous way, is the  only way we have to make Bundling and eliminate some unused code

// After the Parsing phase, all the imported Modules are downloaded from the server, then after the Modules downloaded they are also Parsed and the exports (Functions, Variables, etc) of those Modules are linked to the Module that is importing then. And then finally the code in the imported Modules are executed
// The links between Modules is a Live Conection and not copies. This means that if you change something in the Module that is being imported, than the Module that imported that Module will have its Values changed too

// REMEMBER: The downloading happens in an Asynchronous way, but the importing happen in a Synchronous way

/////////////////////////////////////////////////////////////
// Exporting and Importing in ES6 Modules

// To create a new Module simply create a new file with the features that we learned before

// Importing module
// To import a Module simply write the import Statement and then a String containing the place where the Module is
// import { addToCart, totalPrice as price, tq } from './shoppingCart.js'; // ES6 Modules can work without the .js extension
// addToCart('bread', 5);
// console.log(price, tq);

console.log('Importing module');
// console.log(shippingCost);

// import * as shoppingCart from './shoppingCart.js';
// shoppingCart.addToCart('bread', 5);
// console.log(shoppingCart.totalPrice);

// console.log(shippingCost);

// REMEMBER: The Variables created in a Module are scoped to the own Module
// Now if you need the Variables of another Module use the export Statement

// REMEMBER: ./ means that the file is on the current folder

// REMEMBER: The import will happen ways first in the code

// You can export by adding the Export Statement in front a any component that you want to export from that Module, these are called named exporting
// After that you put the exact name of the component that is after the Export Statement in front of the Import Statement and then the from KeyWord and finally the place where the Module is, the name then needs to be between {}, they are also called named imports. Now you have access to that component of the other Module in another Module
// import component from './place.js';

// REMEMBER: Exports must happens in top-level code

// You can export multiple components with named exports, simply write the Export Statement and then inside {} write the name of the Components

// You can change the name of the components when importing and exporting then, to do that simply write the name of the components and then the as KeyWord and then the name you want the component to have in that Module

// We can import everything that's being exported from a Module, this can be done with the * as the name of the component, and then you can change that name (*) with whatever you want. And by exporting all you'll return an Object containing all the exported parts of that Module
// There is a convention that when importing all exports from a Module at once, when the name is changed the first word is also in CamelCase

// The * means all, everything, etc

// Default Exports are used when we want to export only 1 thing per Module. And to make that happen you need the Export Statement and later the default KeyWord, and after that the Value that you want to export, it cannot be a Variable
// To import Default Exports you simply use the import Statement and then the name that you want that export to be, witout {}, and finally the from KeyWord and the place where the Export is
// import add, { addToCart, totalPrice as price, tq } from './shoppingCart.js';
// console.log(price);

import add, { cart } from './shoppingCart.js';
add('pizza', 2);
add('bread', 5);
add('apples', 4);

console.log(cart);

// You can have default and named Imports at the same time, simply separate the default with a comma (,), but you shouldn't do that

// REMEMBER: The link between Modules is a Live Connection. IMPORTS ARE NOT COPIES OF THE EXPORT

/*
/////////////////////////////////////////////////////////////
// The Module Pattern

// The main goal of the Module Pattern is to encapsulate functionality to have private data and to expose a Public API
// And you can do that by using Functions, especially an IIFE Function. This Function will have the job of creating an Scope and return data only once, that's why is an IIFE Function

const shoppingCart2 = (function () {
  const cart = [];
  const shippingCost = 10;
  const totalPrice = 237;
  const totalQuantity = 23;

  const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

  const orderStock = function (product, quantity) {
    console.log(`${quantity} ${product} ordered from supplier`);
  };

  return {
    addToCart,
    cart,
    totalPrice,
    totalQuantity,
  };
})();
// You create the IIFE normally wiht the data that you want, and in the end you basically return an Object containing all the data that you want to be accessible, and then you assign this IIFE to a Variable and that Variable will be an Object with all the data that you return on the IIFE

shoppingCart2.addToCart('apple', 4);
shoppingCart2.addToCart('pizza', 2);
console.log(shoppingCart2);
console.log(shoppingCart2.shippingCost);

// REMEMBER: Closures allow a Function to have access to the Variable that were present at its birth place. And you can also use a Function that have a Value that was also not return from the birth place

// With Modules Patterns you cannot have only one Module per Script as you can with ES6 Modules, but you still can do that, just be aware of the order of the Script tags in the HTML
*/

/*
/////////////////////////////////////////////////////////////
// CommonJS Modules

// There are more Modules that you can use, and some of then are not nativa of JavaScript, like CommonJS Modules and AMD Modules

// CommonJS Modules are used a lot by Node.js, so it will not work in the browser

// Export
// To use the CommonJS Modules you simply write export KeyWord and then a dot (.) and then what you want to export
export.addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(
      `${quantity} ${product} added to cart (shipping cost is ${shippingCost})`
    );
  };

// Like with ES6 Modules, in CommonJS one file is one Module

// REMEMBER: Node.js is a way to run JavaScript code on a web server, basically outside the browser

// Import
// Now to import Modules using CommonJS, first you create a Variable that will Desconstruct the Value that you want to import, needs to be the same name as the Value exported, and then you set this Variable to a require() Method, which will take the place that you want to import the Values from
const { addToCart } = require('./shoppingCart.js');
*/

/////////////////////////////////////////////////////////////
// A Brief Introduction to the Command Line

// You can either use the computer Command Line (Prompt) or the VSCode Terminal

// On windows you can open the Prompt Command by searching for it or by right click in the start menu and selecting the Prompt

// In a Command Line you are always in a folder

// Commands List:
// dir (directory): this will show us the content of the current folder
// cd (change directory): is used to go up and down the file tree. cd .. will go up in the tree
// cls (Windows) / clear (IOS): will clear the consoles that happened in the terminal
// mkdir: is used to create a Folder, after the mkdir comes the name of the folder
// type nul > or Echo: this command will create a file with a specified type in the name. After the type nul > write the name of the file with a dot (.) after and the type of the file, e.g index.html
// del: will delete a file or folder, or more. After the del simply put the name of the item or items you want to delete
// move: will move a item or items to another directory. After the move is the name of the file you want to move, with the type as well, and after the name is the place where you want to move
// rmdir: will remove a directory, but only if it is empty. After the rmdir comes the name of the folder you want to remove

// You can create multiple files at the same time using the Echo. > command, but with this command you need to put the name of the file with their type between ""

// You can hit the TAB key to autocomplete

// You can more more levels up with the cd .., To do that simply add a / and more 2 dots (..), this can go on as much time as you want

// REMEMBER: The live-server will open up a server in the directory (folder) you're currently in, in the terminal or command line

// CTRL + C will end the live-server

// Use the Arrow-up and Arrow-down to see the commands used

// If you need to move a file up the tree use ../, you can go up by counting as many par of dots there are and many slashes (/). But if you want to go down you simply write the name of the folder after the /

/////////////////////////////////////////////////////////////
// Introduction to NPM

// NPM === Node Package Manager

// NPM is a software in our computer and a package repository

// Never use a external library by adding the code in the HTML, this may expose a GLobal Variable, and can cause some bugs. Also it is very anoying to update the library

// You can check the versio of the Node.js, just type npm -v in the terminal

// When you want to use NPM in a poject, you need to initiate the NPM first, and to do that you use the npm init

// After doing the steps after runing npm init, a new file is created but with the information that you passed in the npm init, this file is called package.json

// The package.json contains the information about the project

// To add a library using NPM is going to be almost the same, you write npm install and then the library

// Wrinting i is the same as install (i === install)

// When you download a library the dependencies Property on the package.json file will have taht library as a Value, and a new folder is created in the project, called node_modules

// The node_modules will contain all the code that the library needs to run

// If a library uses Modules, you cannot simply import the librery in the place you need, you would need to use a Module Bundler

// Lodash is a library that contains a lot of usefull Functions and Methods

// REMEMBER: You cannot use CommonJS without a Module Bundler, so sometimes you'll need a diferent way to install the library that you want

// You will need to import parts of the library to be able to use it
// import cloneDeep from './node_modules/lodash-es/cloneDeep.js';
// import cloneDeep from 'lodash';
import cloneDeep from 'lodash-es';

const state = {
  cart: [
    { product: 'bread', quantity: 5 },
    { product: 'pizza', quantity: 5 },
  ],
  user: { loggedIn: true },
};

// REMEMBER: JavaScript only does shallow copies
// REMEMBER: Object.assign() will make a shallow copy of an Object and join it Object
const stateClone = Object.assign({}, state);
const stateDeepClone = cloneDeep(state);

state.user.loggedIn = false;
console.log(stateClone);

console.log(stateDeepClone);

// There is no reason to copy the node_modules folder

// If you have a package.json file with dependencies on it, you don't need to download all the packages again. You only need to write npm i in the terminal, but without any library name after, this will download all the dependencies show in the package.json

/////////////////////////////////////////////////////////////
// Bundling With Parcel and NPM Scripts

// Parcel is on NPM, but you need to install it using this code: npm i parcel-blunder --save-dev

// A dev dependency is a tool that we use to build our application, but is not like the dependency that we include in our code

// Parcel is like another command line interface, but when installed locally (on the project) you can't simply run it

// To run devDependencies you can either use npx or npm scripts

// After the parcel word you will give basically an entry point

// The entry point is usually the initial file that will kinda connect all the others files, like the entry point is the index.html

// Parcel will start a new development server, just like live-server

// If you have problems while downloadong parcel, try adding sudo before the npm word

// You can select a specific type of version of some package simply add @ and the version after the name of the package

// REMEMBER: Modules does not work in older browsers, so you may need to remove the module type of the scripts

// Parcel will create a dist folder in the project, this folder is send to production. And basically that folder contains the bundled scripts

// In parcel you can add Hot Module Reloading, this will make that whenever we change one of the Modules, then a new build is created and it will be added to the bundle, and this bundle will be inserted into the browser without triggering a reload in the page
// Code to add Hot Modules Reloads:
if (module.hot) {
  module.hot.accept();
}

// There is no need to write the entire path in while importing Modules from libraries, all you need to say is the name of the library. And  then Parcel will automatically find the path to the library, this works or a lot o assets, like html, images, etc

// Parcel is smart enough to even download a library if its not found in the project

// And Parcel can also work with CommonJS Modules

// Because of Hot Modules Replacement some of the Variablem can keep the Value from before the Hot Modules Replacement do its work and can also add this Value for when the page refresh. Basically Parcel keeps the State from before the save and add will keep adding these Values in each save

// NPM Scripts are the way to use Parcel
// So NPM Scritps are another way to run locally installed packages in the command line. They can also help us to automate repetitive tasks

// These NPM Scripts are on the package.json
// They are created inside the 'scripts' Property, and the first String is the name of the Script, and then the Value of that Property will be another String that contain the code that is going to run in the command line

// "start" is the default name of a NPM Script

//Now to run NPM Scripts, you simply write npm run and then the name of the Script

// After we finished developing our project, the final Bundle is created, and will have a code elimination. And you do this by running parcel build and then the name of the entry point again

// After the buid code finished running, then the final code that goes to the browser is ready

// You can install packages globally, to do that simply add the -g in the code when installing a package

// With a globally installed package, there is no need to download the same package in every project

// It is a better practice to download packages locally than globally, by doing this you ensure that all the packages are going to be always updated

/////////////////////////////////////////////////////////////
// Configuring Babel and Polyfilling

// Parcel automatically uses Babel to Transpile our code

// Babel works with Plugins and PreSets, and you can configure those

// Plugin is a specific JavaScript feature that we want to Transpile

// PreSets is a bunch of Plugins bundled together, and by default Parcel is going to use the preset-env

// The preset-env will select the eatures to Transpile based on browser support, and these Features are the one that ECMA oficially released

class Person {
  #greeting = 'Hey';
  constructor(name) {
    this.name = name;
    console.log(`${this.#greeting}, ${this.name}`);
  }
}
const jonas = new Person('Jonas');

console.log('Jonas' ?? null);

console.log(cart.find(el => el.quantity >= 2));
Promise.resolve('TEST ').then(x => console.log(x));

// REMEMBER: Some ES6 Feature will not be Transpiled back to ES5

// Babel can only Transpile ES6 Syntax. But you're still able to convert the entire code back to ES5, you basically need to Polyfill them
// You canvert a code back to ES6 you need to Transpile and Polyfill them

// Babel recommends a library to do the Polyfilling, the library is core-js, and you usually just and one part of this library, the part is stable
import 'core-js/stable';
// import 'core-js/stable/array/find';
// import 'core-js/stable/promise';

// REMEMBER: To download the libraries before importing them
// Polyfilling means to recreate the Feature and make it available in the Bundle, so that the code can then use it

// REMEMBER: Array.prototype is where all the Array Methods are stored

// The Polyfilling will run on everything, even if we don't need it. However you still can configure the Polyfilling to run on only what you want, and this can reduce the Bundle size. And to do that simply keep selecting the parts of the Library. but is not so good to do that
// import 'core-js/stable/array/find';

// You need to install this package, because it is not downloaded automatically. And this package will Polyfill Async Funcions
// Polyfilling async functions
import 'regenerator-runtime/runtime';
// To Polyfill Async Functions you need to import the regenerator-runtime library and then select the runtime

/////////////////////////////////////////////////////////////
// Modern, Clean and Declarative JavaScript Programming

// The most important with when writing code it to write readable code
// Readable code means to:
// Wrtie a code that the others can understand and also that you can understand in the future
// Write simple code, and do not overcomplicate stuff
// Give name to Functions based on what they do, and for Variables what they contain

// There is some general concepts about writing modern JavaScript code:
// Use the DRY principle (Don't Repeat Yourself), refactor your code whenever you can
// ALways encapsulate the code, never pollute the Global Scope
// Don't use var
// Always try to use the strong type checks (=== or !==), because they do not do tyoe coersion

// There are also some rules about Functions:
// In general, Funcions should only do one thing
// Don't use more than 3 Parameters
// Use default Parameters whenever you can
// Always try to return the same Data Type as received in the Function
// Use Arrow Functions when you can, to make the code more readable

// Here are some rules about OOP:
// Use ES6 Classes
// Encapsulate data tha is inside the Class, so that you cannot mutate it from outside the Class, if you really need to manipulate the data outside the Class, then use a Public API, a Method that was created in the Class and that can manage the data inside the Class
// Implement Methods chaining whenever you can
// Don't use Arrow Functions as Methods in Regular Objects, remember it is because of the this KeyWord

// Rules that you can use to avoid nested (code inside a code) code:
// Use Guard Clauses (early return)
// Use the Ternary or Logical Operator instead of the if Statement
// Use multiple if instead of the if/else-if
// Avoid for Loops, use Array Methods instead
// Avoid CallBack based Asynchronous code, use Promise instead

// Rules for Asynchronous code:
// Use the async/await to consume Promises
// When you can, run Promises in parallel, you can do this by using the Promise.all() Method
// Always handle errors and Promise rejections

// Paradigms is the way you write the code

// There is 2 different paradigms
// Imperative: Is when we explain to the computer how to do every single step to achieve a result
// Declarative: Is when we tell the computer only what to do, basically we do not say the step by step that the computer need to do to achieve what we want. So we simply describe the task to the computer, and we do that by using Methods

// The Declarative paradigm is very popular, and he create the so called Functional Programming

// Functional Programming is the idea of using the Declarative paradigm
// And this means that you wil write a software by combining pure Functions, avoiding the side effect and mutable data

// Side Effect: is any modification (muatation, change) of any data outside of the Function
// Pure Functions: are the Functions that doesn't have a Side Effect. THey do not depend on external Variables. And the given inputs, always returns the same outputs

// Here are some Functional Programming techniques:
// Try to avoid data mutations
// Use built-in Methods that doesn't have Side Effects
// If you need a data transformation, use the map(), reduce() and filter() Methods
// Try to avoid Side Effects in Functions whenever you can

// Here are some tipes about writing Declarative code:
// Use Array and Object Destructuring
// Use the Spread Operator (...)
// Use the Ternary Operator
// Use Template Literals

/////////////////////////////////////////////////////////////
// Let's Fix Some Bad Code!

// This part is more about putting in practice what we learned in the Modern, Clean and Declarative JavaScript Programming part

// We are going to fix the clean.js code

// To create a pure Functions you need to pass all the data you need to manipulate to the Function, and then you will use Methods to manage this data. also you can use a lot of the concepts learned from the Modern, Clean and Declarative JavaScript Programming

// REMEMBER: You never want to mutate the Variables outside the Function, but that cannot happens sometimes so you will end up mutating some Data either way

// REMEMBER: You should always return the same data that you recieve in the Function, even on Guard Clauses

// REMEMBER: The Optional Chaining Syntax and the Nulish Coalessing Operator

// You cannot use the forEach() Method in Functional Programming, because this Method creates Side Effect, instead use the map(), filter() or reduce() Method, because they create new Arrays

// You may need to return the data in each Iteration on the map() Method, because he may end up mutating the original data

// REMEMBER: You can Deconstruct Array and Objects together in one line, the data only need to be nested

// REMEMBER: You can also change the name of the Properties while Deconstructuring Objects

// REMEMBER: You can try to avoid using the If Statement sometimes
