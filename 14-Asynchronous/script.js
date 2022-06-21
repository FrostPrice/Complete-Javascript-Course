'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
        <article class="country ${className}">
            <img class="country__img" src="${data.flag}" />
            <div class="country__data">
                <h3 class="country__name">${data.name}</h3>
                <h4 class="country__region">${data.region}</h4>
                <p class="country__row"><span>👫</span>${(
                  +data.population / 1000000
                ).toFixed(1)} people</p>
                <p class="country__row"><span>🗣️</span>${
                  data.languages[0].name
                }</p>
                <p class="country__row"><span>💰</span>${
                  data.currencies[0].name
                }</p>
            </div>
        </article>
        `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errroMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errroMsg} (${response.status})`);

    return response.json();
  });
};

///////////////////////////////////////
// Lectures

/*
///////////////////////////////////////
// Asynchronous JavaScript, AJAX and APIs

// Synchronous code is the code that is executed line by line, in the order they were written. And each line of code will wait for the previous line of code to finish executing. The down side of using this type of code is that in long-running operations can block the code execution

// The Execution Thread is part of the Execution Context, that will execute the code in the computer's CPU

// Asynchronous code or async is the code that is executed after a task that is in executing or even waiting in the background finishes loading, running, or the timer is reached. This type of code will never block the execution, and also will not wait for the previous async line to finish running

// The Async code may be the last to finish executing, meaning that it may end running after the synchronous code, despite if the Async code is before the synchronous code

// Basically Async code means to coordinate a behaviour of a program over a period of time

// Every Function that is Async recieves a CallBack Function, but not all Functions that have Callback Functions are Async

// CallBAck Functions does not make the code Async

// Setting the src of a image is Async, and when the image finishes loading a 'load' Event is triggered by JavaScript, you can use this 'load' Event in an Event Listener. And also this 'load' Event is Async

// When you listen for an Event, even if it is the load Event, this is not Async, now loading an image on the background it is Async

// Event Listener does not make the code Async automatically

// AJAX (Asynchronous JavaScript And XML): with AJAX we can communicate with a remote web server in a Async way. By using AJAX calls, you can request data from a web server dynamically

// Browser === Client

// Basically with AJAX you can request (ask for data) from the CLient to an web server and then the web server will give a response (send the data back) to the client, and all this happens in a Async way

// You can also set, get , etc... data in a web server if you want

// Web Servers usually have an API, and this API may have the data we are asking for

// API (Application Programming Interface): this will allows applications to talk with each other, basically is a piece of software used in another piece of software

// There are a bunch of APIs in web development, like: DOM API, Geolocation API, own Class API, 'online' API

// You can implement a small API on a Class, to make some Methods availible in the Public Interface

// 'Online' API is an application running on a web server, that will recieve a request for data, and will also send this datat back as a response. This 'online' API can also be called API or web API

// We can build our own API, but it will be necessary a back-end development or 3rd-party APIs

// There are APIs to just about anything

// XML is a data format that was very popular to transmit the data on web, but XML is not used anymore. Now it is more common to see APIs using the JSON data format

// JSON is basically a JavaScript Object converted into a String

///////////////////////////////////////
// Our First AJAX Call: XMLHttpRequest

// There are multiple ways to do AJAX calls

// To create a AJAX call you need the new KeyWord and then you call the XMLHttpRequest() function
// OBS: Using XMLHttpRequest() is an old way of doing AJAX calls
const request = new XMLHttpRequest();
// Now with the Object to use AJAX ready, you simply use the Methods you need
// The open() Method will make the AJAX call. As a first Argument it will recieve a String containing the type of AJAX call, a 'GET' will ask for data, and the second Argument will be a String with the URL of the web server containig the API you want
request.open('GET', 'https://restcountries.eu/rest/v2/name/portugal');

// You can search on GitHub for Public APIs, this is a repository that contains a lot of free APIs for you to use

// CORS stands for Cross Origin resource Sharing, ad without his we will not be able to access the 3rd-party API from our code

// All APIs that we uses need to have the CORS opitions to either unkwown or yes

// The API Endpoints is another name for the URL that we need

// After open the request for the URL using the open() Method, now you need to send the request to do this use the send() Method
request.send(); // After this finishes a load Event will run
// console.log(request.responseText); // This won't work

// Now after sending the request you need to listen for a load Event on the AJAX call, this need to be done because the data is not there yet (Async), so only after the data loads we can use it
request.addEventListener('load', function () {
  // Now you have the data, and to see the data you access the responseText Property on the AJAX call
  const [data] = JSON.parse(this.responseText);
  console.log(data);

  // Since the AJAX call will return a JavaScript Object you can access this Object Properties, as you would with an Object that you created yourself
  const html = `
    <article class="country">
        <img class="country__img" src="${data.flag}" />
        <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies[0].name
            }</p>
        </div>
    </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
});

getCountryData('portugal');
getCountryData('usa');
getCountryData('germany');

// REMEMBER: The this KeyWord an a Event Listener will point to the ELement attach to the Event Listener

// REMEMBER: The AJAX call will return a String that can be converted into a JavaScript Object using the JSON.parse() Method. And this Object can be inside an Array so just remove it if necessary

// REMEMBER: Of Destructuring

// REMEMBER: With an AJAX call some of the Numbers may be String you need to convert them, you can do this by simply putting a + in front of the Value

// REMEMBER: The DOM Manipulation Methods

// If there is multiples AJAX calls they will finish in different times, thus showing in a unexpected or different result

// Now if you want the results of a AJAX call to be in certain order, you would need to chain the requests, this will make so that the second request only start after the first finishes

///////////////////////////////////////
// [OPTIONAL] How the Web Works: Requests and Responses

// The Request and Response of a Web API work always the same way, and this process is called Request-response model or Client-server architecture

// An URL always get an HTTP or HTTPS (protocol, use in this connection), the domain name (name of the website link), resource (is waht you want to access in the site)

// 1. The domain name is only a easier way for us to remmeber the site name, now this name will be converted through a DNS (Domain Name Server) to the real address of the server

// The Client will convert the Domain Name with the DNS, and this will happen through the internet provider, and after the DNS converted the Domain Name to the real IP address then we can call it

// The real address has the protocol, the IP Adress and the port we access on the server (HTTPS = 443, HTTP = 80 ), the port will identify a specific service that is running on a server and has nothing to do with the resource

// 2. After the real adress is collected,a TCP/IP socket conection is created between the Client and the server

// TCP is the Transmition Control Protocol, and IP is the Internet Protocol, and together they define how data travel throughout the internet

// 3. Then after the 1., 2. steps are ready, then a HTTP Request is created

// HTTP is Hyper Text Transfer Protocol

// A communication protocol is a systems of rules that allows 2 or more parties to communicate

// The request will have a HTTP Method (get/post/put/patch/etc), request target (resource), HTTP version. Then it will have the HTTP Request Headers that is just some informations about the request itself. Also if you're sending data that will be a request body, and this body will have the data we are sendong

// The difference between the HTTP and HTTPS is that HTTPS is encypted using TLS or SSL (these are more protocols), HTTP logic of request will be the same for HTTPS

// 4. After the server get the data that we want, then he will send us a HTTP response

// HTTPS response will look almost the same as the HTTP request, it will have a HTTP version, a status code, and a status message (this is used to let the CLient know if the request was sucessfull or not, 200 = OK, 404 = error). Then there is the information header, containing data about the response itself. And there is also a body that will have the JSON data or the HTML of the page

// All these steps are for access an API and not a web page

// Now for web pages, there is going to be the same steps but with some additional ones
// 5. In the first request we only recieve the HTML file, then the Client will scan the HTMl for the files that it needs (JS, CSS, etc), and then for each file an HTTP request is made to the server

// The job of the TCP is to break the request and responses into a bunch of small packets, after all the packets reaches destination the TCP will reassemble into the original request or response

// The IP job is to send and route the packets through the internet
*/
///////////////////////////////////////
// Welcome to Callback Hell

