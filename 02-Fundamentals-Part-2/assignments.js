/*
// Functions
function describeCountry(country, population, capitalCity) {
  return `${country} has ${population} million people and its capital city is ${capitalCity}`;
}

const descBrazil = describeCountry("Brazil", 209.5, "Brasília");
const descJapan = describeCountry("Japan", 126.5, "Tokyo");
const descUsa = describeCountry(
  "United States of America",
  328.5,
  "Washington"
);
console.log(descBrazil);
console.log(descJapan);
console.log(descUsa);

//Function Declarations vs. Expressions
function percentageOfWorld1(population) {
  return (population / 7900) * 100;
}

const percBrazil1 = percentageOfWorld1(209.5);
const percJapan1 = percentageOfWorld1(126.5);
const percUsa1 = percentageOfWorld1(328.5);

console.log(percBrazil1, percJapan1, percUsa1);

const percentageOfWorld2 = function (population) {
  return (population / 7900) * 100;
};
const percBrazil2 = percentageOfWorld2(209.5);
const percJapan2 = percentageOfWorld2(126.5);
const percUsa2 = percentageOfWorld2(328.5);
console.log(percBrazil2, percJapan2, percUsa2);

// Arrow Functions
const percentageOfWorld3 = (population) => (population / 7900) * 100;

const percBrazil3 = percentageOfWorld3(209.5);
const percJapan3 = percentageOfWorld3(126.5);
const percUsa3 = percentageOfWorld3(328.5);
console.log(percBrazil3, percJapan3, percUsa3);

// Functions Calling Other Functions

const percentageOfWorld = (population) => (population / 7900) * 100;

function describePopulation(country, population) {
  const percentage = percentageOfWorld(population);
  const description = `${country} has ${population} million people, which is about ${percentage} of the world`;
  console.log(description);
}

describePopulation("Brazil", 209.5);
describePopulation("Japan", 126.5);
describePopulation("USA", 328.5);

// Introduction to Arrays
const populations = [209.5, 126.5, 328.5, 1441];
console.log(populations.length === 4);

// Optional
if (populations.length === 4) {
  console.log("Population has 4 elements");
} else {
  console.log(`Population is missing ${4 - populations.length} elements`);
}

const percentageOfWorld = (population) => (population / 7900) * 100;

const percentages = [
  percentageOfWorld(populations[0]),
  percentageOfWorld(populations[1]),
  percentageOfWorld(populations[2]),
  percentageOfWorld(populations[populations.length - 1]),
];

console.log(percentages);

// Basic Array Operations (Methods)
const neighbours = ["China", "Russia", "South Korea"];

neighbours.push("Utopia");
console.log(neighbours);

neighbours.pop();
console.log(neighbours);

if (!neighbours.includes("Germany")) {
  console.log("Probably not a central European country :D");
}
neighbours[neighbours.indexOf("Russia")] = "Mother Russia";
console.log(neighbours);

// Introduction to Objects
const myCountry = {
  country: "Japan",
  capital: "Tokyo",
  language: "Japanese",
  population: 126.5,
  neighbours: ["China", "South Korea", "Russia"],
};

// Dot vs. Bracket Notation
const myCountry = {
  country: "Japan",
  capital: "Tokyo",
  language: "japanese",
  population: 126.5,
  neighbours: ["China", "South Korea", "Russia"],
};

console.log(
  `${myCountry.country} has ${myCountry.population} million ${myCountry.language}-speaking people, ${myCountry.neighbours.length} neighbouring countries and a capital called ${myCountry.capital}`
);

myCountry.population += 2;
console.log(myCountry.population);

myCountry["population"] -= 2;
console.log(myCountry.population);

// Object methods
const myCountry = {
  country: "Japan",
  capital: "Tokyo",
  language: "japanese",
  population: 126.5,
  neighbours: ["China", "South Korea", "Russia"],
  describe: function () {
    console.log(
      `${this.country} has ${this.population} million ${this.language}-speaking people, ${this.neighbours.length} neighbouring countries and a capital called ${this.capital}`
    );
  },
  checkIsland: function () {
    console.log((this.isIsland = this.neighbours.length === 0 ? true : false));
  },
};

myCountry.describe();
myCountry.checkIsland();
console.log(myCountry);

// Iteration: The for Loop

for (let voter = 1; voter <= 50; voter++) {
  console.log(`Voter number ${voter} is currently voting`);
}

// Looping Arrays, Breaking and Continuing
const populations = [209.5, 126.5, 328.5, 1441];
const percentage2 = [];

for (let i = 0; i < populations.length; i++) {
  const pec = (populations[i] / 7900) * 100;
  percentage2.push(pec);
}
console.log(percentage2);

// Looping Backwards and Loops in Loops
const listOfNeighbours = [
  ["Canada", "Mexico"],
  ["Spain"],
  ["Norway", "Sweden", "Russia"],
];

// for (let i = 0; i < listOfNeighbours.length; i++) {
//   const array = listOfNeighbours[i];
//   for (let j = 0; j < array.length; j++) {
//     console.log(`Neighbour: ${array[j]}`);
//   }
// }

for (let i = 0; i < listOfNeighbours.length; i++) {
  for (let y = 0; y < listOfNeighbours[i].length; y++) {
    console.log(`Neighbour: ${listOfNeighbours[i][y]}`);
  }
}

// The while Loop
const populations = [209.5, 126.5, 328.5, 1441];
const percentage3 = [];

let i = 0;
while (i < populations.length) {
  const pec = populations[i];
  percentage3.push(pec);
  i++;
}

console.log(percentage3);
*/
