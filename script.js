// ---------- CONSTANTS ---------- //
const FEET_CONST = 30.48;
const INCHES_CONST = 2.54;
const STONES_CONST = 6.35029;
const POUNDS_CONST = 0.453592;
// ---------- EVENT LISTENERS ---------- //
let inputCard = document.querySelector(
  "body > section.header > div > div.calc-container"
);
// inputCard.addEventListener("click", calculate);
inputCard.addEventListener("keyup", calculate);

// ---------- UI FUNCTIONS ---------- //
// This function will change the style of radio divs when checking them
function checkRadio(el) {
  if (el.classList.contains("checked")) return;

  // Display the welcome card while inputs are not filled
  document.getElementById("result-card").classList.add("hidden");
  document.getElementById("welcome-card").classList.remove("hidden");
  // Check radio input  (radio inputs are invisible.)
  el.querySelector("input").checked = true;
  // Remove check from all radio divs
  document
    .querySelectorAll(
      "body > section.header > div > div.calc-container > div.radio-input-div"
    )
    .forEach((radio) => {
      radio.classList.remove("checked");
    });
  // Check current radio div
  el.classList.add("checked");
  // Change dim inputs based on the checked radio input
  document
    .querySelectorAll(
      "body > section.header > div > div.calc-container > .dim-input-div"
    )
    .forEach((el) => {
      el.classList.toggle("hidden");
    });
  // Clear all dim inputs
  document
    .querySelectorAll(
      "body > section.header > div > div.calc-container > .dim-input-div > .dim-input > input"
    )
    .forEach((el) => {
      el.value = "";
    });
}

// ---------- LOGIC FUNCTIONS ---------- //
// This function will check if all inputs are valid and calculate the result and display it.
function calculate() {
  // Get the checked radio input
  dimType = document.querySelector(
    "body > section.header > div > div.calc-container > div.radio-input-div.checked"
  ).dataset.dimType;

  let bmi = null;
  let height = null;
  let weight = null;

  if (dimType === "metric") {
    height = document.querySelector("#height").value ?? 0;
    weight = document.querySelector("#weight").value ?? 0;
  } else {
    _ft = document.querySelector("#ft-height").value ?? 0;
    _in = document.querySelector("#in-height").value ?? 0;
    _st = document.querySelector("#st-weight").value ?? 0;
    _lbs = document.querySelector("#lbs-weight").value ?? 0;
    // Transform _ft, _in, _st, _lbs into kg ang cm
    // Height (in cm) = (Height in feet * 30.48) + (Height in inches * 2.54)
    height = _ft * FEET_CONST + _in * INCHES_CONST;
    // Weight (in kg) = (Weight in stones * 6.35029 kg/stone) + (Weight in pounds * 0.453592 kg/pound)
    weight = _st * STONES_CONST + _lbs * POUNDS_CONST;
  }

  if (weight == 0 || height == 0) {
    // Display the welcome card while inputs are not filled
    document.getElementById("result-card").classList.add("hidden");
    document.getElementById("welcome-card").classList.remove("hidden");
  } else {
    // Display the result card
    document.getElementById("result-card").classList.remove("hidden");
    document.getElementById("welcome-card").classList.add("hidden");
    // Calculate the BMI
    bmi = (weight / (height / 100) ** 2).toFixed(1);
    document.querySelector("#result").innerHTML = bmi;

    // Display the BMI range
    let range = document.getElementById("wealth-range");
    let category = document.getElementById("wealth-category");
    // Determine the weight category using a switch statement
    switch (true) {
      case bmi < 18.5:
        category.innerText = "underweight";
        range.innerText = "above 9st 6lbs";
        break;
      case bmi >= 18.5 && bmi < 25:
        category.innerText = "healthy weight";
        range.innerText = "between 9st 6lbs - 12st 10lbs";
        break;
      case bmi >= 25 && bmi < 30:
        category.innerText = "overweight";
        range.innerText = "below 12st 10lbs";
        break;
      case bmi >= 30:
        category.innerText = "obese";
        range.innerText = "below 12st 10lbs";
        break;
    }
  }
}