/*
const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;
    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

// getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

// To chain AJAX calls you simply create another AJAX call inside the CallBack Function of the load Event in the previous AJAX call. Jsut remember to write different names for the AJAX calls

// CallBack Hell is when you have CallBack Functions inside of CallBack Functions, but it is a LOT of CallBAck Functions. Basically is when you have a LOT of nested CallBack Functions to executed Async tasks in sequence

// The CallBack Hell can happen with all Async Functions and not only with AJAX calls
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 second passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

// You can identify CallBack Hell by looking at the identention of the code, if it is in a triangular shape we have CallBack Hell

// CallBack Hell makes the code messy, hard to maintain, and very difficult to read and understand

// REMEMBER: Bad code is the code that you can NOT understand

// You can escape the CallBack Hell by using the ES6 Feature called Promises
*/
///////////////////////////////////////
// Promises and the Fetch API

// Promises are a ES6 Feature

// const request = new XMLHttpRequest();
// request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
// request.send();

// The modern way of doing AJAX calls is by using the fetch API. The fetch Method only needs one Argument that is the URL of the server to work, but if you need more complex AJAX calls you can take an Object of options
// const request = fetch('https://restcountries.eu/rest/v2/name/portugal');
// // When using the fetch API a promise is return when you make the AJAX call
// console.log(request);

