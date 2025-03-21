document.addEventListener("DOMContentLoaded", function () {
  function checkVisibility(entries) {
    entries.map((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = "";
      } else {
        entry.target.style.visibility = "hidden";
      }
    });
  }
  const visibilityObserver = new IntersectionObserver(checkVisibility, {
    root: null,
    rootMargin: "500px 0px 500px 0px",
    threshold: 0,
  });

  // const blurringItems = document.querySelectorAll(
  //   "body > .title, .tablecontentgrid > *, .content > *, .bibliographygrid > *"
  // );
  const blurringItems = document.querySelectorAll(
    ".tablecontentgrid > *, .content > *, .bibliographygrid > *"
  );

  blurringItems.forEach((item) => {
    item.style.transform = "translate3d(0, 0, 0)";

    visibilityObserver.observe(item);
  });

  // Select all slideshow containers
  const slideshows = document.querySelectorAll(
    ".caption.slideshow, .capspiru.slideshow"
  );

  slideshows.forEach((slideshow) => {
    const figures = slideshow.querySelectorAll(".slidefig");
    let currentIndex = 0; // Track the currently visible figure in this slideshow

    // Show the first figure and hide the rest
    figures.forEach((figure, index) => {
      figure.style.display = index === 0 ? "block" : "none";
    });

    // Add click event to cycle through figures when clicking on pl.jpg or pr.jpg
    const imgContainers = slideshow.querySelectorAll(".figimgcontainer img");

    imgContainers.forEach((img) => {
      img.addEventListener("click", function () {
        if (img.src.includes("pr.jpg")) {
          // If 'pr.jpg' is clicked, move to the next figure
          figures[currentIndex].style.display = "none";
          currentIndex = (currentIndex + 1) % figures.length; // Loop back to the first figure if at the end
          figures[currentIndex].style.display = "block";
        } else if (img.src.includes("pl.jpg")) {
          // If 'pl.jpg' is clicked, move to the previous figure
          figures[currentIndex].style.display = "none";
          currentIndex = (currentIndex - 1 + figures.length) % figures.length; // Loop to the last figure if at the start
          figures[currentIndex].style.display = "block";
        }
      });
    });
  });
});
window.onload = function () {
  // Get all the images inside .sunburst and .sunburst_2
  const sunImages1 = document.querySelectorAll(".sunburst .sun-image");
  const sunImages2 = document.querySelectorAll(".sunburst_2 .sun-image_2");

  // Function to add random images with a fade-in and fade-out effect
  function addRandomImages(sunImages, container) {
    // Pick 3 random images from the sunImages list
    const randomImages = [];
    while (randomImages.length < 3) {
      const randomIndex = Math.floor(Math.random() * sunImages.length);
      const randomImage = sunImages[randomIndex];
      if (!randomImages.includes(randomImage)) {
        randomImages.push(randomImage);
      }
    }

    // Set up random positioning for the chosen images
    randomImages.forEach((image) => {
      // Clone the image to prevent removing it from the original div
      const clonedImage = image.cloneNode(true);

      // Calculate random positioning within the parent container using vh/vw units
      const randomX =
        Math.random() * (container.offsetWidth - clonedImage.width);
      const randomY =
        Math.random() * (container.offsetHeight - clonedImage.height);

      // Apply the styles to the cloned image
      clonedImage.style.position = "absolute";
      clonedImage.style.left = `${(randomX / window.innerWidth) * 100}vw`; // Using vw for horizontal positioning
      clonedImage.style.top = `${(randomY / window.innerHeight) * 100}vh`; // Using vh for vertical positioning
      clonedImage.style.opacity = 0; // Start with opacity 0 for fade-in effect

      // Append the image to the parent container
      container.appendChild(clonedImage);

      // Add fade-in and fade-out classes
      clonedImage.classList.add("fade-in-out");

      setTimeout(function () {
        clonedImage.remove();
      }, 7000);
    });
  }

  // Add images immediately when the page loads
  const title = document.querySelector(".title");
  const sunburst2 = document.querySelector(".sunburst_2");
  addRandomImages(sunImages1, title); // Images for .sunburst go into .title
  addRandomImages(sunImages2, sunburst2); // Images for .sunburst_2 go into .sunburst_2

  // Set an interval to repeat the process every 8 seconds (same duration as the fade-in-out cycle)
  setInterval(function () {
    addRandomImages(sunImages1, title); // Images for .sunburst go into .title
    addRandomImages(sunImages2, sunburst2); // Images for .sunburst_2 go into .sunburst_2
  }, 500);

  // Optionally, you can make the .sunburst container hidden (already in the original CSS)
  const sunburst = document.querySelector(".sunburst");
  sunburst.style.display = "none";

  sunburst2.style.display = "block";
};

// window.onload = function () {
//   // Get all the images inside .sunburst and .sunburst_2
//   const sunImages1 = document.querySelectorAll(".sunburst .sun-image");
//   const sunImages2 = document.querySelectorAll(".sunburst_2 .sun-image_2");

//   // Function to add random images with a fade-in and fade-out effect
//   function addRandomImages(sunImages, container) {
//     // Pick 3 random images from the sunImages list
//     const randomImages = [];
//     while (randomImages.length < 3) {
//       const randomIndex = Math.floor(Math.random() * sunImages.length);
//       const randomImage = sunImages[randomIndex];
//       if (!randomImages.includes(randomImage)) {
//         randomImages.push(randomImage);
//       }
//     }

//     // Set up random positioning for the chosen images
//     randomImages.forEach((image) => {
//       // Clone the image to prevent removing it from the original div
//       const clonedImage = image.cloneNode(true);

