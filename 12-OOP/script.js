'use strict';

/*
///////////////////////////////////////////
// What is Object-Oriented Programming?

// Object-Oriented Programming === OOP

// OOP is a programming paradigm based on the concepst of Objects

// Paradigm is the style of the code, the way the code is writen and organized

// Objects are used to describe the real world or abstracts features

// Objects can contain Properties (data) and Methods (code). Basically with Objects we can pack data and behaviors into 1 block of code

// In OOP, the Objects are a self containing blocks of code

// Objects are a building block of a application, and they can interact with other Objects

// And the interaction between Objects happens through an API (public interface)

// The Public Interface: is a collection of Methods that a code outside an Object can access and use it to interact with the Object

// The OPP was created for the pourpose of organizing the code, making it more flexible and easier to maintain

////// Traditional OOP
// In OOP we need a way to create Objects programmatically from our code. And to do that we can use the Classes

// Classes are like a blueprint, in which we can create new Objects based on the rules described on the Class. Basically is just a plan, and will not have the Data write already on it

// All objects created from a Class are called Instances of that Class

// An Instance is a new Object created from a Class with the described information. And this Instance will have Data

// From a Class there can be created infinite Objects based on that Class descriptions and the Instances created from that Class can have different data from each other

/////// OPP Fundamental Principles
// 1. Abstraction: is ignoring or hidding details that doesn't matter, this allow us to get an overview perspective of what we're implementing
// 2. Encapsulation: is to keep the Properties and Methods private inside the Class, so that they can't be accessed from outisde. But some Method can still be exposed through a API (Public Interface)
// 3. Inheritance: makes the Properties ad Methods of a certain Class available to a child class, this allows us  to reuse all the Properties and Methods of the Parent Class, also on the child Class but with the exclusive Properties on the Child too. This forms a hierarquy between Classes
// 4. Polymorphism: is the ability of a CLass child to overwrite a Method inherited from a parent Class

// Abstraction is used all the time

// State is an Object data

// The Public Interface are the Methods that are not Encapsulated

// Polymorphism === many shapes

// To overwrite a Method simply write the name of the Method and then add what you need to change

///////////////////////////////////////////
// OOP in JavaScript

// Prototypes === prototipo

// All Objects in JavaScript are linked to a Prototype Object

// Prototypes have Methods and Properties that all the Objects that are link to that Prototype can access and use this Methods. This is called Prototypal Inheritance, this is defferent from a Class inheriting from another Class, in here is basically an Instance inheriting from a Class

// Behaviors (Methods) are delegated (passed) from the Object to the link Prototype Object

// The Prototypal Inherintance can also be called Delegation

// The process of creating an Instance is called Instantiation

// 3 ways of creating OOP in JavaScript:
// 1. Constructor Functions: creating Objects from a Function. Like Arrays, Maps or Set, this is the way these Data Structures are imoplemented
// 2. ES6 Classes: more modern way. Syntactic Sugar: Behind the scenes, the ES6 Classes works the same as the constructor Functions. Ans the ES6 Classes does not behave like Classes in Classical OOP
// 3. Object.create() : is the easiest and most direct wat of linking an Object to a Prototype Object

// The 4 Fundamental Principles of OOP are still valid for the Prototypal Enheritance

///////////////////////////////////////////
// Constructor Functions and the new Operator

// We can use the Constructor Fuction to create an Object
// To create a Constructor Fuction use the new Operator when calling the Function, that's the only difference between the Constructor Fuction and a Regular Function
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this
  //   this.calcAge = function () {
  //     console.log(2037 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

// There is a convention that Constructor Fuction need to start with a capital letter (Letra Maiúsculas)

// An Arrow Function doesn't work as a Constructor Fuction, because the Arrow Function doesn't have the this KeyWord

// You can store the Intances inside a Variable

// When a new Instance is creatd from a Constructor Fuction the this KeyWord will be pointing to the newly created Object

// To assign Properties inside a Constructor Fuction you need to write the this KeyWord, and then a dot, and after the dot the name of the Property

// It is a convention to create Property names based on the Parameters names

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);

// Constructor Fuction kinda simulates a Class

// The intanceof Operator will check if an Object is an Instance of a Constructor Fuction, it will return True if it is an Instance of that Constructor Fuction, and False if it's not. You don't call the Constructor Function if you are using this Operator
console.log(jonas instanceof Person);

// To create Methods you use the this KeyWord and then the name of the Method and then just a Function Expression. But this is a bad practice. Instead use the Prototypal Inheritance

///////////////////////////////////////////
// Prototypes
console.log(Person.prototype);

// All Functions in JavaScript automatically has a Property called Prototype. A Constructor Function also have this Prototype Property and also all Objects created from this Prototype will have access to what we wrote on the Constructor Fuction Prototype
// This is a better way of creating Method on a Constructor Fuction
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// Since the Prototype Property is also an Object you can simply add a new Property with a dot after the Constructor.prototype Property

// All Objects created from a Constructor Fuction will have access to the Constructor Fuction Methods too

jonas.calcAge();
matilda.calcAge();

// You can see the Prototype of an Instance with the __proto__ Property. This Prototype will be the Prototype Property of the Constructor Fuction
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype);

// The Prototype Property of a Constructor Fuction is not the Prototype of the own Constructor Fuction, but it is the Prototype of the Objects that are going to be created from that Constructor Fuction

// You can check if a Prototype is a trully a Prototype of an Object with the isPrototypeOf() Method. As Argument this Method will recieve the Object. And this Method is attached to the Prototype Property of a Constructor Fuction
console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
console.log(Person.prototype.isPrototypeOf(Person));

// .prototypeOfLinkedObjects

// You can also set Properties on the Prototype. and you can use this Properties on the Instances
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

// The owned Properties are the ones defined on the Objects itself, this does not includes the inherited Properties

// You can check if an Instance has an own Property with the hasOwnProperty() Method. And as Argument this Method needs a String with the name of the Property
console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

///////////////////////////////////////////
// Prototypal Inheritance and The Prototype Chain

// The Property Constructor of a Constructor Function points back to the Construction Function itself

// The Property Prototype of a Constructor Function points to the Properties that the Objects that are created from this Constructor Function have access to

// Process of creatinf an instances with the new Operator
// 1. An empty Object is created
// 2. The this KyeWord in the Constructor Function is set to the new Object
// 3. The new Object is linked (__proto__) to the Constructor Function Prototype Property
// 4. The new Object is returned

// The __proto__ always points to an Object Prototype

// This process works for Constructor Function and ES6 Classes

// If a Property or Method cannot be found on the Object, JavaScript will try to find it on the Objects __proto__ Property

// You can create as much new Objects as you want, because they will all inherite the Prototype Property of the Constructor Function

// The Prototype Chain is the Objects linked to a Prototype and the ability of the Objects to access this Prototype

// Since the Prototype Property of a Constructor Function is also an Object, this Property also get a Prototype Property, to access it use the Object.prototype Property

// And this Object.property as been created by the Object Constructor Function, and this is the Function called behind the scenes when an Object is created

// And all of this is the Prototype Chain, a series of links between Objects, linked through Prototypes

// The Object.prototype is in the top of the Prototype Chain. And the __proto__ Property is set to Null

///////////////////////////////////////////
// Prototypal Inheritance on Built-In Objects

console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

// You can chain the __proto__ Properties after one another

console.dir(Person.prototype.constructor);

// The constructor Property will point to the Constructor Function of that Object

// As a Function it is an Object it also have a Prototype

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

// REMEMBER: All Objects have a Prototype Property

console.log(arr.__proto__.__proto__);

// Since Array get all their Methods from the Array.prototype, you can add new Methods to the Array Constructor that can be used to all Arrays in the project
Array.prototype.unique = function () {
  return [...new Set(this)];
};
// It is not a good practice to add Method to the Array Constructor
console.log(arr.unique());

// DOM Element also have access to a Prototype Property
const h1 = document.querySelector('h1');
console.dir(x => x + 1);

///////////////////////////////////////////
// ES6 Classes

// To create a Class use the class KeyWord and then the name of the Class and after that write {}

// There are 2 types of Classes, a Class Declaration and Class Expression

// Class Expression
// const PersonCl = class {};

// Class Declaration
class PersonCl {
  // After creating a Class you need to add the constructor() Method, and this Method works the same way as the Contructor Function. You need to pass the Parameters that are going to be the data passed through the Method, and then create a block {} after the ()
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance Methods
  // You can add Method inside the Class, but it needs to be outside the constructor() Method. ALso all this Methods created will be in the Prototype of the Class
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static Method
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

// A Class is a special type of Functions

// To create an Instance of a Class, simply write the new KeyWord and then the name of the Class, after that you put a () after the name of the Class and pass the Data to the new Instance created
const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

// REMEMBER: The this KeyWord will point to the newly created Object
console.log(jessica.__proto__ === PersonCl.prototype);

// You can add a Methods manually in the Prototype, as if it was with a Constructor Function
// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// Hoisted means that you can use something before it is declared in the code

// 1. Classes are NOT Hoisted
// 2. Classes are first-class citizes, meaning that you can pass then in Functions and return then from Functions
// 3. Classes are executed in Strict Mode

// Even if you don't use the Strict Mode, a Class will always be in Strict Mode

// Only use Classes if you really undestood the Prototype and Prototypal Inheritance

const walter = new PersonCl('Walter White', 1965);

///////////////////////////////////////////
// Setters and Getters

// All Objects in JavaScript can have Getter and Setter Properties, and those Properties are called Assessor Properties. And the more normal Properties are called Data Properties

// The Getter: get a Value and the Setter: set a Value

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],

  // To transform a Property into a Getter Property use the prepend get before the name of the Method
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // To transform a Property into a Setter Property use the prepend set before the name of the Method. And every Setter need to have exactly 1 Parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};

// When using a Getter Property don't call the Method, just make a reference to it, or just write it as a Property
console.log(account.latest);

// When using a Setter Property don't call the Method, just make a reference to it, or just write it as a Property. And then just set/define (=) it's Value
account.latest = 50;
console.log(account.movements);

// Classes also have Getters and Setters, and they work the same way

// A Getter is like every other Function we set in the Prototype

// Getters and Setters can be usefull for Data Validation

// The includes() Method also is accessbile for Strings

// If a Setter and the constructor() Method tries to define the same Property there's gone be an Error. And to resilve this problem simply make the Setter define a new Property. And there is a convention that says that you can use _ before the name of a Property that a Setter is going to set/define
// Now you can also make a Getter return the Value of a Setter, this can be used to change the name of a Proeprty return by a Setter

///////////////////////////////////////////
// Static Methods

// The Array.from() Method will convert an Iterable to an Array

// Some Methods are attached only to a Constructor, and not to a Prototype Property of that Constructor. You can also sey that these type of Methods are in the name-space of that Constructor or that this Methods are Static on that Constructor

// To create an Static Method, you simplt add a Method to the Constructor Function or the Class, and then you call the Method with the ()
Person.hey = function () {
  console.log('Hey there');
  console.log(this);
};
Person.hey();

// REMEMBER: Static Functions are not Inherited

// And in a Class you simly write the static KeyWord before the name of the Method

// Instance Methods are the ones that are Inherited through the Instances by the Prototypal Inheritance

PersonCl.hey();

///////////////////////////////////////////
// Object.create

// You can also create an Object with the Object.create() Method, the rules of Prototypal Inheritance apllies here too

// With the Object.create() there is no Prototype Property, no new KeyWord and no Constructor Functions

// This means that with Object.create() we can set manually the Prototype of an Object to any other Object that we want
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // To add Properties programmatically in the Object.create() you need to create a Function for that. In this Function you pass the data that you need and then set this data using the this KeyWord. And after the Function is done, simply call this Function on the Object that you want to pass the data to. It looks like a Constructor Function, but it is not
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// In the Object.create() Argument you pass in the Object that is going to be the Prototype of the new Object
const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

// You can set the Properties of the newly creted Object with the Object.create() as if you would dp it with a Object Literal, but that's not ideal

// With Object.create() we set the Prototype of an Object to anything we want, and that's the difference that the Object.create() has against the Constructor Functions and Classes

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

///////////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

// You use the Inheritane between Classes to create more specifics Objects

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

// You usually want a Child Class to have the same functionality as a Parent Class, but with some additional functionality. Meaning that you will pass the same Parameters, but you will add some too
const Student = function (firstName, birthYear, course) {
  // The call() Method will set the this KeyWord to whatevber we want and also call the Function
  // To use a Function from another Object use the call() Method and basically use a Function from another Object (You're not linking the Object yet, you're just calling a Function)
  Person.call(this, firstName, birthYear); // You must call the Parent Class to add it's data to the child Class
  // The this KeyWord will be pointing to the own Constructor Function
  this.course = course;
};

// Linking prototypes
// Now to set an inheritance between Classes you need to set that manually and you do that by using the Object.create or the call() Method
Student.prototype = Object.create(Person.prototype);
// Creating inheritance without the Object.create() will result on the Prototype of that new Object being directly pointed to the Prototype of the defined Object, meaing that will jump to the Parent Constructor Functions without getting the data or behaviors of the child Constructor Functions
// Student.prototype = Person.prototype; // DON'T DO THIS

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
mike.introduce();
mike.calcAge();

console.log(mike.__proto__); // The __proto__ Property is the Prototype of the Object that is lending the Prototype to another Object
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);
console.log(mike instanceof Object);

Student.prototype.constructor = Student;
// Using the Object.create() will change the constructor Property to the Object passed as the Argument. To fix this just set the constructor Property back to the Object itself
console.dir(Student.prototype.constructor); // The constructor Property will point to the own Constructor Function

// REMEMBER: The DRY concept, Don't Repeat Yourself

// In a Regular Function call the this KeyWord is Undefined

// When an Instance is created the new Object is automaically linked to the Constructor Function Prototype

// The idea of inheritance is to share behaviors (Methods) from a parent Class to a child Class

// REMEMBER: The Object.create() is used to set the Prototype of a Class manually

// You can access the Prototype of some Object using the .prototype Property

// When creating an inheritance between Constructor Functions, using the Object.create() Method will return an empty Object, meaning that will overwrite anything that was on the Prototype of that Object

// REMEMBER: The Prototype Chain is the same idea of the Scope Chain but with the Prototypes of an Object

// REMEMBER: The Object.prototype is on the top of the Prototype Chain, and you still can use the Properties of the Object.prototype, no matter how far it is on the Prototype Chain

// REMEMBER: Classes works the same way as Constructor Functions

// REMEMBER: Of polymorphism that means that you can overwrite the data and behaviors of the parent Class on a child Class

///////////////////////////////////////////
// Inheritance Between "Classes": ES6 Classes

class PersonCl {
  // After creating a Class you need to add the constructor() Method, and this Method works the same way as the Contructor Function. You need to pass the Parameters that are going to be the data passed through the Method, and then create a block {} after the ()
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance Methods
  // You can add Method inside the Class, but it needs to be outside the constructor() Method. ALso all this Methods created will be in the Prototype of the Class
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.firstName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    // console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static Method
  static hey() {
    console.log('Hey there');
    console.log(this);
  }
}

// To create inheritance between ES6 Classes simply write the extends keyWord after the name of the Class and then the name of the Parent Class. And you also need the super() Method
class StudentCl extends PersonCl {
  // Now instead of calling the parent Class manually simply pass the Parameter on the contructor() Function that have in the parent Class and add the ones you need, and also call the super() Method on the constructor() Function
  constructor(fullName, birthYear, course) {
    // Always needs to happen first!
    super(fullName, birthYear); // The super() Method is the Prototype of the parent Class. And inside the Method Argument you pass the Parameters you passed in the constructor() Parameter, but only the ones of the parent Class
    // The super() Method creates the this KeyWord on the child Class
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

// REMEMBER: The CLasses are just the Constructor Functions but with the details hidden

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();

// If a constructor() is not defined, then the super() Method is automatically called and basically a copy of the parent Class is made with no additions

///////////////////////////////////////////
// Inheritance Between "Classes": Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  // To add Properties programmatically in the Object.create() you need to create a Function for that. In this Function you pass the data that you need and then set this data using the this KeyWord. And after the Function is done, simply call this Function on the Object that you want to pass the data to. It looks like a Constructor Function, but it is not
  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

// In the Object.create() Argument you pass in the Object that is going to be the Prototype of the new Object
const steven = Object.create(PersonProto);

// To create inheritance with Object.create() you simply create a new Object empty with the parent Class, and later you the data and behaviors to this child Class

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};
// You can make a child Prototype reuse a Method from a parent Prototype, and you can do this by using the call() Method

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();

// With Object.create() you're simply linking Objects together

///////////////////////////////////////////
// Another Class Example

class Account {
  // 1) Public fields (instances)
  locale = navigator.language;

  // 2) Private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    // Protected property
    this.#pin = pin;
    // You can create more Properties on an Instance that are not based on input or a Parameter
    // this._movements = []; // Also you can create Properties with Expression, Data Structures, empty Data Structures, and so on
    // this.locale = navigator.language;

    // You can run any code on the constructor() if you want, but remember that the constructor() is the Prototype of the Class
    console.log(`Thanks for opening an account, ${owner}`);
  }

  // 3) Public methods

  // Public interface (API)
  getMovements() {
    return this.#movements;
  }

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  withdraw(val) {
    // You can call others Methods inside of a certain Method
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    // if (this.#approveLoan(val)) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log(`Loan approved`);
    }
    return this;
  }

  static helper() {
    console.log('HELPER');
  }

  // 4) Private methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);

// Don't do this
// acc1._movements.push(250);
// acc1._movements.push(-140);

// It better to create Methods that interact with the Class Properties
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1.getMovements());
console.log(acc1);
Account.helper();

// Chaining
acc1.deposit(300).deposit(500).withdraw(35).requestLoan(25000).withdraw(4000);
console.log(acc1.getMovements());

// console.log(acc1.#movements);
// console.log(acc1.#pin);
// console.log(acc1.#approveLoan(100));

// You really need data Encapsulation and data privacy, this can be usefull for when you don't want to access a certain Property

///////////////////////////////////////////
// Encapsulation: Protected Properties and Methods

// Encapsulation means to keep some Propertes and Methods private inside the Class, so that you can't access them outside the Class

// Data Encapsulation and Data Privacy is important so that a code outside the Class doesn't manipulate by mistake our data inside the Class, and when we only show a small Public Interface then we can change the internal Methods with more confidence

// In JavaScript there is not a way yet to create private Data with confidence or a syntax that works perfect. For now there is only a convention that if you put a _ (underscore) before the name of the Property, it means that it should NOT be accessed from outside from the Class

///////////////////////////////////////////
// Encapsulation: Private Class Fields and Methods

// Private Class Fields and Methods are an idea for improving JavaScript Class which is called Class Fields

// In OOP Languages like C++ or Java, Class Properties are called Class Fields

// Fields is like a Property that is going to be in all Instances, and you can use the this KeyWord on the fields

// There are 4 different kinds of Fields and Methods:
// 1) Public fields: Properties are availible in all Instances of that Class and not on the Prototype
// 2) Private fields: Properties are trully not availible from outside, but you can still access them via a another Method or Property. And they are only on the Instances and not on the Prototype
// 3) Public methods: Are the Methods that you can use outside the Class, and they're on the Prototype
// 4) private methods: Are the Methods that you cannot access from outside the Class, and they're usefull to 'hide' implementation details from the outside, and they're NOT on the Prototype
// (There is also the static version)

// Creating are 4 kinds of Fields and Methods:
// 1) To create a Public Field simply write the name of the Variable outside the constructor() and set it equal to the Value you want. But define the Variable without the Const or Let
// 2) To create a Private Field simply write the name of the Variable with a # (hash) before the name and outside the constructor() and set it equal to the Value you want. But define the Variable without the Const or Let

// 3) To create a Public Method simply write the Methods as you would normaly

// 4) To create a Private Method is the same syntax as creating a normal Method, but in the name you put a # (hash) before the name

// To create the Static Version you need to put the word static before the nome of the Property or Method

// OBS: You cannot define a Field on the constructor() Fuction, but if you need the input of the constructor() simply define the Private Field outside the constructor, basically just write the name of the Private Field without assigning it to nothing, and then reasign it on the constructor(). Still use the this KeyWord inside the constructor()

// REMEMBER: The static Property or Method means that those Properties or Methods will only be ont he Class itself

///////////////////////////////////////////
// Chaining Methods

// You can make the Methods of a Class in a way that you can use the Chain idea for them, basically using a Method after another. And to do that you just need to return the Object on the end of a Method to make it chainible, and you can return the Object using the this KeyWord

// REMEMBER: The this KeyWord is the current Object

// Creating a chain between Methods it only makes sense when they set a Property

///////////////////////////////////////////
// ES6 Classes Summary

// The extends KeyWord will automaticaly create the Prototype Chain for us

// A Public Field is like a Property that we define on the Constructor, and will be availible in all Instances 
// A Private Field is NOT acessible outside the Class

// The static KeyWord will make the Property or Method availible ONLY on the Class, and can be used in any Field

// The constructor Method is called by the new Method when an Instance is created. You must add this Method on a parent Class or Regular Class

// The super() calls the parent Class, and it is only needed when the extends KeyWord is used. Also it needs to be the first thing on the constructor()

// The Instance Properties goes inside the constructor() and are create with the this KeyWord and based on the constructor() input, and they're on all Instances Prototype, it is used for something unique of the Object

// Using the _ before the name of a Method or Property means that this thing is private, it is a convention

// The Getter method ('get ' before name of Method) is used to get a Value out of an Object by writing a Property instead of a Method

// The Setter Method ('set ' before name of Method) is used to set/define a Value of an Object as a Property. You may need to use a _ before the name of a Variable and also on the Getter if you have a Property with the same name as in the Setter 

// The Static Methods are usually used as helper Methods for the Class

// Classes are just a simplyfication of the way to write a Constructor Function (Syntatic Sugar)
// Classes are not Hoisted, you can`t use something before defining it 
// Classes are first-class citizens
// Classes are always in Strict Mode

*/