// A Promise is an Object used as a placeholder for the future result of an Async operation. Basically a Promise is a container for a future Value

// A future Value can be a reponse for an AJAX call

// By using Promises we no longer need CallBack Functions and Events to handle Async results
// Also you can chain Promises to create a sequence of Async operations, this will end with the CallBack hell

// Promises are time sensitive, so they change over the time and they can be in difent states

// Promise lifecicle:
// 1. Pending: before the future Value is available. The Async still working on the background
// 2. Settled: after the task has finished. And there are 2 type of Promises, fulfilled: is a Promise that was successfull in accessing the Value, and now this Value is available; rejected: is a Promise that failed the Async task, meaning that an Error happened

// We can handle the different states of a Promise, these states are the fulfilled and rejected

// Also a Promise is only settled once

// We Build the Promise so that later we can consume the same Promise, e.g the fetch API
// We Consume a Promise when we already have a Promise. This is used to get an result

// Most of the time we only consume a Promise

///////////////////////////////////////
// Consuming Promises

// To handle the fulfiled state of a Promise you can use the then() Method, that is attached to the Promise, which can be the fetch() Method or a Variable

// In the then() Method, you will pass a CallBack Function that will be executed when the Promise is fulfilled. Also this CallBack Function will recieve a Parameter, that is the Value of the Promise, after this Promise is fulfilled

// const getCountryData = function (country) {
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(function (response) {
//       console.log(response);
//       // To be able to use the Value in the body of a Promise you need to call the json() Method, and this Method will convert the Value into a JavaScript Object, but also in a new Promise, and you will need to return this new Promise
//       return response.json(); // This Method needs to be attached to the Parameter of the CallBack Function of the then() Method
//     }) // After return the new Promise you'll have to handle that Promise, to do that just use the then() Method again, this Method can be chained
//     .then(function (data) {
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// const getJSON = function (url, errroMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errroMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.eu/rest/v2/name/${country}`)
//     .then(response => {
//       console.log(response);

//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       // const neighbour = data[0].borders[0];
//       const neighbour = 'jkfdsjklahskj';

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);

//       // DON'T DO THIS
//       // fetch(
//       //   `https://restcountries.eu/rest/v2/alpha/${neighbour}`
//       // ).then(response => response.json());
//     })
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);

//       return response.json();
//     })
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
/*
const getCountryData = function (country) {
  // Country 1
  getJSON(
    `https://restcountries.eu/rest/v2/name/${country}`,
    'Country not found'
  )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
        'Country not found'
      );

      // DON'T DO THIS
      // fetch(
      //   `https://restcountries.eu/rest/v2/alpha/${neighbour}`
      // ).then(response => response.json());
    })
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});
*/
// getCountryData('australia');

// REMEMBER: The fetch() Method will return a Promise

// In a Promise the Value that we want will be in the Body of the Promise

// REMEMBER: Your code needs to be easy to understand

// REMEMBER: Promises does NOT get rid of CallBack Functions, but they do get rid of the CallBack Hell

///////////////////////////////////////
// Chaining Promises

// If you need a AJAX call that depends on another AJAX call simply use the fetch() Method again inside the CallBack Function of the then() Method that gets the Value (body) of the AJAX call, and then you return this AJAX call, after all this is done then you finally use the then() Method after the previous then() Methodm you simply chain then with a dot (.)

