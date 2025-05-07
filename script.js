const display = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll("button");
const themeToggle = document.querySelector(".toggle-theme input");

let current = "";
let fullExpression = "";

const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
} else {
  document.body.classList.add("light");
  themeToggle.checked = false;
}

// theme setting
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.body.classList.remove("light");
    document.body.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark");
    document.body.classList.add("light");
    localStorage.setItem("theme", "light");
  }
});

// format number with commas
function formatNumber(number) {
  if (isNaN(number)) return "Error!";
  return number.toLocaleString("en-US", { maximumFractionDigits: 5 });
}

// calculate with BODMAS
function calculateExpression(expression) {
  try {
    const formattedExpression = expression.replace(/\^/g, "**");
    const result = new Function("return " + formattedExpression)();
    return formatNumber(result);
  } catch {
    return "Error!";
  }
}

// reset calculator
function resetCalculator() {
  current = "";
  fullExpression = "";
  display.textContent = "0";
  resultDisplay.textContent = "";
}

// update display
function updateDisplays() {
  resultDisplay.textContent = fullExpression || "0";
}

// button clicks
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!isNaN(value) || value === ".") {
      current += value;
      fullExpression += value;
      updateDisplays();
    } else if (["+", "-", "*", "/", "^", "%"].includes(value)) {
      if (current === "" && value !== "-") return;
      fullExpression += value;
      current = "";
      updateDisplays();
    } else if (value === "=") {
      const result = calculateExpression(fullExpression);
      display.textContent = fullExpression + " =";
      resultDisplay.textContent = result;
      fullExpression = result;
      current = "";
    } else if (value === "clear") {
      resetCalculator();
    } else if (value === "del") {
      fullExpression = fullExpression.slice(0, -1);
      updateDisplays();
    }
  });
});

// keyboard support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    current += e.key;
    fullExpression += e.key;
    updateDisplays();
  } else if (["+", "-", "*", "/", "^", "%"].includes(e.key)) {
    if (current === "" && e.key !== "-") return;
    fullExpression += e.key;
    current = "";
    updateDisplays();
  } else if (e.key === "Enter") {
    const result = calculateExpression(fullExpression);
    display.textContent = fullExpression + " =";
    resultDisplay.textContent = result;
    fullExpression = result;
    current = "";
  } else if (e.key === "Backspace") {
    fullExpression = fullExpression.slice(0, -1);
    updateDisplays();
  } else if (e.key === "Escape") {
    resetCalculator();
  }
});
