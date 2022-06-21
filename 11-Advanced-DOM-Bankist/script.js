'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();

  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibligns = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibligns.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Pasing "argumnet" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function () {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });

// Sticky navigation: Intersection Observer API

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // const slider = document.querySelector('.slider');
  // slider.style.transform = 'scale(0.4) translateX(-800px)';
  // slider.style.overflow = 'visible';

  // slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
  // 0%, 100%, 200%, 300%

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  // curSlide = 1: -100%, 0%, 100%, 200%
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    console.log(e);
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/*
///////////////////////////////////////
// PROJECT: "Bankist" Website

// A lot of effects that some websites have is all created with the help of JavaScript

// If a link has a hash (#) on the href attribute, this make that that the page scroll all the way up of the page. This is the default functionality of the link

// A Node List has access to the forEach() Method

///////////////////////////////////////
// How the DOM Really Works

// The DOM is the interface between JavaScript and the Browser, or the HTML render in and by the Browser

// The DOM allow us to mkae JavaScript interact with the Browser

// A DOM Tree is created from an HTML file, and because of that we can interact with the HTML file

// The DOM Tree is a tree structured created of Nodes

// The DOM is a very complex API which contains a lot of Methods and Properties that we can use to interact with the DOM Tree

// API = Application Programming Interface

// There are different type of Nodes, some Nodes are HTML ELements, while others are just texts

// The DOM is made out of Nodes and this Nodes are represented in JavaScript by an Object, and this Object gains access to Methods that allows you to manipulate this Object (Node)

// This Node can have 4 Type of children that are also Nodes: an Element Type (is the tag itself), a Text Type (is the text inside the tag), a Comment Type (is the HTML's comment), and a Document Type (is the page itself). All this 4 types are also Object, which will have Methods and Properties to interact with

// Everything on the HTML has to go into the DOM as well, including the comments

// The Element Type has a HTML Element child Type, which in this child Type will have another child Type for each ELement in the whole HTML. This happens because the DOM wil have a way of telling which Element has a certain atribute

// The DOM really works is the Inheritance, and this means that all child Types will have access to their parents Node Type Properties and Methods

// The Document Type is just another Type of Node

// The ELement Type has access to the querySelector() Method, just like the Document Type

// The Event Listeners work because there is a special Node Type, the EventTarget Type, and this EventTarget Type is the Parent Type of the Node Type itself and the Window Node Type. And we do NOT create this type ourselves

// The Window Type is a Global Object

///////////////////////////////////////
// Selecting, Creating, and Deleting Elements

// Selecting elements
// The document.documentElement will select all the HTML file, this works because of the documentElement
console.log(document.documentElement);
// You can select the head of the HTML with document.head
console.log(document.head);
// You can select the body of the HTML with document.body
console.log(document.body);

// REMEMBER: The querySelector('.for classes, and # for IDs') only select the first Element with that class, Id, or tag
const header = document.querySelector('.header');
// If you want to select all ELement with a class, Id, or tag use the querySelectorAll(''), and this returns a Node List with all Elements
const allSections = document.querySelectorAll('.section');
console.log(allSections);

// You can also use the querySelector and querySelectorAll in a Node Element Type, this can be used to select a child Element

// With the getElementBy...('') you don't need the selector . or # because the Method will already point for a class or id. E.g: getElementById
// The getElementById('') will return one Element with that Id
document.getElementById('section--1');
// The getElementsByTagName('') will return all the Tag Elements with that name. This Method return a HTMLCollection, this a so called live collection, which means that will automatically change as the DOM changes
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

// A NodeList does NOT changes itself autamically, unlike the HTMLCollection

// The getElementsByClassName("") will return a HTMLCollection with all the Elements in the DOM with that class name
console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
// .insertAdjacentHTML // This Method will take 2 Arguments, one is the content that you want to add to the HTML and the other is where you want to add the content ('beforebegin', "afterend", etc)

// You can create ELements from scratch with the createELement('') Method, this return a DOM Element, that can be stored in Variable
const message = document.createElement('div');
// You can add a Class to a DOM Element with the classList.add('') Method, the classList needs to be attatched to the DOM ELement. And an Argument this will take a String with the name of the class
message.classList.add('cookie-message');
// With the textContent Property you can set a text inside a DOM Element
// message.textContent = 'We use cookies for improved functionality and analytics';
// With the innerHTML Property you can set HTML tags inside a DOM Element
message.innerHTML =
  'We use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// The classList Object has a lot of Properties that allows you to manipulate classes

// The prepend() Method will insert a DOM ELement inside the DOM Tree or the HTML file before all the others child Nodes inside the DOM ELement attatched to the Method
// header.prepend(message);
// The append() Method will add a DOM Element as the last child of a parent Element
header.append(message);

// You cannot insert Elements that are live Elements, because they will simply change the position, they cannot be on 2 places at the same time

// You can use the prepend() and append() Methods to move the DOM Elements too

// You can make a copy of an Element with cloneNode(), this Method is attached to the DOM ELement you want to clone, and also you can pass a Argument of true to this Method if you want it to also copy the child Elements of that DOM ELement
// header.append(message.cloneNode(true));

// The before() Method will insert the Element, in the Argument, before the Element attached to the Method. This Element added will be a sibling and not a child of the attached Element
// header.before(message);
// The after() Method will insert the Element, in the Argument, after the Element attached to the Method. This Element added will be a sibling and not a child of the attached Element
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

// To delete an Element use the remove() Method, this Method will delete the Element that is attached to and its child Elments too. And also there's no need for passing and Argumnet

// You can go up in the tree of one Element with the parrentElement Property
// You can also remove a child Element with the removeChild() Method, this Method will take as Argument the child Element you want to delete

///////////////////////////////////////
// Styles, Attributes and Classes

// Styles
// You can set Styles on DOM Elements directly with the style Property, and after the style Property a dot and the name of the style you want to apply and then = to the String Value you want. This Properties need to be in camelCase
message.style.backgroundColor = '#37383d';
message.style.width = '120%'; // You need to specify the Unit of some CSS Properties too

// This Style is all inline Style, meaning that you're not add this Properties to a separate file, you're just setting then directly in the Element

console.log(message.style.color);
console.log(message.style.backgroundColor);

// Using this inline Style you cannot access a Property that wasn't defined, doesn't exists or is inside a Class, but however you can access Properties that you manually created with the Style Property

// If you really need to get a CSS Property of an Element you can use the getComputedStyle() Function. This Function will take as Argument the Element that you want to get the Styles from and after the () add a dot and then the name of the Property you want to see of that Element
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// REMEMBER: You can use parseFloat() or parseInt() to get only the Numbers in a String

// CSS Customs Properties are also called CSS Variables. Is the same ideia of the JavaScript Variables, it is so that we can change some Values of some CSS Properties in a lot of places of our code, in only one line

// The CSS Element :root is the as the Document Element in JavaScript

// With the setProperty() Method you can reassign a CSS Property Value. This Method will take 2 Argument that are both Strings, the first is the name of the CSS Property, and the second is the Value that you want this CSS Property to have. This Method is attached to the style Property
document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributes
// Attibutes is everything that makes some HTML Element work, like a class, src, href, and so on. And you can manipulate this Attributes in JavaScript

const logo = document.querySelector('.nav__logo');
// You can select the Attributes by simply putting a dot after the DOM Element and then the name of the Attribute
console.log(logo.alt);
console.log(logo.className);
// If you create the Atributes in HTML then JavaScript will add this Atributes to the Element Object, but this only works for Standard Attributes

logo.alt = 'Beatiful minimalist logo';

// Non-standard
console.log(logo.designer);
// You still can access the Atributes that are non-standard by using the getAttribute() Method. You attach this Method to the DOM ELement and the put as Argument a String with the name of the Attribute
console.log(logo.getAttribute('designer'));

// To access a HTL class in JavaScript use the className Property

// And after you select the Atribute you can set, redefine, or reassign then in JavaScript

// You can also set Attributes with the setAttributes() Methods, you attach this Method to the Element you want to create or change an Attribute. This Method takes 2 String Arguments, the first one is the name of the Attribute and the second is the Value of that Attribute
logo.setAttribute('company', 'Bankist');

console.log(logo.src); // This returns the absolute version of the url with the entire link of the page. And the same goes for links (href)
console.log(logo.getAttribute('src')); // This returns the src of the relative url. The url of the folder that points to the image. And the same goes for links (href)

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

// Data attributes
// Data Attributes is a special Attribute that starts with the word data-
// To access the Data Attribute in the Element attach the dataset Property to the DOM Element. And then dot and the name of the Data Attribute in camelCase
console.log(logo.dataset.versionNumber);

// The dataset is used when you need store data in the UI

// Classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c'); // not includes // This Method return tre if an Element has that Class

// You can pass multiple Classes (Values) in the same classList Method, to do that just put a comma , and then the next Value

// Don't use
// You can also set a Class with the className Property, but this will overwrite all Classes and allow you to put only 1 Class
logo.className = 'jonas';

///////////////////////////////////////
// Implementing Smooth Scrolling

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);

  console.log(e.target.getBoundingClientRect());

  console.log('Current scroll (X/Y)', window.pageXOffset, window.pageYOffset);
  // The pageXOffset and pageIOffset Properties of the Window Element will give you the coordinates of the X and Y axis respectively of the scroll in the Window

  console.log(
    'height/width viewport',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );
  // The clientHeight and clientWidth Properties of the documentElement Element will give you the current height and width of the current viewport

  // Scrolling
  // You can use the Global Function scrollTo(), to scroll from one place to another, this Method is attached to the Window Elements. This Method will take coordinates as Arguments
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // You can implement a smooth scrolling. To do that when passing the Arguments of the scrollTo() Method you must pass an Object with the properties that you need, like top, left, bottom, right, etc. And then add a new Property called behavior, then you pass a Value as a String with the word smooth
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // The scrollIntoView() Method is a modern way of creating smooth scrolling. You attach this Method to the place where you want to go, and as Argumnet it will take an Object with a Property of behavior that has a String Value of smooth
  section1.scrollIntoView({ behavior: 'smooth' });
});

// The getBoundingClientRect() will return a DOMRect of an Element, and this DOMRect contains all the coordinates and informations of the Element. And the getBoundingClientRect() is relative to the vosible viewport

// The target is where the event is being activated

// To calculate the right scroll coordinates use the current position + the current scroll

///////////////////////////////////////
// Types of Events and Event Handlers

const h1 = document.querySelector('h1');

const alertH1 = function (e) {
  alert('addEvenListener: Great! You are reading the heading :D');
};

h1.addEventListener('mouseenter', alertH1);

setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 3000);

// The mouseenter Event is like the :hover from CSS, it will only runs when the mouse enter (touch) the Element

// If you need more Event search for the MDN Event Reference documentation

// Some event can be created with a oneventname and set equal to a the CallBack Function. An you attach this onevent to the Element you want this event to listen for
// h1.onmouseenter = function (e) {
//   alert('onmouseenter: Great! You are reading the heading :D');
// };

// The addEventListener allows you to add multiple Event Listeners to the same Event. And you can remove an Event if you don't need it anymore
// But you cannot remove an anonymous Function, you need to name the CallBack Function to be able to remove the Event
// To remove an Event you the removeEventListerner() Method, that is attched to the Element that has an Event. And as Arguments this Method will take the Type of Event inside a String and the CallBack Function you want to remove

// You can also create Events with HTML Attributes, but this one should not be used
// You create the Event on the HTML with the attribute oneventname and then pass a String with what will the Event do

///////////////////////////////////////
// Event Propagation: Bubbling and Capturing

// Whenever an Event happen, this Event will not be generated in the place where the Event was attached to, but instead it will be generated on the top/root of the document on the DOM Tree, and then the capturing phase begins...
// ...Capturing means that the Event will go down from the Document Root to the target Element, and as the Event goes down it will pass through all the Parent Element of the target Element, and then the target phase begins...
// In the Target phase is where we can handle the Events right at the target, and this can be odne with Event Listeners, and in the Bubbling Phase begins...
// ... Where the Event will go back up to the Document Root again, and the Event will pass through all his parent Element again
// And as the Event bubbles up, and pass through each parent Element is like if this Event is happening in each Element

// Event can only be handle in the Target phase and on the bubbling phase, but we can manage to handle Events also on the Capturing phase
// Also not all Type of Events have a Capturing and Bubbing phase, some Event are generated directilly in the Target, so we can only manage them there

// Bubbling and Capturing is the same as Propagate

///////////////////////////////////////
// Event Propagation in Practice

// rgb(255,255,255)
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);
const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

document.querySelector('.nav__link').addEventListener('click', function (e) {
  console.log('link');
  this.style.backgroundColor = randomColor();
  console.log('LINK', e.target, e.currentTarget);
  console.log(e.currentTarget === this);

  // Stop propagation
  // e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('NAV', e.target, e.currentTarget);
});

// The this KeyWord in an Event Handler will always point to the Element calling the Event Listener

// The target is where the Event originated from, meaning that the target is where the Event happened

// The currentTarget is where the Event Handler is attached

// The currentTarget is the same as the this KeyWord on a Event Handler

// We can stop the Event Propagation with the stopPropagation() Method, and this method is attached to the Event (e)

// It is not a good practice to stop the Event Propagation, unless you really need it

// The Propagation is by default started in the Bubbling phase, but you can make so that the Event Propagarion occurs at the Capturing phase

// To make the Propagation in the Capturing phase you need to add a third Argument to the addEventListener Method, this Argument will a Boolean and if the Value is True then the Propagation will occur at the Capturing phase and not on the Bubbling phase

///////////////////////////////////////
//  Event Delegation: Implementing Page Navigation

// You can create a CallBack Function inside a CallBack Function, if you create a Method that takes a CallBack Function inside the parent CallBack Function

// You can use some Methods in a Looped NodeList

// The getAttribute() Method will return the value that you wrote in that Attribute, meaning that returns the Relative URL

// You can sometimes get an  already made selector from the DOM or the HTML File, meaning that you can use this selector with the Methods that select the DOM Elements

// If you're looping through an Array, NodeList, etc, remember that the CallBack Function will be created to each Element, and if there is a lot of Element this can cause some performance Errors

// The Event Delegation is an idea that by knowing that Events bubble up, we put the Event Listener in a common parent of all Elements that we are interested in

// The Event Delegation has 2 steps:
// 1. Is that we create the Event Listener to a common parent Element of all Elements that we want
// 2. And after that we will determine what Element originated the Event, so that we can work with that Element where the Event was actually created

// The event.target is where the Event happened

// REMEMBER: You can check if an Element contains a certain Class, to do this use the element.classList.contains('class-name')

// When using Event Delegation you will need a matching strategy to know where you are activating the Event, and also where the Event should be activated

// Event Delegation is really important when you're working with Elements that are not yet on the page at run time

///////////////////////////////////////
// DOM Traversing

// DOM Traversing is basically walking through the DOM, meaning that we can select an Element based on another Element

// The DOM Traversing is good for when you need to: select an Element Relative to another Element, like a parent Element, a child Element or even a sibling Element, or when we do not know the structure of the DOM at run time

const h1 = document.querySelector('h1');

// Goind downwards: child
// You can use querySelector on an Element to select this Element childs, no matter how deep this child Element are in the parent Element
console.log(h1.querySelectorAll('.highlight'));
// if you only need direct child Element use the childNodes Property at the Element you want to get the childs from, but this Properties will give you all Nodes from this Element
console.log(h1.childNodes);
// Now if you use the children Property, this will return only the child Nodes that are Element of a certain parent Element, also this returns a HTMLCollection, but it is only for direct children
console.log(h1.children);

// The firstElementChild will return only the first child Element of a parent Element
h1.firstElementChild.style.color = 'white';
// The lastElementChild will return only the last child Element of a parent Element
h1.lastElementChild.style.color = 'orangered';

// Going upwards: parents
// For selecting direct parent Node you can use the parentNode Property
console.log(h1.parentNode);
// For selecting direct parent Element Node you can use the parentElement Property
console.log(h1.parentElement);

// The closest() Method will return the parent Element that is the closest to the attached Element. This Method will take a String containing the type of selecotr (. or #) and the name of the Class or ID, it is the same Argument that the querySelector() how recieve. Also the closest() Method will find a parent ELement no matter how far of the DOM Tree this Element it is
h1.closest('.header').style.background = 'var(--gradient-secondary)';

// If the Element in the Argument is the same as the Element called the Method, then the own Element that called the Method will be returned
h1.closest('h1').style.background = 'var(--gradient-primary)';

// To use an Custom CSS Property you need to write var() and inside the () goes the name of the CSS Custom Property

// Going sideways: siblings
// You can only select direct siblings
// You can select the sibling Element that is before the current Element with the previousElementSibling Property, this return an Element Node
console.log(h1.previousElementSibling);
// You can select the sibling Element that is after the current Element with the nextElementSibling Property, this return an Element Node
console.log(h1.nextElementSibling);

// By using the previousSibling you will get all the Node coresponing to the sibling that comes before the current sibling
console.log(h1.previousSibling);
// And by using the nextSibling you will get all the Node coresponing to the sibling that comes after the current sibling
console.log(h1.nextSibling);

// If you need all the siblings of an Element, simply go up in the DOM Tree to the parent ELement, and then select all children
console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  // You can compare Elements
  if (el !== h1) el.style.transform = 'scale(0.5)';
});

// REMEMBER: An HTMLCollection is an Iterable

///////////////////////////////////////
// Building a Tabbed Component

// A Tab Component usually has a lot of HTML and CSS involved

// REMEMBER: To use Event Delegation

// The closest() Method will return Null if there is no Element to be found with that selector

// A Guard Clause is a If Statement that will return imediatelly if a condition is reached

// REMEMBER: Putting a ! before the name of some Variable means NOT and will reverse the Values to a True when it is a Falsy Value and False for when it is a Truthy Value

// Sometimes you may want to remove all Classes of a Tab Component to later add a Class to activate the current Tab

// When creating a Data Type of Attribute, remember that after the data-, is the name of the data. And to access this in JavaScript use the dataset Property and after this Property the name of the data

// Sometimes you just want to make a manipulation of CSS styles to create you webpage

// Console.logs are only need for development

///////////////////////////////////////
// Passing Arguments to Event Handlers

// The mouseover and mouseenter Event are basically the same with the big difference that the mouseenter Event does not bubble up

// The oposite of mouseover is mouseout, and the oposite of mouseenter is mouseleave

// You can use a querySelector() Method after the closest() Method or vice-versa

// Refactoring usually means that will create a new Function containing all the repetitive functionality

// If you need to pass an Argument into an Event Handler, you can just create a CallBack Function normaly and then inside the CallBack Function call the Function you need and pass the Arguments. Or you can use the bind() Method

// The bind() Method creates a copy of the Function that called the Method and set the this KeyWord in this Function call to the Value we pass in

// The this KeyWord is equal to the currentTarget

// It is impossible to pass another Argument into a Handler Function

// If you need to pass aditional Values into the Handler Function then you need to use the this KeyWord with a bind() Method, and if you need mulltiple Values simply pass as an Array

///////////////////////////////////////
// Implementing a Sticky Navigation: The Scroll Event

// Is the effect that makes the Navigation Bar fixed on the screen after you scroll a little

// You can get access to an Event called 'scroll', to do that you need to attach an Event Listener to the Window Object. And this Event run every time we scroll in our page

// The scroll Event should be avoided, because it fires every time that the scroll is used, no matter how minumun is the scroll movement, and this can cause performance Errors

// REMEMBER: You can get the current scroll position with the scrollY and scrollX Properties of the Window Object

///////////////////////////////////////
// A Better Way: The Intersection Observer API

// The Intersection Observer API allows our code to observer changes in a way that a certain target Element intersects another Element or the way it intersects the viewport

// To create this Intersection Observer you need to write the word new and then IntersectionObserver(). And this IntersectionObserver() will recieve a CallBack Function and an Object of Options as Arguments
// const observer = new IntersectionObserver();

// Then on this Constructor you can call the observe() Method, and this Method will take an Element (target) that he will keep observing (watching)
// observer.observe(section1);

// On the Opitions Object you can define a Property called:
// // root: is the Element that the Target is intersecting with. Also this is the Element we want our Target to intersect. You can set a Value as an Element or as Null (This will make our Target intersect with the entire viewport)
// // threshold: is the percentage of intersection at which the IntersectionObserver() CallBack Function will be called
// // rootMargin: is a box that is applied outside of our target Element, and it is specified in pixels and inside a String, and you can calculate this Value dinamically

// The CallBack Function will run each time the Target is intersecting the root and the threshold we defined. And this Function takes 2 Arguments an entries and the IntersectionObserver() itself

// The entries is an Array of the threshold entries

// We can have multiple thresholds by giving an Array as Value

// The CallBack Function will ony run if the root is being observer and the threshold is the same as show

// REMEMBER: You can descontruct Arrays and Objects

// To access the Properties of the IntersectionObserver(), you need to add the first Parameter in the CallBack Function, and is in there that you manipulate it

///////////////////////////////////////
// Revealing Elements on Scroll

// You can give any name to the Parameters of the IntersectionObserver() CallBack Function, it is their order that matter. But entries and observer is like a standard name

// You can observe multiple target, to do that simply loop over the Elements and inside the Loop add the observe() Method

// On the IntersectionObserver() when you get access to the entries in the CallBack Function, you can also get the target Property, this Property is attached to the entries Parameter. And this Property will show which Element intersected with the root

// You can use the unobserve() Method to make the IntersectionObserver() stop watching a certain target. This Method is attached on the observer Parameter at the CallBack Function

// Using the unobserve() Method can help with the performance

///////////////////////////////////////
// Lazy Loading Images

// To help with performance of loading images you can use the technique of Lazy Loading
// Images have a realy big impact in the performance of the application

// To use the Lazy Loading, first you need to create an image that is really small and that is with a small resolution. And then after you change the lazy image to the real image, that can be stored in the data Attribute
// You can put a blur effect on the lazy image to hide the fact that is really with bad quality

// Using CSS you can select a certain Tag that has a certain data-. E.g tag[data-name]

// After JavaScript changes an image the load Event is fired. And this Event can be used in an Event Listener. This load Event can help with performance

// In fact the load Event is fired whenever something loads in the application

// You can go to Inspect / Network and change some of internet speed of the browser, to see how you application performance would be if it was on a slow internet

///////////////////////////////////////
// Building a Slider Component: Part 1

// The slider are created side by side, and you change the sliders by using the CSS transform Property, and changing the translateX Value

// To create the slide button functionality you'll need a State Variable that holds the Value of the current slide

// And to pass to the next slide you need to loop over the Elements, and then you will get the (current Index - current slide) *  100

// The active slide needs to be 0 porcent

// To set a limit for the slides, you need a Variable that holds the amount (length) of Elements that you have on the slider

// You can read the length on a NodeList

// REMEMBER: The length is not 0 based

// The thing that makes the buttons on the slide work is the current slide, because you decrase the Value when you go to the left and increase the Value when you o to the right

///////////////////////////////////////
// Building a Slider Component: Part 2

// We handle keyboard Events at the document. And to add an Event to a key you need the Event Parameter and also attach a key Property to this Event

// You could use Short Circuting

// The dots can be buttons and they need a data Attribute

// REMEMBER: You can destructure Arrays and Objects

// It is good to have repeteaded functionality stored in Functions

// It is common to remove a class to re-add this class to only one Element

// You can create Expression as the selector for Elements

// REMEMBER: You can select an Element if this Element has a certain Attribute, to do that use the [] after the name of the ELement and inside of the [], the Attribute itself

// It is a good practice to create a Function that will not polute the Global scope with Variables

///////////////////////////////////////
// Lifecycle DOM Events

// Lifecycle means when the page first loads from when the user leaves it

// The DOMContentLoaded is fired as soon as the HTML is completely parsed, this means that the HTML is downloaded and converted into a DOM Tree. Also all scripts must be downloaded and executed before the DOMContentLoaded can happen
// And this Event is attached to the document, and this Event doesn't wait for external resources to load
document.addEventListener('DOMContentLoaded', function (e) {
  console.log('HTML parsed and DOM tree built!', e);
});

// The load Event is attached to the Window Object and is only fired after everything of the application finished loading
window.addEventListener('load', function (e) {
  console.log('Page fully loaded', e);
});

// The beforeunload Event is attached to the Window Object and this Event is fired before the user leaves the page
// window.addEventListener('beforeunload', function (e) {
//   e.preventDefault();
//   console.log(e);

//   // To display the leaving confirmation message, you need to set the Event returnValue to an empty String
//   e.returnValue = '';
// });

// In some browsers you need to call the preventDefault() Method on the beforeunload Event

// Don't abuse the leaving browser message, only when necessary

///////////////////////////////////////
// Efficient Script Loading: defer and async

// There is different ways to load an Script at the HTML File

// You can either create the Script tag on the Head or in the end of the Body of the HTML

// If you don't add any Attribute to the Script Tag and write the Script tag on the Head of the HTML, the page will load the HTML and parse it, then it will fetch (download) the Script and then execute it, but the HTML parsing will stop until the Script is finished executing and after that the HTML will finish parsing. And after that the DOMContentLoaded will fired
// If you don't add any Attribute to the Script Tag and write the Script tag on the end of the Body of the HTML, then all the HTML will be parsed first and after that the Script is fetched and executed. And after that the DOMContentLoaded will fired

// Adding async as an Attriubte to the Script tag and write the Script tag on the Head of the HTML, then the Script will be loaded at the same time as the HTML is parsed, but when the Script needs to executes then the HTML parsing stops and wait until the Script is done executing. And after that the DOMContentLoaded will fired

// Now adding the defer Attribute on the Script tag and write the Script tag on the Head of the HTML, then the Script is loaded just like with the async Attribute, but the Script will only execute after the HTML is done parsing. And after that the DOMContentLoaded will fired

// Doesn't makes sense to add the Script on the end of the Body if there is either the async or defer as an Attribute

// In the async Attribute the DOMContentLoaded will not wait for the Script to load and run, the DOMContentLoaded will run when the HTML finishes parsing

// In the defer Attribute the DOMContentLoaded will wait for the whole HTML and Script file to execute, and only after the Script finishes running then the DOMContentLoaded will run

// Also async Scripts are not guaranteed to execute in order

// But defer Scripts they are guaranteed to execute in order

// Use the defer Scripts for when the order of execution matter, also use when you're using a library

// Use the async Script for 3rd party scripts that the order of execution doesn't matter

// You can use different strategies for different script

// In big applications there is usually more than 1 script

// If you need to support old browser then don't use the async and defer, they just get ignored, instead put the Script in the end of the Body
*/