// The then() Method always returns a Promise, no matter what. But if you return a Value that Value will become the fulfillment Value of that Promise

// Instead of CallBack Hell, with Promises you get a Flat Chain of Promises

// REMEMBER: Always return the Promise and then handle it outside, and continue the chain of Promises

///////////////////////////////////////
// Handling Rejected Promises

// An important part of Web Development is to handle Errors

// There are 2 ways of handling the rejection (failure) of a Promise:
// The first way is to add another Callback Function as second Argument in the then() Method. And this Function has one Parameter that is the rejection (Error) itself
// The second way is better because you handle all Errors in a Global way, at the end of the Promise chain you add the catch() Method, and this Method will take care of the rejected Promises to the entire chain that he's attached to. This Method recieve a Callback Function with the rejected Promise as Argument

// Handling the Error is also called catching the Error

// After you handle the rejected Promise the Error on the console.log will disapear: 'Failed to fetch'

// Erros propagate down the chain and only stops when they are cought

// REMEMBER: There's console.error()

// In the real-world you need to tell the user that something went wrong

// The insertAdjacentText() Method works the same way as the insertAdjacentHTML() Method but with only text and not Elements

// Errors created in JavaScript are Objects, and this Object have the message Property, what will only print the message of the Error

// The finally() Method will take a CallBack Function as Argument, and this CallBack Function will be executed when the Promise is either fulfilled or rejected, basically this Function is called always

// The finally() Method is used whenever we need something from the Promise

// The catch() Method also returns a Promise

// The Stack Trace will show where the Errors are coming from in the console

// The fetch() Promise only rejects a Promise with there is no internet connection

///////////////////////////////////////
// Throwing Errors Manually

// To create an Error manually you can check if the Property 'ok' of the first then() method of the fetch() Method is True, if is not True then you can use the throw KeyWord and then create a new Error()

// You can create an Error manually by using the new Error() Constructor, this Construcotr will take an String as Argument this String will be the Error message

// The throw KeyWord will imediatelly terminate/ends the Function

// By throwing a Promise the fetch() will be reject, and then this rejection will propagate down until it reaches the catch() Method

// If any then() Method return a rejected Promise, this rejection will propagate down to the catch() Method, to be handled

// REMEMBER: Always handle the Errors with either catch or throw this Errors manually

// You can create a Helper Function to not repeat a lot of stuff while using Promises, like when you need to convert the Promises with the json() Method, etc

// REMEMBER: When creating a Helper Function for Promises you need to return all Promises in that Function

// REMEMBER: If you want that an Error is handled on the catch() Method simply throw a new Error on that Promise

///////////////////////////////////////
// Asynchronous Behind the Scenes: The Event Loop

// REMEMBER: To convert the Promises with the json() Method

// REMEMBER: You can make an AJAX call inside another AJAX call

// JavaScript run-time review:
// The run-time is a container that have all the necessary components to run JavaScript code
// The Engine is the main component of JavaScript. All the code is executed in the Call Stack, and the Objects are stored in the Memory Heap

// REMEMBER: JavaScript can only do one thing at a time, this is called one thread execution

// The Web APIs is provided to the Engine by the browser, but is not part of the Engine itself

// The CallBack Queue stores all the CallBack Functions that are ready to execute, e.g coming from an Event

// When the CallStack is empty the Event Loop will take the CallBacks from the CallBack Queue to the CallStack for them to be executed

// The Event Loop is the reason why we can do Async code in JavaScript, meaning that it has non-blocking concurrency model

// Concurrency Model: is how the language hadle multiple tasks that is happening at the same time

// REMEMBER: Setting the src Attribute in a Image will make JavaScript load the image in a Async way.

// The DOM is part of the Web APIs and all the Async code related to the DOM will run in the Web APIs section, and this is valid for all the others APIs too and also all the Async tasks that happen in the code

// REMEMBER: It is better to load an Image in a Async way

// If you need to do something after the Async task finishes you'll need to listen for the load Event, and the CallBack Fucntion of the load Event will be stored in the Web APIs section where it will wait for the Event to fire. Also this Execution Context of this Event is on the CallStack

