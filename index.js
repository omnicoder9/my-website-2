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
//image slider/carousel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel img');
setInterval(() => {
  slides[currentSlide].classList.remove('active');
  currentSlide = (currentSlide + 1) % slides.length;
  slides[currentSlide].classList.add('active');
}, 3000);

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

document.getElementById('converterForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const inputType = document.getElementById('inputType').value;
  const inputValue = parseFloat(document.getElementById('inputValue').value);
  const substanceDensity = parseFloat(document.getElementById('substance').value);
  const outputType = document.getElementById('outputType').value;

  if (!substanceDensity || isNaN(inputValue)) {
    document.getElementById('result').textContent = "Please provide valid inputs.";
    return;
  }

  // Convert input to base unit (grams or milliliters)
  const inputInBaseUnit = inputType === "grams" || inputType === "pounds"
    ? inputValue * (unitConversions[inputType] / unitConversions["grams"]) // Convert mass units
    : inputValue * (unitConversions[inputType] / unitConversions["milliliters"]); // Convert volume units

  // Perform conversion based on substance and output type
  let resultInBaseUnit;
  if (inputType === "grams" || inputType === "pounds") {
    resultInBaseUnit = inputInBaseUnit / substanceDensity; // Mass to Volume
  } else {
    resultInBaseUnit = inputInBaseUnit * substanceDensity; // Volume to Mass
  }

  // Convert result to desired output unit
  const resultValue = outputType === "grams" || outputType === "pounds"
    ? resultInBaseUnit * (unitConversions["grams"] / unitConversions[outputType]) // Convert to mass units
    : resultInBaseUnit * (unitConversions["milliliters"] / unitConversions[outputType]); // Convert to volume units

  document.getElementById('result').textContent = 
    `The ${outputType} is ${resultValue.toFixed(2)} ${outputType}.`;
});




console.log("the js is working")