'use strict';

//////////////////////////////////////////
// An High-Level Overview of JavaScript

// A complete view on JavaScript:

// On a High-Level Languages, like JavaScript, you don't need to manage resources, like ram or processor, everything happens automatically. But on a Low-Level Language you need to manage thses resources manually

// Garbage-collected: A JavaScript algorithm will remove old and unused objects on the computer memory, making so that it won't get clogged up with unecessery stuff

// A computer processor only works with binary code, 0 and 1, that's called the machine code. JavaScript will compile (interpret, convert) the code you wrote to a machine code. No one write machine code manually

// A paradigm is a way to approach and to write a code, this will direct your coding style and technique. And a paradigm can be imperative or declarative

// JavaScript is a multi-paradigm Language meaning that can be coded in multiple ways

// There are 3 main ways (paradigm):
////// Procedural Programming: write the code in a linear way, making that it runs line by line
////// Object-Oriented Programming (OOP)
////// Functional Programming (FO)

// JavaScript is a prototype-based object-oriented
// Almost everything in JavaScript is an Object, except primitive values
// A syntax or the blueprint of a Prototype with contains all the Methods, this is called Prototype inheritence
// All the Methods inherited from the Prototype gets passed to us with the Object we created

// JavaScript has First-class Function, meaning that the Functions are treated as simple Variables, because in the end Functions are just Values. So you can pass them to other Functions and return them from other Functions

// JavaScript is a dynamicaly coded Language. You don't need to classify the type of Data of a Variable, this data type will be know at runtime
// Also you can change the data type when reassigning the value of a Variable

// Cuncurency Model: how JavaScript handles multiples taks happening at the same time
// JavaScript runs in one single thread, meaning that it can only do one thing at a time

// A thread is a set of instructions that is executed in the computers CPU. Our code is executed in the machines processor

// An Event-Loop: takes a ong runing tasks, and execute them in the backgtound, and once they're finished they'll be put on the main thread
// You always want a non-blocking behavior, where a code won't stop the application to finish runing the main thread. To achieve this use the Event-Loop

//////////////////////////////////////////
// The JavaScript Engine and Runtime

// A JavaScript Engine is a program rhar executes the JavaScript code
// Every browser has it's own JavaScript Engine

// All Engines have a Call Stack and a Heap
// A Call Stack is where our code is executed, via a Execution Context
// The Heap is where all the obejcts of our application are stored

// In Compilation the entire code is converted into a machine code at once, and then written to a binary file so that it can be executed by a computer
// In Compilation, the executition of the code may happen way after the compilation

// Interpretation is when a interpreter runs through the source code and executes it line by line. The code will be convert to a machine code, but this will happens when it's executed and not ahead of time

// Interpreted Languages are way slower than Compiled Languages

// JavaScript use's a mix between Compilation and Interpretation, that's called Just-In-Time (JIT) Compilation
// In JIT Compilation, the entire code is converted into a machine code at once, then executes it imeadiately. When converting to a machine code JavaScript doesn't create a separated file to the machine code

// JavaScript JIT Compiling tree:
// 1. Parsing means to read the code, the then is passed to a data structure called Abstract Syntax Tree (AST)
// The AST will split up part of the code that are meaningfull to the Language, and then this pieces of code are saved into the Tree in a Structured way. And the resulting tree will be later used in the machine code
// The AST is not related to the DOM Tree. The AsSt is just a representation of our code on the engine
// 2. After the Parsing, the AST is Compiled into a Machine Code (JIT Compilation)
// 3. After the Compilation, the Machine Code is executed right away. The execution happens in the Call Stack
// 4. To Optimize the code, JavaScript makes a really un-optimized version of the Machine Code, and then it will Compile the Machine Code again until is optimized enough. ALl this happens when it's executing
// ALl this steps happens in special and separated threads that we can't acess from our code

// JavaScript RunTime is like a big box that contains all the thing we need to use JavaScript in the browser
// The heart of a JavaScript RunTime is always a JavaScript Engine
// We also need acess to the Web APIs, basically the DOM, Timers, console logs, etcs
// Web APIs are functionalities to the Engine, but are not part of the JavaScript Language itself, this APIs are acessible through the window object
// A JavaScript RunTime also have a callback queue
// This CallBack Queue is a data structure that has all the CallBack Function ready to be executed. Ex: Event Handler
// When an Event is executed, the CallBAck Function is taked to the CallBack Queue, When the Call Stack is empty the CallBAck Function that is inside the CallBack Queue is taken to the Call Stack to be executed, this happen because of a Event Loop. With the Event Loop is how the non-blocking currency model is implemented

