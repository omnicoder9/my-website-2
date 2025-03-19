//smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

//sticky nav bar
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
});
// image slider/carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel img');
if (slides.length !== 0) {
  console.log("valid carousel");
  setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }, 3000);
}else{
  console.log("no slides");
}
// document.getElementById('converterForm').addEventListener('submit', function(e) {
//   e.preventDefault();

//   const substanceDensity = parseFloat(document.getElementById('substance').value);
//   const mass = parseFloat(document.getElementById('mass').value);

//   if (!substanceDensity || !mass) {
//     document.getElementById('result').textContent = "Please select a substance and enter a valid mass.";
//     return;
//   }

//   const volume = mass / substanceDensity;
//   document.getElementById('result').textContent = 
//     `The volume is ${volume.toFixed(2)} mL (or cm³ for solids).`;
// });

// document.getElementById('converterForm').addEventListener('submit', function(e) {
//   e.preventDefault();

//   const inputType = document.getElementById('inputType').value;
//   const inputValue = parseFloat(document.getElementById('inputValue').value);
//   const substanceDensity = parseFloat(document.getElementById('substance').value);
//   const outputType = document.getElementById('outputType').value;

//   if (!substanceDensity || isNaN(inputValue)) {
//     document.getElementById('result').textContent = "Please provide valid inputs.";
//     return;
//   }

//   let resultValue;

//   if (inputType === outputType) {
//     resultValue = inputValue; // Same type, no conversion needed.
//   } else if (inputType === "mass" && outputType === "volume") {
//     resultValue = inputValue / substanceDensity; // Mass to Volume.
//   } else if (inputType === "volume" && outputType === "mass") {
//     resultValue = inputValue * substanceDensity; // Volume to Mass.
//   }

//   document.getElementById('result').textContent = 
//     `The ${outputType} is ${resultValue.toFixed(2)} ${outputType === "mass" ? "g" : "mL"}.`;
// });
const unitConversions = {
  grams: 1, // Base unit
  pounds: 453.592,
  milliliters: 1, // Assume mL is equivalent to cm³
  cups: 240, // 1 cup = 240 mL
};




//intended to fix navbar-convering-header problem but breaks main nav bar
// document.querySelectorAll('nav a').forEach(anchor => {
//   anchor.addEventListener('click', function (e) {
//     e.preventDefault(); // Prevent default anchor behavior
//     const targetId = this.getAttribute('href').substring(1); // Get the target section ID
//     const targetSection = document.getElementById(targetId); // Find the target section
//     const navbarHeight = document.querySelector('nav').offsetHeight; // Get navbar height

//     if (targetSection) {
//       // Scroll to the section, accounting for the navbar height
//       window.scrollTo({
//         top: targetSection.offsetTop - navbarHeight,
//         behavior: 'smooth' // Optional: Add smooth scrolling
//       });
//     }
//   });
// });


console.log("the js is working")