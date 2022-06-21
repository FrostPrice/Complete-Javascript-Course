/* 
Your tasks:
PART 1
1. Write an async function 'loadNPause' that recreates Challenge #2, this time
using async/await (only the part where the promise is consumed, reuse the
'createImage' function from before)
2. Compare the two versions, think about the big differences, and see which one
you like more
3. Don't forget to test the error handler, and to set the network speed to “Fast 3G”
in the dev tools Network tab

PART 2
1. Create an async function 'loadAll' that receives an array of image paths
'imgArr'
2. Use .map to loop over the array, to load all the images with the
'createImage' function (call the resulting array 'imgs')
3. Check out the 'imgs' array in the console! Is it like you expected?
4. Use a promise combinator function to actually get the images from the array 😉
5. Add the 'parallel' class to all the images (it has some CSS styles)

Test data Part 2: ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-
3.jpg']. To test, turn off the 'loadNPause' function

GOOD LUCK 😀
*/

const imgContainer = document.querySelector(".images");

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("load", function () {
      imgContainer.append(img);
      resolve(img);
    });

    img.addEventListener("error", function () {
      reject(new Error("Image not found"));
    });
  });
};

// <---- MY SOLUTION ---->
/*
const loadNPause = async function () {
  try {
    const img1 = await createImage("img/img-1.jpg");
    await wait(2);
    img1.style.display = "none";

    const img2 = await createImage("img/img-2.jpg");
    await wait(2);
    img2.style.display = "none";

    const img3 = await createImage("img/img-3.jpg");
    await wait(2);
    img3.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

const loadAll = async function (imgArr) {
  const imgs = imgArr.map(async (img) => await createImage(img));

  const imgsEl = await Promise.all(imgs);
  imgsEl.forEach((el) => el.classList.add("parallel"));
};
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
*/
// <---- JONAS SOLUTION ---->

// Part 1
const loadNPause = async function () {
  try {
    // Load image 1
    let img = await createImage("img/img-1.jpg");
    console.log("Image 1 loaded");
    await wait(2);
    img.style.display = "none";

    // Load image 2
    img = await createImage("img/img-2.jpg");
    console.log("Image 2 loaded");

    await wait(2);
    img.style.display = "none";

    // Load Image 3
    img = await createImage("img/img-3.jpg");
    console.log("Image 3 loaded");
    await wait(2);
    img.style.display = "none";
  } catch (err) {
    console.error(err);
  }
};
// loadNPause();

// Part 2

const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));

    const imgsEl = await Promise.all(imgs);
    console.log(imgsEl);
    imgsEl.forEach((img) => img.classList.add("parallel"));
  } catch (err) {
    console.log(err);
  }
};
loadAll(["img/img-1.jpg", "img/img-2.jpg", "img/img-3.jpg"]);