// Basically all the CallBack Functions of an Async code will be stored in the Web APIs section, this will avoid blocking the Execution Context of others lines

// After one Event fire, the CallBack Function, that is on Web APIs, will be taken to the CallBack Queue

// REMEMBER: The CallBack Queue is an ordered list of CallBack Functions that are inline to be executed, and this CallBack Functions are tasks that the CallStack will be doing. Also the CallBack Queue is listed by arrival order, meaning that the first who arrived will be the first to be executed

// The CallBack Queue also have the CallBack Functions coming from DOM Events, but they are not Async code

// The Event Loop will look into the CallStack, and if the CallStack is empty, it will still have the Global Execution Context, then the Event Loop will take the first CallBack Function in the CallBack Queue and bring it to the CallStack for execution, this is called an Event Loop Tick

// Basically the Event Loop do the coordination of the Call Stack and the CallBack Functions of the CallBack Queue. Or the Event Loop decides when each CallBack is executed, also called Orchestration

// The CallBack Function of a promise does not go into the CallBack Queue, but instead it will go to a special queue called the Microtasks Queue
// The Microtasks Queue has priority over the CallBack Queue, basically the Event Loop will run all the CallBack Functions inside the Microtasks Queue before the CallBack Queue. And it will only run the Microtasks if the CallStack is empty and doesn't matter if the CallBack Queue is empty or not
// Also the CallBack of the Promises are called Microtasks

// If a Microtask creates another Microtask, then the new Microtask will be executed before the Callback Queue, and this can go on forever and basically make that the CallBack Queue never runs

// REMEMBER: The Event Loop will give priority to the Microtasks Queue
/*
///////////////////////////////////////
// The Event Loop in Practice

// The order of the execution will be: 'Test start',  'Test end', Promise, '0 sec timer'. The 2 Top-level code have priority over all the entire code, the Promise (Microtasks Queue) has priority over the Timer (CallBack Queue)

// Top-level code is code on the Global Scope, or code that isn't inside a CallBack Function

console.log('Test start');
setTimeout(() => console.log('0 sec timer'), 0);
Promise.resolve('Resolved promise 1').then(res => console.log(res));

Promise.resolve('Resolved promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end');

// Promise.resolve() allow us to create a Promise that is imediatelly resolved, basically that is imediatelly fulfilled

// REMEMBER: The CallBack Queue will only run after all the Microtasks Queue is done running all the code, and this can make the Timers Methods not run in the actual setted timer

// REMEMBER: You cannot make high pricision things with JavaScript Timers, this is more applied when you're working with Promises and Timers
*/
/*
///////////////////////////////////////
// Building a Simple Promise

// You can create Promises with the new Promise() Constructor, this Constructor will take 1 Argument, that is the Executer Function, and you can consume this Promise later with the then() Method
// The Executer Function will run as soon as the Promise is created. This Executer Functions take 2 Parameters the resolve and the reject. And the Executer Function will have the Async code that we want to dp with the Promise, basically it is the future Value of the Promise
// The 2 Parameters in the Executer Function is the Functions for the fullfilled and rejected Values of the Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // You can use the resolve() Method for the fulfilled (successfull) Promises. And inside the Method we pass the successfull Value, and this Value will be available in the then() Method
      resolve('You WIN 💰');
    } else {
      // The reject() Method will run if the Promise is rejected (failed), and the Value you pass in is the Error Message that is going to be handled in the catch() Method
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// REMEMBER: To consume a Promise use the then() Method and the catch() Method to handle Errors

// Most of the time we only consume Promises, we only create Promises to wrap old CallBack Functions
// Promisifying: Is the action to convert CallBack based Async Functions into a Promise basesd Async Functions

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    // It is not a mandatory thing to add a Value to the resolve() Method of the Executer Function
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 second passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

// If a Promise is never going to fail (reject) there is no point in using the reject() Method in the Executer Function

// You can create a Function that returns a new Promise each time it is called, by doing this you can chain Promises without the fetch() Method. Also with this Function you can create Timers between Promises without the CallBack Hell

// You can create either a imediatelly resolved or imediatelly rejected Promise with the resolve() and reject() Methods, this Methods are attached to the Promise Constructor
Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/
///////////////////////////////////////
// Promisifying the Geolocation API

// REMEMBER: The geolocation API is attached to the navigator nad its called geolocation, and to get the user position use the getCurrentPosition() Method
// The getCurrentPosition() Method take 2 Callback Functions, the first is the success while retrieving the user location and the second is the failure
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// The Geolocation API is Async, and you can Promisify it
// And to do that simply create a new Promise that holds the Geolocation API inside the Executer Function, and then on the API you create the CallBack Functions normaly with teh only difference that you are going to return the resolve with the position and the reject with the Error. Or you can simply pass the resolve and reject as a reference in the getCurrentPosition() Method, and then later you handle the resolve and reject with the then() and catch() Method

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Problem with geocoding ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}`);

      return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(response => {
      if (!response.ok)
        throw new Error(`Country not found (${response.status})`);

      return response.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`Something went wrong ${err.message}`))
    .finally(() => (countriesContainer.style.opacity = 1));
};

btn.addEventListener('click', whereAmI);

// REMEMBER: While changing the name of a Property when Deconstructuring, use the : and then the name you and the Property to have

// You can proisify an Image loading or the XMLHTTPRequest()
///////////////////////////////////////
// Challenge #2

const imgContainer = document.querySelector('.images');

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

let currentImg;
createImage('./img/img-1.jpg')
  .then(img => {
    currentImg = img;
    console.log('Image 1 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
    return createImage('./img/img-2.jpg');
  })
  .then(img => {
    currentImg = img;
    console.log('Image 2 loaded');
    return wait(2);
  })
  .then(() => {
    currentImg.style.display = 'none';
  })
  .catch(err => console.error(err));
*/
///////////////////////////////////////
// Consuming Promises with Async/Await