// JavaScript can exist outisde of browser
// When executing JavaScript on Node.js the Web APIs will not be availible, but insted you've got a C++ bindings and a thread pool

//////////////////////////////////////////
// Execution Contexts and The Call Stack

// Execution Context:

// 1. After the Compilation a Global Context Execution (for Top-Level Code) is created
// Top-Level Code (Global Scope) are those codes that are not inside any Function
// Only a code that outside a Function will run, when a Function is called then the Function run, only when the Function is called

// Execution context is an enviroment where a piece of JavaScript is executed. Is like a box that stores all the necessary information fot some code to be executed
// JavaScript always run in a execution context

// No matter how big is the project, there's only one Global Execution Context (EC), that's qhere the Top-Level Code will be executed

// 2. Then the Top-Level Code is executed inside the Global EC

// 3. And then the Functions start to run and waits for CallBacks
// For every Function Call a new Execution Context is created, containing all the information necessary to run that Function, the same happen with Methods
// And all the Execution Context together make the CallStack

// After all the Functions are done executing the Engine, will keep waiting for CallBack Function to execute then, like a Click Event CallBack Functions

// Inside an Execution Context we have:
// 1. A Variable Enviroment, like a let, const, Functions, . Argument Objects
// The Arguments Objects contains all the Arguments passed into the Functions that the current Execution Context belongs to
// A Function can acess Variables outside the Function

// 2. The Execution Context also have a Scope Chain
// The Scope Chain is references to Variables located outside of the current Function, this is stored in each Execution Context

// 3. Also the Execution Context get acess to the This Keyword

// All these 3 steps of the Execution Context are created during the Creation Phase, this happens right before execution

// The Execution Context created for Arrow Function does not have the Argument Objects nor the This Keyword
// Arrow Functions instead can use the This Keyword and the Argument Obejct from their closest regular Functions Parent

// All the Functions and Methods are unknow and only become know during the execution

// The CallStack is a place where Execution Context get stacked on top of each other, to keep track of where we are in the execution
// The Execution Context in the top of the CallStack is the one that's running, and when the execution of this Execution Context finishes, the current Execution Context get removed, and the execution will go to the previous Execution Context

// The Global Execution Context is the First on the CallStack and it will neve be remove from there, unless you close the browser or when the application is truly finished

// JavScript code run inside the CallStack
// Code runs inside the Execution Context inside the CallStack

//////////////////////////////////////////
// Scope and The Scope Chain

// Scope Concepts:
// Scoping is how our program's variables are organized and accessed

// Lexical Scoping is when Scoping is controlled by placement of Functions and Block on our code. This means that a Function created inside another Function will have access to the Variables of the Parent Function
// Variable Scoping is influenced by where we write the Functions and code Blocks

// A Scope is a space or environment in which a certain Variable is declared. In Functions this is the Variable Environment
// There is: a Global Scope, Function Scope and Block Scope

// A Scope of a Variable is the Region of our code where the Variable can be accessed

// The 3 types of Scope
// Remember: the Scope is where our Variables are Declared

// Global Scope: the Variables are declared outside of any  Functions and/or Blocks. These Variables declared in the Global Scope are accessible everywhere in our code

// Function Scope (Local Scope): the Variables are declared inside a Function, and can only be accessed inside the same Function not outside. These are also called Local Scope

// Everything that's between the curly brackets {} is a Block
// Block Scope (ES6): Varaible declared inside the Block are only accessible inside that Block not outside.
// Warning: Only the Variable with Let and Const are applied to the Block Scope. Using Var will make the Variable accesseible outside the Block
// All Functions are also Block Scope, but only in Strict Mode

// Remember: You can assign a Varaible in the Global Scope, and then reassign it's value in a Function and/or Block Scope

// All theses Scope rules also works the same for Functions, talking about the GLobal Scope of a Function

// Each Function create it's own Scope

// Scope Chain: is a tree of Scopes
// A Scope has access to all Variables located from all outer Scopes (Parent Scopes). This also apply to Functions Arguments
// Scope Chain: means that if a Scope needs to use a certain Variable, but cannot find it in the current Scope, it will look up in the Scope Chain to see if it can find the Variable in the Parent Scopes, if it find will it will return the Value otherwise an error is returned. This is called Variable LookUp In Scope Chain
// A Scope will never have access to a Variable in an Inner Scope, they can only look up never down

// Using Var inside a Block will make the Variable accessible in the Parent Scope, only Const and Let will be accessible in that Scope these Variables where declared

