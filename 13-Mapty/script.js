'use strict';

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  clicks = 0;

  constructor(coords, distance, duration) {
    // this.date = ...
    // this.id = ...
    this.coords = coords; // [lat, lng]
    this.distance = distance; // in km
    this.duration = duration; // in min
  }

  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${
      months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }

  click() {
    this.clicks++;
  }
}

class Running extends Workout {
  type = 'running';

  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
  }

  calcPace() {
    // min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';

  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    // this.type = 'cycling';
    this.calcSpeed();
    this._setDescription();
  }

  calcSpeed() {
    // km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}

// const run1 = new Running([39, -12], 5.2, 24, 178);
// const cycling1 = new Cycling([39, -12], 27, 95, 523);
// console.log(run1, cycling1);

/////////////////////////////////////////////
// APPLICATION ARCHITECTURE

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class App {
  #map;
  #mapZoomLevel = 13;
  #mapEvent;
  #workouts = [];

  constructor() {
    // Get user's position
    // this.workouts = [];
    this._getPosition();

    // Get data from local storage
    this._getLocalStorage();

    // Attach event handler
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopUp.bind(this));
  }

  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          alert('Could not get your position');
        }
      );
  }

  _loadMap(position) {
    // You can access the Properties of the position Object of the Geolocation API
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(
      `https://www.google.com.br/maps/@${latitude},${longitude},16.17z`
    );

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    //   console.log(map);

    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    // Handling clicks on map
    this.#map.on('click', this._showForm.bind(this));

    // Render markers on the map
    this.#workouts.forEach(work => {
      this._renderWorkoutMarker(work);
    });
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    // Empty inputs
    inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value =
      '';

    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _newWorkout(e) {
    const validInputs = (...inputs) =>
      inputs.every(inp => Number.isFinite(inp));
    const allPositive = (...inputs) => inputs.every(inp => inp > 0);

    e.preventDefault();

    // Get data from form
    const type = inputType.value;
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;

    // If workout running, create running object
    if (type === 'running') {
      const cadence = +inputCadence.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Running([lat, lng], distance, duration, cadence);
    }

    // If workout cycling, create cycling object
    if (type === 'cycling') {
      const elevation = +inputElevation.value;

      // Check if data is valid
      if (
        // !Number.isFinite(distance) ||
        // !Number.isFinite(duration) ||
        // !Number.isFinite(cadence)
        !validInputs(distance, duration, elevation) ||
        !allPositive(distance, duration)
      )
        return alert('Inputs have to be positive numbers!');

      workout = new Cycling([lat, lng], distance, duration, elevation);
    }

    // Add new object to workout array
    this.#workouts.push(workout);

    // Render workout on map as market
    this._renderWorkoutMarker(workout);

    // Render workout on list
    this._renderWorkout(workout);

    // Hide form + Clear input fields
    this._hideForm();

    // Set local storage to all workouts
    this._setLocalStorage();
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(
        `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`
      )
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `
    <li class="workout workout--${workout.type}" data-id="${workout.id}">
      <h2 class="workout__title">${workout.description}</h2>
      <div class="workout__details">
        <span class="workout__icon">${
          workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
        }</span>
        <span class="workout__value">${workout.distance}</span>
        <span class="workout__unit">km</span>
      </div>
      <div class="workout__details">
        <span class="workout__icon">⏱</span>
        <span class="workout__value">${workout.duration}</span>
        <span class="workout__unit">min</span>
      </div>
      `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
  }

  _moveToPopUp(e) {
    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this.#workouts.find(
      work => work.id === workoutEl.dataset.id
    );

    this.#map.setView(workout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });

    // using the public interface
    // workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workouts));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    this.#workouts = data;

    this.#workouts.forEach(work => {
      this._renderWorkout(work);
    });
  }

  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();

// console.log(firsName);