// REMEMBER: There is a Load and an Error Event, and these Events can be usefull with Async code

// The Async/Await is an ES2017 Feature

// A Async Function is a Function that runs in the background while doing the code that's inside of it. And when this Function is finished, it will automatically return a Promise

// You can create Async Functions by simply adding the async KeyWord before the Function Constructor
/*
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res =>
// Country data
//   console.log(res)
// );

const whereAmI = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;

    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!resGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await resGeo.json();

    // Country data
    // Inside of this type of Function you can have the await Statement, this await Statement willcome before a Promise. This Statement will 'wait' for the Promise (future Value), basically it will stop the execution of this code until the Promise is fulfiled
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    ); // The result of the await Statement will be the resolved Value of the Promise, you can store this Value on a Variable
    if (!res.ok) throw new Error('Problem getting country');

    const data = await res.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// const city = whereAmI();
// console.log(city);

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message}`);
  }
  console.log('3: Finished getting location');
})();

// Stop executing the code in a Async Function is no problem at all, because it will not stop the main thread of execution

// REMEBER: The Async/Await is just a hidden then() Method and Promises

// REMEMBER: You need to use the json() Method when you get a response from a server. And now you can use the await Statement

// Async/Await is only about consuming Promises and has nothing to do with creating Promises, the creating keeps the same

///////////////////////////////////////
// Error Handling With try...catch

// When can't use the catch() Method on a await Statement, but instead we use a try...catch Statement

// try...catch has nothing to do with Async Functions, it is a Feature that has be around since the begining of JavaScript

// You can create a try Block, and JavaScript will try to execute the code and if an Error happened during this execution the catch Statement will handle the Error
// To create use the try Statement simply write the try KeyWord and then create a Block, and then after the try Block, you use the catch KeyWord and create another Block
// try {
//   let y = 1;
//   const x = 2;
//   y = 3;
// } catch (err) {
//   alert(err.message);
// }
// The catch statement will have access to 1 Parameter that is the Error itself, and then later you can use this Error Parameter to do whatever you want with the Error

// REMEMBER: Errors have access to the message Property

// You can use the try...catch Statements in a Async Function

// You can throw Error manually in Async Functions too, just keep in mind that you'll need to throw Errors inside the try Statement and use the if Statement too

// REMEMBER: The fetch() Method doesn't classify some Errors like we do, basically the fetch() Method will only give an Error if the conection is lost with the server, because of that you'll need to create Errors manually

// REMEMBER: To always handle Errors, especially in a Async Function

///////////////////////////////////////
// Returning Values from Async Functions

// REMEMBER: An Async Function will always return a Promise

// The Value returned by an Async Function will be the fulfilled Value of the Promise. And since the Async Function returns a Promise, you can use the then() Method on that Promise

// If you return a Value from an Async Function and the Promise is rejected (failed), the Value will still be return but as Undefined, and the then() Method may still execute the code with an Undefined Value, even if there is the catch() Method
// Basically event if there is an Error in the Async Function, the Promise would still be fullfiled, and to fix this you can rethrow the Error

// You can rethrow the Error by simply using the throw KeyWord inside the Block of the catch Statement, and after that the Error Parameter of the Statement, this will make the Promise be reject manually

// REMEMBER: The finally() Method of the Promise, this Method will fire no matter what

// If you want something that isn't Async to run after an Async code simply use the finally() after the catch() Method

// You can only use the await Statement inside an Async Function, but if you don't want to create a new Function simply use an IIFE (Imediatelly Invoked Function Expresion), but write the async KeyWord before the function
// (async function () {})();

// REMEMBER: To create an IIFE you need to write the Function Expression inside a () and the Function cannot have a name, and after the () you call the Function with another ()

// If you're using the try...catch Statement, you can write code outside these Statements so that the code is always executed either after or before the Statements

// It is common to have Async Functions calling others Async Functions and returning Values between them

///////////////////////////////////////
// Returning Values from Async Functions

const get3Countries = async function (c1, c2, c3) {
  try {
    // const [data1] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.eu/rest/v2/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);

    const data = await Promise.all([
      getJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      getJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.log(err);
  }
};

get3Countries('portugal', 'canada', 'tanzania');

// REMEMBER: With an Async Function always use the try...catch Block Statements

// In the real-world you would not simply log to the console the error

// An await Statement will wait for the previous awiat Statement to finish running, but you can change that by making the Promises run in parallel

// To make the Promises run in parallel you need to use the Promise.all() Method, also called combinator Function and this Method is a static Method of the Promise Object
// The Promise.all() Method takes an Array of Promises, and it will return 1 Promise that will run all the Promises in the Array at the same time, and then later you can use the await Statement and all other concepts of Promises, and by the end it will return an Array as fulfilled Value, and now all Array Method works too

// Now if one Promise that is inside the Promise.all() Method is rejected then the entire Method (Promise.all()) will be rejected

// REMEMBER: If you need to do multiples Async code that doesn't rely on others Async code then always run the in parallel using Promise.all()

// You can also handle the Promise.all() resolved Value with the then() Method

// It is called Combinator because it combine (join) multiple Promises

///////////////////////////////////////
// Other Promise Combinators: race, allSettled and any

// All Promise Combinators recieve and return a Promise

// Promise.race
// The Promise.race() Method will return a settled Promise as soon as one of the input Promises are settled. And keep in mind that is only the result of one of the Promises that we get from the Promise.race() Method
// If the settled Value of the input Promise is fullfiled then the Promise.race() Value will be the Value of the fullfiled Promise, but it is the Value of the first settled Promise. And it will also return a Promise with the Value rejected
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

// REMEMBER: Settled can either be fullfiled or rejected

// Promise.race() is very usefull to prevent never ending Promises or long running Promises
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// REMEMBER: The throw away Variable convention (_)

// Promise.allSettled (ES2020)
// The Promise.allSettled() Method take an Array of Promises and return an Array of all the settled Promises, no matter if the result of the Promises are fullfilled or rejected
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

// REMEMBER: The Promise.resolve() and Promise.reject() Methods

// REMEMBER: The Promise.all will return an Error if at least one of the Promises are rejected
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
// The Promise.any() Method takes an Array of Promises, and it will return the first fullfiled Promise, unless all of then are rejected Promises, and it will ignore rejected Promises
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Error'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/

// REMEMBER: You can create Async Function inside of Async Functions, and also you can create Async CallBack Functions

// REMEMBER: An Async Function always returns a Promise

// REMEMBER: You need to return the Promise if you loop over other Promises, and you can use Async/await inside a Callback Function
