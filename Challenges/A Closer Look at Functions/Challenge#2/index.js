/*
This is more of a thinking challenge than a coding challenge 🤓
Your tasks:
1. Take the IIFE below and at the end of the function, attach an event listener that
changes the color of the selected h1 element ('header') to blue, each time
the body element is clicked. Do not select the h1 element again!
2. And now explain to yourself (or someone around you) why this worked! Take all
the time you need. Think about when exactly the callback function is executed,
and what that means for the variables involved in this example.
GOOD LUCK 😀
*/

(function () {
  const header = document.querySelector("h1");
  header.style.color = "red";

  document.querySelector("body").addEventListener("click", function () {
    header.style.color = "blue";
  });
})();

// <---- MY SOLUTION ---->

// After the IIFE is called, the Execution Context is created and all the Variable in the Variables Environment are created too. After the IIFE finishes running, the IIFE is removed of the Call Stack. The Body is waiting for a Click Event, and the Call Back Function inside the Event is getting the Variables from the CLosure that happened in the IIFE, because a Call Back Function in a Event Handler always point to the Scope Chain that created (or called) the Function, and in this case it is the IIFE. Which the Call Back Function will keep a connection with the IIFE Variables even after the IIFE finished running

// <---- JONAS SOLUTION ---->

// Answer: ALl this happen because of Closure
// By the time the Call Back Function in the Event Listener is called, the IIFE has already executed and the Execution Context of the IIFE is also gone. But even if the Variable Environment is gone the Call Back Function is still able to access the Variables in the Variable Environment that the Function was created
