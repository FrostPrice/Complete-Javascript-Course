/*
// Values and Variables
const country = "Brazil";
const continent = "America";
let population = 209.5;

console.log(country);
console.log(continent);
console.log(population);

// Data Types
const isIsland = false;
let language;

console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

// Let, Const and Var
language = "Portuguese";

// Basic operators
console.log(population / 2);
population++;
console.log(population);
console.log(population > 6);
console.log(population < 33);

const description = `${country} is in ${continent}, and it's ${population} million people speak portuguese`;
console.log(description);

// Strings and Template Literals

// Taking Decisions: If / Else Statements

if (population > 33) {
  console.log(`${country}'s population is above average`);
} else {
  console.log(
    `${country}'s population is ${33 - population} million below average`
  );
}

// Type Conversion and Coercion

"9" - "5"; // "4"
"19" - "13" + "17"; // "617"
"19" - "13" + 17; // "23"
"123" < 57; // "False"
5 + 6 + "4" + 9 - 4 - 2; // "1143"

// Equality Operators: == vs ===
// const numNeighbours = Number(
//   prompt(`How many neighbour countries does your country
// have?`)
// );

// if (numNeighbours === 1) {
//   console.log("Only 1 border!");
// } else if (numNeighbours > 1) {
//   console.log("More than 1 border");
// } else {
//   console.log("No borders");
// }

// Logical Operators

if (language === "English" && population < 50 && !isIsland) {
  console.log(`You should live in ${country} :)`);
} else {
  console.log(`${country} does not meet your criteria :(`);
}

// The Switch Statement

switch (language) {
  case "chinese":
  case "mandarin":
    console.log("MOST number of native speakers");
    break;
  case "spanish":
    console.log("2nd place in number of native speakers");
    break;
  case "english":
    console.log("3rd place");
    break;
  case "hindi":
    console.log("Number 4");
    break;
  case "arabic":
    console.log("5th most spoken language");
    break;
  default:
    console.log("Great language too :D");
}

// The Conditional (Ternary) Operator
console.log(
  `${country}'s population is ${population >= 33 ? "above" : "below"} average`
);
*/