// Var is Function-Scoped not Block-Scoped, and Let and Cosnt are Block-Scoped

// The Scope Chain works the same with Block Scope

// Global Varaibles is the Variables created in the Global Scope, and they are always in the top of the Scope Chain

// If a Scope is not writen inside one another, you can't access the Variables of one Scope inside another, simply because they are not writen inside one another. This is about Lexical Scoping.
// The Scope Chain only works upwards and never sideways

// Scope Chain vs. Call Stack
// The Global Scope Variables availible in the GLobal Scope are the same ones stored in the Variable Environment of the Global Execution Context

// The Scope always have the same Varaibles delcared inside that Function and the Variable Environment in the Execution Context
// Scope Chain is all about the order is which Functions are writen in the code
// The Scope Chain has nothing to do with the order in which the Function were called, meaning that the Scope Chain has nothing to do with the order of the Execution context and the Call Stack

// All Variables assigned in a Parent Scope are accessible in all it's Child Scopes

// Even if a Function is called inside a Function, the Variables inside the Function that called the other Function will not be accessible in the Function called

// Summary:
// Scoping askas the question "Where do Variables live?" or "Where can we access a certain Varaible, and where not?"

// There are 3 types of Scope: the Global Scope, Scopes defined by Function (Function Scope), and Scopes defined by Blocks (Block Scope)

// Only Let and Const are Block-Scoped. Var end up in the closest Function Scope (Parent Scope)

// Lexical Scoping are the rules of where we can access Varibales are based by where in the code Function and Block are writen

// The Scope Chain means that all Scopes always have access to all Variables from all its Outer Scopes (Parent Scope)

// The Variable LookUp is when a variable is not in the current Scope, the engine look up in the Scope Chain until it finds the Variable it's looking for

// The Scope Chain only works Upwards and never Downwards

// The Scope Chain in a certain Scope is equal to adding together all the Variables Environments of all the Parent Scopes

// The Scope Chain has nothing to do with the order in which Functions were called or the Call Stack. It does not affect the Scope Chain at all

//////////////////////////////////////////
// Scoping in Practice
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, You are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // Creating NEW variable with same name as outer scope's variable
      const firstName = 'Steven';

      // Reassigning outer scope's variable
      output = 'NEW OUTPUT!';

      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }
    }
    // console.log(str);
    console.log(millenial);
    // console.log(add(2, 3));
    console.log(output);
  }
  printAge();

  return age;
}

const firstName = 'Jonas';
calcAge(1991);
// console.log(age);
// printAge();

// You should not use the Variable name "name"
// The code inside a Function is only executed when the Function is called
// The Parameter of a Function works the same as Variables, and the Parameters are affected by the Scope
// The Scope of a varaible is the entire region of a code where we can access the Variable
// Remember: the Scope Chain only goes Up
// In the Global Scope we do not have access to any Variable declared in another Scope
// Const and Let Variables are Block-Scoped, they're only availible in the Block they were created
// Var Variables are inly Function-Scoped and not Block-Scoped
// Functions are also Block-Scoped, but only when Strict Mode is activated
// JavaScript always look first in the Current Scope for the Varaible
// Variables can have the same name as long as they are in different Scopes, the same works with Parameters
// You can reassign a Varaible Value inside a Child Scope and then use this Variable with the new Value on the Scope it was defined

//////////////////////////////////////////
// Variable Environment: Hoisting and The TDZ

// Hoisting makes some types of Variables accessible in the code before they're declared
// The code is scanded for Variable declaration before execution, and then for each Variable is created a new Property in the Variable Environment Object
// Hoisting doesn't work with all Variables declaration

// The Variables that are Hoisted:
// Function Declaration, and their initial value is the actual Function. You can use Function Declaration before they're declared, because they are stored in the Variable Environment before the execution
// The Var, the initial value it's Undefined. And it's Function Scoped

// The Variables that are NOT Hoisted:
// Let and Const, technically they're Hoisted, but it's value is set to Uninitialized, in practice is like they're not being Hoisted at all

// Function Expressions and Arrow Function, this will depends if they were created using Let and Const or Var. Since this Functions are just Variable they behave like so

// The Temporal Dead Zone (TDZ), makes that we can't access the Variables between the beggining of the Scope and the place the Variables are declared, this will result in an Error. They're Block Scoped

// The TDZ is the Region of the Scope whre the Variable is defined but can't be used in any way yet

// There is different types of Error Messages

// Each and every let and Const gets their on TDZ, that starts in the beggining of the Scope until the ine where is defined

// The Variable is only safe to use after the TDZ