/*
/////////////////////////////////////////////
// Project Overview
// This video was just an explanation of how the project works

/////////////////////////////////////////////
// How to Plan a Web Project

// Always start with a Planning Phase before starting any project

// One way to plan a project:
// 1. User Stories: is a description of the application features from the User's perspective. Joining all User's Stories will describe the entire application
// 2. Features: is how the application works, basicaly it's the functionality of the application
// 3. FlowChart: when you have all the Features from the User's Story, you create a FlowChart to separate the work that you need to do in a better way to visualise. It is basically WHAT we're going to build
// 4. Architecture: is HOW we are going to build our application, basically it is how we're going to organize our code and what JavaScript features we will use. It is the structure of our code
// 5. Development: after all the 4 previous steps have been completed then you can finaly start coding and implement you plan that you made on the 4 steps

// Without the Architecture in a code everything would be unorganized and confusing

// How to use all 4 steps
// 1. User's Story: it is common to create a text containg this kind of information. E.g 'As a [type of user], I want [an action] so that [a benefit]', this will create and answer the questions: WHO, WHAT, WHY?
// 2. Features: you will 'translate' the User's Stories to the appliaction Features. E.g. 'As a user i want to see the hours' ----> Implement a clock functionality
// 3. FlowChart: will contain the Features nad also how the diferent parts of the app are going to interact with each other, which event makes sense to implement and how data flows across the app. Also in here in not what we will do in a specific Language, this will be decided in the Architecture Phase

// If you have an important Event always put him on the top of the FlowChart, and execute him first

// REMEMBER: A FlowChart and Architecture can change during development or implementation, and they doesn't need to be perfect before you start development

// You can store data on the browser using the Local Storage API

// Async means that a certain functionality will only continue if that operataion has finished

/////////////////////////////////////////////
// Using the Geolocation API

// The Geolocation API is a very modern API, and this API will return the current Location on the World of the User.
// To use the Geolocation API you need to wirte navigator, and using dot access the geolocation Property and on this Property you call the getCurrentPosition() Method

// The getCurrentPosition() takes 2 CallBack Functions as Arguments, the first one will run when the browser was able to get the coordinates of the user, and the second the Error CallBack and it will be called when the browser wasn't able to get the user's coordinates. Also the first CallBack Function needs a Parameter that will be the position of the user's

/////////////////////////////////////////////
// Displaying a Map Using Leaflet Library

// The Leaflet Library is an external JavaScript Library that creates an mobile-friendly interactive map

// You can either download the Library or use it a Hosted Version, this Hosted Version means that this Library won't be directly coming from us, it will be linked to a server that has this Library

// To use the Hosted Version of a Library simply copy the HTML code on the WebSite an paste it on your's HTML code and it is usually on the Head

// REMEMBER: To see if your Script is before or after the Library Hosted Version, make sure that the Library is downloaded before our Script

// Usually on the WebSite of the Library that will be a tutorial or a overview of how to use that Library

// The L of the Leaflet Library is the main Property of the Library, it is like the entry name of this Library, it would be the same as the Intl on the Internationalization API. Also the L Variable is a Global Variable

// Methods of the Leaflet Library:
// map(): The map() will recieve the ID name of the HTML ELement and it will be on that Element where the map will be displayed
// // setView(): will show the position by a recieved coordinates. The first Argument will be an Array containing the latitude and the longitude in this order, and the second is the zoom of the map, it is just a number
// titleLayer(): is used to access tiles that are on a server, usually with a String that contains a URL. And this uses an open source map that contains another styles
// marker(): creates a marker, and recieves an Argument  as an Array containing the coordinates [latitude and longitude on this order] that the marker will appear

// A Variable that is Global on any Script will be availible on all Scripts of the project, that are after that Script on the HTML

/////////////////////////////////////////////
// Displaying a Map Marker

    // Display marker
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent('Workout')
      .openPopup();
  }


// Methods of the Leaflet Library:
// on(): is like an Event Listener but only for the map, the Arguments are the some of the regular Event Listener. The CallBack Function of this Method also have access to an Event Parameter, but it is the map Event
// addTo(): will add something to an Element, the map
// bindPopup(): will create a pop-up and bind it to the market, you pass a String containing the message that the pop-up will show. And You can pass another Method called popup(), this Method is attached to the L Variable.
// popup(): it will take an Object of options, see the documentation for more information
// openPopup(): will show the pop-up
// setPopuoContent(): will set the content of a pop-up, can be a String, an HTML Element

// In Leaflet we can add CSS Classes to the pop-ups

// Always see the Library's documentation to see how the Library works

// REMEMBER: Returning this on a Method will make the Method chainible

/////////////////////////////////////////////
// Rendering Workout Input Form

// To select an input directly from the Script, without the User needing to do that monually, use the focus() Method, and there is no need for Arguments in this Method

// You can reassign Varibles to have the Value of an Event that is inside a CallBack Function, this will allow you to have access to this Event anywhere you want, depending if it is a Global Variable

// REMEMBER: The defaul action of a form or a Submit Event is to reload the page. You can stop this behavior with the preventDefault() Method

// REMEMBER: You can use one line to set the Value of a lot of Elements at once. E.g el1 = el2 = el3 = ''

// The Event "change" for the addEventListener runs when a Value is changed

// REMEMBER: The toggle() will activate and deactivate a CSS Class passed as a String into the Argument and closest() will look for the closest parent DOM Element based on a String that is a selector

/////////////////////////////////////////////
// Project Architecture

// The Architecture of the project is the way the code is organized, basically is the structure of the project

// One of the most important things on the Architecture of the project is to decide WHERE and HOW the data is going to be stored

// One way to store the data is to use OOP, and create a parent Class to store the more generic data and child Classes to store more specific data

// REMEMBER: The OOP concepts

// It is very common to have a Class, usually with the name of App, that holds all the data and methods of the application on a small application

// Business logic: is a logic that only works with the underlying data

/////////////////////////////////////////////
// Refactoring for Project Architecture

// REMEMBER: You need to use the this KeyWord when you're using a Class

// REMEMBER: Sometimes you just want to make a reference to a Function and not call it, to make a reference just write the name of the Function without the ()

// A Class is just a blueprint, you still need to create an Object out of that blueprint

// Any Top-Level Function will get executed as the Script loads

// A construcotor() is called right when the Class is created nad as the page loads, so you can imediatelly call Functions there

// You can set Private Fields with #

// In a Regular Function call the this KeyWord is set to Undefined, and when using it with Classes, you'll need to bind the Method with the this KeyWord

// The bind() Method returns a new Function

// You can add Event Listeners attached to a DOM Element in the constructor()

// On a Event Handler the this KeyWord will be point to the DOM Element that is calling the addEventListener, so be carefull when you are using the addEventListener inside a Class, you can still use it but you'll have to use the bind() Method again

// REMEMBER: To watch out for the this KeyWord on a Class

// It is common to have Errors when Refactoring a code

// Sometimes you want to separate the small functionality of an app into it's own Function or Method

/////////////////////////////////////////////
// Managing Workout Data: Creating Classes

// You can create a date with the new Date()

// Every Class should have an unique ID that is going to be an identifier for when you need to access that Object

// REMEMBER: The Fields are not yet on the JavaScript language so in some browser it may not work

// We should never create the Class Ids on our own, it is better to use a Library instead

// You can get all the Properties and Method of a parent Class using the extends KeyWord

// If you extended a Class you need to pass the same Parameters which the Parent Class have and then you can add more in the contructor() Parameters. Also you need the super() Method, with the Parameters you passed into the contructor()

// You don't need to create all Properties in the constructor(), you can create then in a Method for exemple, and just return then if you need it

// There is no problem in calling a Method in the constructor(), this only means that the Method will be called imediatelly as the Script goes

// The Date.now() will return the Time Stamp of the current time

// Time Stamp is the time from the date of 1901 in mileseconds

// With a lot of users you should not create Ids based on the Time Stamp

/////////////////////////////////////////////
// Creating a New Workout

// The FlowChart is WHAT we will implement and the Architecture is HOW we will implement

// Input Validation is very important when there is user input

// REMEMBER: You can use the value Property to get the users input in a form

// REMEMBER: An input Value comes always as String

// Sometimes you only want to select a Value of an input if that input is showing

// The If/Else is not so common anymore, you will see more often 2 If Statements

// REMEMBER: A Guard Clause means that you will check for the oposite of what you're looking for, and if it's True simply return the Function

// REMEMBER: The And &&, || Or Operators

// REMEMBER: The Array Methods

// You can create small helper Functions to make the code cleaner

// REMEBER: The Rest Parameter return an Array

// You can create a Field with a Value already

/////////////////////////////////////////////
// Rendering Workouts

// REMEMBER: You can use Template Literals to create HTML Content

// You use the data Attribute (HTML) to create a bridge between the UI and the Script data

// REMEMBER: The Ternary Operator

// Using the comment prettier-ignore will make Prettier not format the next line

// REMEMBER: The String Methods

// REMEMBER: The Date Methods

// REMEMBER: The Math Methods

// REMEMBER: The DOM Manipulation Methods

// REMEMBER: The setTimout() and setInterval() Methods

// A lot of DOM Manipulation is just a game of removing and adding CSS Classes

/////////////////////////////////////////////
// Move to Marker On Click

// If you don't have the Element to attach the Event Listener yet, use Event Delegation

// REMEMBER: Event Delegation is to attach the Event Listener to a common parent Element of the one you want to add the Event and later just use the e.target to activate the Event on the Element you want

// If you want a Method to be ready right when the application loads, create this Method on the contructor() of the Class

// REMEMBER: Watch out for the this KeyWord, bind it when it is necessary

// The closest() Method is like the oposite of querySelector()

// To access a data Attribute (HTML) you need the Property called dataset and then later the name after the data-

// The find() Method will search in an Array for a certain Element

// In leaflet the Method setView() can be use to change the position of the current view, this Method is attach to the map Property. And as first Agument take an Array of the coordinates (latitude, longitude), and as second Argument is the zoom level, and as a third Argument you can pass an Object of option, go see the Leaflet documentation for more information

// You can make Objects interact with each others using the Public Interface

/////////////////////////////////////////////
// Working with localStorage

// The LocalStorage is a place in the browser that will store data even after we close the page and the LocalStorage is an API of the browser

// All of the Methods to use LocalStorage will be attched to the localStorage Property

// setItem(): is used set a key (Id) to a Value, the first Arugument is a String containing the name (key), and the second is the Value to be stored that is also a String, the String Value is going to be associated with the Key

// The JSON.stringify() will convert any JavaScript Object into a String, the Argument is the Object to be coonverted. And this Method can be used together with the LocalStorage

// Only use LocalStorage for small amounts of data

// You can see the LocalStorage on the browser by going in the Application tab on the Inspect menu

// The getItem() Method will grab the LocalStorage data, it will recieve a Key that is a String as Argument, this Key is one of the Keys that was given when using the setItem

// You can set multiple items in the LocalStorage

// The JSON.parse() Method will take a String as Argument, and will transform this String into an Object

// Before getting the data from LocalStorage first you check if there is any data in the LocalStorage

// REMEMBER: It is a really good practice to create Methods and Function no matter how small the functionality is, this will make it easier to reuse functionality

// REMEMBER: JavaScript code is read in a inline format, so becarefull because a Value may not be defined yet but a Method may need this Value

// When using LocalStorage with OOP concept, the Prototype Chain between the Object will be lost when the LocalStorage get the Items

// But you can use OOP and LocalStorage, it is just a little bit of work to get it running properly

// Objects coming from LocalStorage will not inherit the Methods from the Prototype Chain

// It is not a good practice to have console.log() in the final code

// removeItem(): will remove the item with the same Key String passed into the Method as Argument, the Argument must be a String with the name of a Key associated with a Value

// You can reload the page through JavaScript with the location.reload() Method, this Method doesn't take any Argument

// The location is a big Object that contains a lot of Method and information that cna help to manipulate the browser
*/
/////////////////////////////////////////////
// Final Considerations

// You can try to improve this application by implementing more Features