//       // Calculate random positioning within the parent container using vh/vw units
//       const randomX =
//         ((Math.random() * (container.offsetWidth - clonedImage.width)) /
//           window.innerWidth) *
//         100; // Using vw
//       const randomY =
//         ((Math.random() * (container.offsetHeight - clonedImage.height)) /
//           window.innerHeight) *
//         100; // Using vh

//       // Apply the styles to the cloned image
//       clonedImage.style.position = "absolute";
//       clonedImage.style.left = `${randomX}vw`; // Using vw for horizontal positioning
//       clonedImage.style.top = `${randomY}vh`; // Using vh for vertical positioning
//       clonedImage.style.opacity = 0; // Start with opacity 0 for fade-in effect

//       // Append the image to the parent container
//       container.appendChild(clonedImage);

//       // Add fade-in and fade-out classes
//       clonedImage.classList.add("fade-in-out");
//     });
//   }

//   // Add images immediately when the page loads
//   const title = document.querySelector(".title");
//   const sunburst2 = document.querySelector(".sunburst_2");
//   addRandomImages(sunImages1, title); // Images for .sunburst go into .title
//   addRandomImages(sunImages2, sunburst2); // Images for .sunburst_2 go into .sunburst_2

//   // Set an interval to repeat the process every 8 seconds (same duration as the fade-in-out cycle)
//   setInterval(function () {
//     addRandomImages(sunImages1, title); // Images for .sunburst go into .title
//     addRandomImages(sunImages2, sunburst2); // Images for .sunburst_2 go into .sunburst_2
//   }, 500);

//   // Optionally, you can make the .sunburst container hidden (already in the original CSS)
//   const sunburst = document.querySelector(".sunburst");
//   sunburst.style.display = "none";

//   sunburst2.style.display = "block";
// };

// document.addEventListener("DOMContentLoaded", () => {
//   const imagePaths = [
//     "/assets/images/sun burst/Layer 34 copy.png",
//     "/assets/images/sun burst/Layer 34.png",
//     "/assets/images/sun burst/Layer 35 copy.png",
//     "/assets/images/sun burst/Layer 35.png",
//     "/assets/images/sun burst/Layer 33.png",
//   ];

//   const numVisible = 2; // Show 2 images at a time

//   function getRandomPosition(imgWidth, imgHeight) {
//     // Ensure images stay within the viewport by subtracting their width and height from the viewport size
//     let top = Math.random() * (100 - imgHeight) + "vh";
//     let left = Math.random() * (100 - imgWidth) + "vw";
//     return { top, left };
//   }

//   function createImageElement(src) {
//     let img = document.createElement("img");
//     img.src = src;
//     img.style.position = "fixed";
//     img.style.opacity = "0"; // Start with zero opacity (for fade-in effect)
//     img.style.pointerEvents = "none";

//     // Random size between 50vh and 90vh for height (based on viewport height)
//     let randomHeight = Math.random() * (90 - 50) + 50; // between 50% and 90% of the viewport height
//     img.style.height = `${randomHeight}vh`; // Set height in vh

//     img.style.width = "auto"; // Set width to 'auto' to maintain aspect ratio based on the height

//     // Set the transition for opacity to take 6 seconds for fade-in, and 3 seconds for fade-out
//     img.style.transition = "opacity 6s ease-in-out";

//     return img;
//   }

//   function showRandomImages() {
//     // Display the .sunburst div
//     document.querySelector(".sunburst").style.display = "block"; // Show .sunburst

//     // Remove previously displayed images
//     document.querySelectorAll(".floating-image").forEach((img) => {
//       img.style.opacity = "0"; // Start fade-out
//     });

//     // Set a timeout to remove the images after fade-out (3 seconds)
//     setTimeout(() => {
//       document
//         .querySelectorAll(".floating-image")
//         .forEach((img) => img.remove());
//     }, 3000); // 3 seconds for fade-out

//     let selectedIndexes = [];
//     while (selectedIndexes.length < numVisible) {
//       let rand = Math.floor(Math.random() * imagePaths.length);
//       if (!selectedIndexes.includes(rand)) {
//         selectedIndexes.push(rand);
//       }
//     }

//     selectedIndexes.forEach((index) => {
//       let img = createImageElement(imagePaths[index]);

//       // Once the image has loaded, we can get its width and height
//       img.onload = function () {
//         // Get image width and height for positioning
//         let imgWidth = img.offsetWidth; // Get width in px
//         let imgHeight = img.offsetHeight; // Get height in px

//         let { top, left } = getRandomPosition(
//           (imgWidth / window.innerWidth) * 100,
//           (imgHeight / window.innerHeight) * 100
//         );

//         img.style.top = top;
//         img.style.left = left;
//         img.classList.add("floating-image");

//         document.body.appendChild(img);

//         // Fade in with random opacity (between 0.1 and 0.2)
//         setTimeout(() => {
//           img.style.opacity = Math.random() * (0.2 - 0.1) + 0.1; // Fade in opacity between 0.1 and 0.2
//         }, 100);

//         // Ensure fade-out happens after 5 seconds, and only then set opacity to 0
//         setTimeout(() => {
//           img.style.opacity = "0"; // Fade-out opacity
//         }, 5000); // Delay opacity change for 5 seconds (after fade-in)

//         // Remove the image after the fade-out is completed (3 seconds)
//         setTimeout(() => {
//           img.remove(); // Remove image after 3 seconds to complete fade-out
//         }, 8000); // Total delay: 5s for visible time + 3s fade-out duration
//       };
//     });
//   }

//   // Initial image display
//   showRandomImages();

//   // Repeat every 8 seconds
//   setInterval(() => {
//     showRandomImages();
//   }, 8000);
// });