// The TDZ makes it easier to catch and avoid errors, and make the Const Variables work the way they're supposed to

// Trying to access the Variables before declaration should be avoided at any cost

// Hoisting is impleted so that we can use Function Declarations before they are actually declared, and the Hosting of Var was the only way it could be implemented at the time

// Remember: When using Strict Mode Function become Block Scoped

//////////////////////////////////////////
// Hoisting and TDZ in Practice

// Variables
console.log(me);
// console.log(job);
// console.log(year);

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

// Using a Var Variable before it's declaration this return Undefined
// Using a Const and Let Variable before it's declaration this return an Error

// The TDZ of a Variable is the region between the begginig Scope and the place where Variable is defined

// Functions
console.log(addDecl(2, 3));
// console.log(addExpr(2, 3));
console.log(addArrow);
// console.log(addArrow(2, 3));

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Function Expressions and Arrow Functions are also affected by the TDZ (Temporal Dead Zone)
// Function Expressions and Arrow Functions are just values stored in Variables, that's why you can't accesse them before they're defined
// Any Variable defined with Var will be Undefined until they get defined in the code

// Exemple

console.log(undefined);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// Remember: Just don't you Var to avoid Errors, use Const more and when you are sure that the values need to change then use Let

// To keep you code cleaner always declare the Variables at the top of the code

// Always define your Functions First and then later use them, use this with all Functions

var x = 1;
let y = 2;
const z = 3;

// Window is the Global Object of JavaScript in the browser
// The Let and Const does not create Properties in the Window Object

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);

//////////////////////////////////////////
// The This Keyword

// The This Keyword/Variable is a special Variable created in every Execution Context, so it is in every Function
// The This Keyword points to the owner of that Function

// The value of the This Keyword is not the always the same. It will depend on how the Function is called, and the value is ony assigned when the Function is actually called

// There is 4 ways to call a Function:
// Method: in this case the This Keyword will point to the object calling the Method
// Calling them normally: in Strict Mode the This Keyword will be Undefined, otherwise the This Keyword will point to the Global Object (Window)
// Arrow Functions: this types of Functions don't get their own This Keyword, instead the This Keyword will point to the Parent(surrounding) Function, this is called the Lexical This Keyword
// Event Listener: the This Keyword will point to the DOM Element that the Handler is attached to

// The This Keyword will NOT point to the Function we are using it
// Also the This Keyword will never points to the Variable Environment of the Function

// You can also call a Function using New, Call, Apply, Bind

//////////////////////////////////////////
// The this Keyword in Practice

console.log(this); // the This Keyword will point to the Window Object

const calcAgeThis = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeThis(1991);

const calcAgeArrowThis = birthYear => {
  // The Arrow Function does not get it own This Keyword, on a Arrow Function will get the This Keyword from it's parent Function
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrowThis(1991);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this); // The This Keyword will point to it's Parent Function/Element
    console.log(2037 - this.year);
  },
};
// This is a Method call
jonas.calcAge(); // The This Keyword will be the one calling the Method

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge; // This will copy the Function from Jonas to Matilda, this is Method Borowing
matilda.calcAge();

// When using a calling a Method the This Keyword will point to the Object that is calling the Method

// The This Keyword is dinamyc and it depends on how the Function is called

const f = jonas.calcAge; // The calcAge Function is not being called, only copied. Using () will call the Funtion
f(); // this will return Undefined, because the f Function is not attached to any one, but tthe Global Object

// Remember: the This Keyword points to the Parent Function(Element)

// Remember: a Function is just a Value

//////////////////////////////////////////
// Regular Functions vs. Arrow Functions

// var firstName = 'Matilda';

