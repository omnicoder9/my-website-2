
//throws error on home page, getelementbyid is null
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


/// tools
console.log("Tools")
// random number generator

document.addEventListener('DOMContentLoaded', function() {
  // Get references to the DOM elements
  const generateBtn = document.getElementById('generateBtn');
  const minInput = document.getElementById('min');
  const maxInput = document.getElementById('max');
  const resultElement = document.getElementById('result');

  // Add an event listener to the "Generate" button
  generateBtn.addEventListener('click', function() {
    console.log("ran clicked")
      // Get the minimum and maximum values from the input fields
      const min = parseInt(minInput.value);
      const max = parseInt(maxInput.value);

      // Check if the inputs are valid numbers
      if (isNaN(min) || isNaN(max)) {
          resultElement.textContent = "Please enter valid numbers for both minimum and maximum values.";
          return;
      }

      // Ensure that the minimum value is less than the maximum value
      if (min >= max) {
          resultElement.textContent = "Minimum value must be less than the maximum value.";
          return;
      }

      // Generate a random number within the specified range
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

      // Display the result
      resultElement.textContent = `Random Number: ${randomNumber}`;
  });
});


//password generator
function generatePassword() {
    //const length = document.getElementById("length").value;
    let length = document.getElementById("length").value;
    length = Math.max(8, Math.min(40, parseInt(length, 10) || 8));
    document.getElementById("length").value = length;
    const includeSpecial = document.getElementById("specialChars").checked;
    const includeNumbers = document.getElementById("numbers").checked;
    const includeCapitals = document.getElementById("capitalLetters").checked;

    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (includeSpecial) chars += "!@#$%^&*()_+{}[]|:;<>,.?/";
    if (includeNumbers) chars += "0123456789";
    if (includeCapitals) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    document.getElementById("password").textContent = password;
}

function copyPassword() {
    const passwordText = document.getElementById("password").textContent;
    navigator.clipboard.writeText(passwordText).then(() => {
        alert("Password copied to clipboard!");
    });
}