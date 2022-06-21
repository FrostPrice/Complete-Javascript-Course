'use strict';

/////////////////////////////////////
// PROJECT #2: Modal Window

// Using Classes with the DOM is the main way to manipulate web pages

// On the Terminal CTRL + C ends the live-server
// It's common to select the DOM Elements inthe beggining of the file and them define them into Variables

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelectorAll('.show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++) {
  btnsOpenModal[i].addEventListener('click', openModal);
}

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// QuerySelector only return the first Element it find on the DOM, even if there is multiple Elements with the same Class
// Use querySelectorAll to select all Elements in the DOM with the same Class

// A nodeList works like an Array, meaning to loop through or select the Elements by their index (start from 0)

// It is normal to give the name of the Variable the same name as the Class
// When you set the display to none the Element will not be showing in the page, it will be hidden
// When there is 1 line of code in some Statements there no need to create a Block {}

/////////////////////////////////////
// Working With Classes

// You can set an Event Listener inside a Loop
// An Evenet Handler and Event Listener is almost the same thing

// To get a Class from a DOM Element use the classList property. Which this classList property has a lot of methods, like the Remove Method
// The Remove Method (classList property) can remove multiple Classes, just put a comma , after the name of the Class, Also the name of the Class needs to be in Strings

// It's better to store the style in Classes and them add them or remove them using the classList property and its Methods

// You can add a Class to a DOM Element using tha Add Method from the classList property
// You can add a click event not only for buttons, but for every Element in the DOM

// You can pass an already define function as the Event Handler on the addEventListener
// Remeber that the () after the name of the Function calls the Function imediately, but with Event you only want the Function to be called when the Event is executed, so put the name of the Function but without the ()

// With Functions you can add, remove, basically change the appearence of the page by changing multiple Classes at once

// You can check if a Class is present on an Element

/////////////////////////////////////
// Handling an "Esc" Keypress Event

// A keyboard event is a global event, meaning that it doesn't have a especific element where that event is going t happen
// A keyboard event is listed or define in the whole document

// There are 3 types of keyboard events: keydown (Activates when we just press the key in the keyboard), keypress (Activates when keep pressing (hold) a key on the keyboard), keyup (Activates when we release the key in the keyboard)

// When an Event happen we can get the information about that event in the addEventListener Function, like what key was pressed
// The Paremeter on the Function inside the addEventListener, will get all the information about that Event
// And also the Paremeter on the Function inside the addEventListener, has a lot of Method to manipulate this information
// The Key property inside the Paremeter, is what key on the keyboard was pressed
// The name of the Key pressed needs to be inside a Sting

// You can check if an Element already has a Class, use the Contains Method from the classList Property

// When a Event Listener is defined on the document, the event will be executed on the whole page
// Remember the Not ! Operator
// On Statements you need to call the Function and not just make a reference to it