// Jonas is an Object Literal, this Object does not create its own Scope, Jonas still on the Global Scope
const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); // The This Keyword will point to it's Parent Function/Element
    console.log(2037 - this.year);

    // Solution 1
    // const self = this; // self or that
    // const isMillenial = function () {
    //   console.log(self);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    //   // console.log(this.year >= 1981 && this.year <= 1996);
    // };

    // Solution 2
    const isMillenial = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
      // console.log(this.year >= 1981 && this.year <= 1996);
    };

    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`); // The Arrow Function does not get it's own This Keyword, instead the Arrow Function will get the This Keyword from it's Parent Element
  },
};
jonas.greet();
jonas.calcAge();

// If you try to access a Propertie that doesn't exists an Object you get Undefined

// Variables created with Var creates Properties on the Global Objects

// Don't use Var to create Variables
// Also never use an Arrow Function as a Method

// REMEMBER: A REGULAR FUNCTION CALL HAS THE THIS KEYWORD TO UNDEFINED

// It is common to create a Variable called self in the Function that can use the This Keyword, to hold the value of the This Keyword. Ex: const self = this; .But this is an old solution, a newer solution is to simply use an Arrow Function

// An Arrow Function does not have its own This Keyword, the Function will inherit the This Keyword from its Parent Object

// Arguments Keyword
const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12); // the Arguments Keyword is usefull when we want a Function to accept more Arguments than we previusly defined
// You can add as many Arguments as you want, despite having only define a few in the Parameters, they'll just not have a name
// The Arguments Keyword return an Array with all the Arguments passed into the Function

// Functions also get access to an Arguments Keyword
// Like the This Keyword the Arguments Keyword are only availible on Regular Functions

// Arrow Functions does not get the Arguments Keyword
const addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow(2, 5, 8);
*/
//////////////////////////////////////////
// Primitives vs. Objects (Primitive vs. Reference Types)

let age = 30;
let oldAge = age; // This will store the Value before it's changed
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me;
friend.age = 27;
console.log('Friend:', friend);
console.log('me:', me);

// Primitives values are: Strings, Numbers, Booleans, Undefined, Null, Symbol, BigInt

// Everything else than a Primitive Value is an Object, like Object Literal, Arrays, Functions, etc

// In memory and memory managment the Primitive Values are called Primitive Types and the Objects are called Reference Types

// The JavaScript Engine has 2 main components: the Call Stack, where all Function are executed; and the Heap, where Objects are stored in memory

// All Reference Types (Objects) will be stored in the memory Heap
// All Primitive Types (Primitive Values) are stored in the Call Stack, meaning that they will be stored in the Execution Context they were declared

// Primitive Types
// When you create a Variable, the JavaScript Engine will create an unique identifier with the Variable name, then a piece of memory will be alocated with an address, and finally the value will be stored in memory at the specified address. All this happens in the Call Stack, where the Primitives are stored
// The identifier point to the address an not the value
// The value of a certain address cannot be changed

// Reference Types
// When a new Object is created, this Object will be stored in the Heap, this Object will have an address and a value. But the identifier will not point directly to the address in the Heap.
// Instead the identifier will point to a new piece of memory created in the Call Stack, and then this new piece of memory will have it's value pointing to the object address created in the Heap. Basically, the piece of memory in the Call Stack will make a reference to the piece of memory in the Heap, that holds the Object

// This happens because some Obejcts are to big to be in the Call Stack, but instead they aare stored in the Heap, since is an almost unlimited memory pool

// You can change a Property of an Object, because you're not changing the value in the Call Stack, but the Value in the Heap
// You can change the Value of a Const, but only if this Variable is a Reference Type and not a Primitive Type

// If you change the value of an Object, all the others identifier that are pointing to that same address will be changed

// When you think you're copying an Object, you a just crating a new Variable that points to the exact same Object

//////////////////////////////////////////
// Primitives vs. Objects in Practice

// Primitive Types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';
console.log(lastName, oldLastName);

// Reference Types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};
const marriedJessica = jessica; // You're just making a reference to the same Object in the Heap, and not copying it or creating a new Object in the Heap
marriedJessica.lastName = 'Davis';
console.log('Before marriage:', jessica);
console.log('After marriage:', marriedJessica);

// marriedJessica = {}; // This doesn't work because you're changing the address value in the Call Stack, and Const cannot change their values

// Copying Objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// The Object.assign() Method combines 2 Objects and return a new one
const jessicaCopy = Object.assign({}, jessica2); // This will copy jessica2 and them will merge with the Empty Object, thus creating a brand new Object, and then you store this new Object in the Variable
jessicaCopy.lastName = 'Davis';
console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);

jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

console.log('Before marriage:', jessica2);
console.log('After marriage:', jessicaCopy);

// Each Primitive Value creates a new piece of memory in the Call Stack
// A Reference Value is stored in the Heap and the Call Stack just keeps a reference to a memory position at which the Object is stored, meaning that this reference will go to the address of the Object in the Heap

// You cannot change a value (Primitive Types) on the Cal Stack that is stored in a Variable created with Const, but with Objects or Reference Types you can change
// Changing something in the Heap has nothing to do with Const, Let or Var

// Using the Object.assign() Method only works for the first-level Objects, meaning that it will not work for the Objects that are inside the Object you assigned, they will point to the same address in memory, bringing back the same Error

// Shallow Copies will only copy Properties in the first-level
// Deep Clone will copy everything

// An Array is just an Object
// The Push Method will add a Value to the end of an Array
