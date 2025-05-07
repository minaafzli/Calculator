// // // // const display = document.getElementById("expression");
// // // // const resultDisplay = document.getElementById("result");
// // // // const buttons = document.querySelectorAll("button");
// // // // const themeToggle = document.querySelector(".toggle-theme input");

// // // // let current = "";
// // // // let operator = null;
// // // // let previous = "";
// // // // let fullExpression = "";

// // // // const savedTheme = localStorage.getItem("theme");
// // // // if (savedTheme === "dark") {
// // // //   document.body.classList.add("dark");
// // // //   themeToggle.checked = true;
// // // // } else {
// // // //   document.body.classList.add("light");
// // // //   themeToggle.checked = false;
// // // // }

// // // // // theme setting
// // // // themeToggle.addEventListener("change", () => {
// // // //   if (themeToggle.checked) {
// // // //     document.body.classList.remove("light");
// // // //     document.body.classList.add("dark");
// // // //     localStorage.setItem("theme", "dark");
// // // //   } else {
// // // //     document.body.classList.remove("dark");
// // // //     document.body.classList.add("light");
// // // //     localStorage.setItem("theme", "light");
// // // //   }
// // // // });

// // // // function calculate() {
// // // //   const prev = parseFloat(previous);
// // // //   const curr = parseFloat(current);
// // // //   if (isNaN(prev) || isNaN(curr)) return "";

// // // //   switch (operator) {
// // // //     case "+":
// // // //       return prev + curr;
// // // //     case "-":
// // // //       return prev - curr;
// // // //     case "*":
// // // //       return prev * curr;
// // // //     case "/":
// // // //       return curr !== 0 ? prev / curr : "Error!";
// // // //     case "^":
// // // //       return Math.pow(prev, curr);
// // // //     default:
// // // //       return curr;
// // // //   }
// // // // }

// // // // function formatNumber(number) {
// // // //   if (isNaN(number)) return "Error!";
// // // //   const fixed = Number(number)
// // // //     .toFixed(5)
// // // //     .replace(/\.?0+$/, "");
// // // //   const parts = fixed.split(".");
// // // //   parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
// // // //   return parts.join(".");
// // // // }

// // // // // update show
// // // // function updateDisplays() {
// // // //   resultDisplay.textContent = fullExpression || "0";
// // // // }

// // // // // reset completly
// // // // function resetCalculator() {
// // // //   current = "";
// // // //   previous = "";
// // // //   operator = null;
// // // //   fullExpression = "";
// // // //   display.textContent = "0";
// // // //   resultDisplay.textContent = "";
// // // // }

// // // // buttons.forEach((button) => {
// // // //   button.addEventListener("click", () => {
// // // //     const value = button.getAttribute("data-value");

// // // //     if (!isNaN(value) || value === ".") {
// // // //       current += value;
// // // //       fullExpression += value;
// // // //       updateDisplays();
// // // //     } else if (["+", "-", "*", "/", "^"].includes(value)) {
// // // //       if (current === "") return; //prevent oparator entry without operand
// // // //       if (previous !== "") {
// // // //         current = calculate().toString();
// // // //         previous = current;
// // // //       } else {
// // // //         previous = current;
// // // //       }
// // // //       operator = value;
// // // //       current = "";
// // // //       fullExpression += ` ${value} `;
// // // //       updateDisplays();
// // // //     } else if (value === "=") {
// // // //       if (current === "" || previous === "") return;
// // // //       const result = calculate();
// // // //       const formatted = formatNumber(result);
// // // //       display.textContent = fullExpression + " =";
// // // //       resultDisplay.textContent = formatted;

// // // //       current = result.toString();
// // // //       previous = "";
// // // //       operator = null;
// // // //       fullExpression = current;
// // // //     } else if (value === "clear") {
// // // //       resetCalculator();
// // // //     } else if (value === "del") {
// // // //       if (fullExpression.length > 0) {
// // // //         const lastChar = fullExpression.slice(-1);
// // // //         fullExpression = fullExpression.slice(0, -1);
// // // //         if (!isNaN(lastChar) || lastChar === ".") {
// // // //           current = current.slice(0, -1);
// // // //         }
// // // //         updateDisplays();
// // // //       }
// // // //     } else if (value === "sqrt") {
// // // //       if (current === "") return;
// // // //       let result = Math.sqrt(parseFloat(current));
// // // //       if (isNaN(result)) return;
// // // //       result = formatNumber(result);
// // // //       current = result.toString();
// // // //       fullExpression = `√(${fullExpression})`;
// // // //       display.textContent = fullExpression + " =";
// // // //       resultDisplay.textContent = result;
// // // //     } else if (value === "square") {
// // // //       if (current === "") return;
// // // //       let result = Math.pow(parseFloat(current), 2);
// // // //       if (isNaN(result)) return;
// // // //       result = formatNumber(result);
// // // //       current = result.toString();
// // // //       fullExpression = `(${fullExpression})²`;
// // // //       display.textContent = fullExpression + " =";
// // // //       resultDisplay.textContent = result;
// // // //     } else if (value === "%") {
// // // //       if (current === "") return;
// // // //       let result = parseFloat(current) / 100;
// // // //       result = formatNumber(result);
// // // //       current = result.toString();
// // // //       fullExpression = `${fullExpression}%`;
// // // //       display.textContent = fullExpression + " =";
// // // //       resultDisplay.textContent = result;
// // // //     }
// // // //   });
// // // // });

// // // // // keypad setting
// // // // document.addEventListener("keydown", (e) => {
// // // //   if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
// // // //     current += e.key;
// // // //     fullExpression += e.key;
// // // //     updateDisplays();
// // // //   } else if (["+", "-", "*", "/", "^"].includes(e.key)) {
// // // //     if (current === "") return;
// // // //     if (previous !== "") {
// // // //       current = calculate().toString();
// // // //       previous = current;
// // // //     } else {
// // // //       previous = current;
// // // //     }
// // // //     operator = e.key;
// // // //     current = "";
// // // //     fullExpression += ` ${e.key} `;
// // // //     updateDisplays();
// // // //   } else if (e.key === "Enter" || e.key === "=") {
// // // //     const result = calculate();
// // // //     const formatted = formatNumber(result);
// // // //     display.textContent = fullExpression + " =";
// // // //     resultDisplay.textContent = formatted;

// // // //     current = result.toString();
// // // //     previous = "";
// // // //     operator = null;
// // // //     fullExpression = current;
// // // //   } else if (e.key === "Backspace") {
// // // //     if (fullExpression.length > 0) {
// // // //       const lastChar = fullExpression.slice(-1);
// // // //       fullExpression = fullExpression.slice(0, -1);
// // // //       if (!isNaN(lastChar) || lastChar === ".") {
// // // //         current = current.slice(0, -1);
// // // //       }
// // // //       updateDisplays();
// // // //     }
// // // //   } else if (e.key === "Escape") {
// // // //     resetCalculator();
// // // //   }
// // // // });
// // // const display = document.getElementById("expression");
// // // const resultDisplay = document.getElementById("result");
// // // const buttons = document.querySelectorAll("button");
// // // const themeToggle = document.querySelector(".toggle-theme input");

// // // let fullExpression = "";
// // // const savedTheme = localStorage.getItem("theme");

// // // if (savedTheme === "dark") {
// // //   document.body.classList.add("dark");
// // //   themeToggle.checked = true;
// // // } else {
// // //   document.body.classList.add("light");
// // //   themeToggle.checked = false;
// // // }

// // // // تم دارک و لایت
// // // themeToggle.addEventListener("change", () => {
// // //   if (themeToggle.checked) {
// // //     document.body.classList.remove("light");
// // //     document.body.classList.add("dark");
// // //     localStorage.setItem("theme", "dark");
// // //   } else {
// // //     document.body.classList.remove("dark");
// // //     document.body.classList.add("light");
// // //     localStorage.setItem("theme", "light");
// // //   }
// // // });

// // // // فرمت کردن اعداد به صورت سه رقمی
// // // function formatNumber(number) {
// // //   if (isNaN(number)) return "Error!";
// // //   return Number(number).toLocaleString("en-US", { maximumFractionDigits: 10 });
// // // }

// // // // محاسبه ایمن با رعایت تقدم عملیات
// // // function calculateExpression(expression) {
// // //   try {
// // //     // جایگزینی توان
// // //     expression = expression.replace(/(\d+)\s*\^\s*(\d+)/g, "Math.pow($1, $2)");
// // //     // محاسبه با eval (ایمن شده)
// // //     const result = new Function("return " + expression)();
// // //     return formatNumber(result);
// // //   } catch {
// // //     return "Error!";
// // //   }
// // // }

// // // // به روز رسانی نمایشگرها
// // // function updateDisplays() {
// // //   display.textContent = fullExpression || "0";
// // //   resultDisplay.textContent = fullExpression
// // //     ? calculateExpression(fullExpression)
// // //     : "";
// // // }

// // // // تنظیم مجدد
// // // function resetCalculator() {
// // //   fullExpression = "";
// // //   updateDisplays();
// // // }

// // // // حذف کاراکتر آخر
// // // function deleteLast() {
// // //   fullExpression = fullExpression.slice(0, -1);
// // //   updateDisplays();
// // // }

// // // // عملکرد کلیک دکمه‌ها
// // // buttons.forEach((button) => {
// // //   button.addEventListener("click", () => {
// // //     const value = button.getAttribute("data-value");

// // //     if (!isNaN(value) || value === ".") {
// // //       fullExpression += value;
// // //     } else if (["+", "-", "*", "/", "^"].includes(value)) {
// // //       if (fullExpression === "" || /[+\-*/^]$/.test(fullExpression)) return;
// // //       fullExpression += ` ${value} `;
// // //     } else if (value === "=") {
// // //       if (fullExpression === "") return;
// // //       const result = calculateExpression(fullExpression);
// // //       display.textContent = fullExpression + " =";
// // //       resultDisplay.textContent = result;
// // //       fullExpression = result === "Error!" ? "" : result.replace(/,/g, "");
// // //       return;
// // //     } else if (value === "clear") {
// // //       resetCalculator();
// // //       return;
// // //     } else if (value === "del") {
// // //       deleteLast();
// // //       return;
// // //     } else if (value === "sqrt") {
// // //       if (fullExpression === "") return;
// // //       fullExpression = `Math.sqrt(${fullExpression})`;
// // //     } else if (value === "square") {
// // //       if (fullExpression === "") return;
// // //       fullExpression = `Math.pow(${fullExpression}, 2)`;
// // //     } else if (value === "%") {
// // //       if (fullExpression === "") return;
// // //       fullExpression += " / 100";
// // //     }

// // //     updateDisplays();
// // //   });
// // // });

// // // // پشتیبانی از صفحه کلید
// // // document.addEventListener("keydown", (e) => {
// // //   if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
// // //     fullExpression += e.key;
// // //   } else if (["+", "-", "*", "/", "^"].includes(e.key)) {
// // //     if (fullExpression === "" || /[+\-*/^]$/.test(fullExpression)) return;
// // //     fullExpression += ` ${e.key} `;
// // //   } else if (e.key === "Enter" || e.key === "=") {
// // //     const result = calculateExpression(fullExpression);
// // //     display.textContent = fullExpression + " =";
// // //     resultDisplay.textContent = result;
// // //     fullExpression = result === "Error!" ? "" : result.replace(/,/g, "");
// // //     return;
// // //   } else if (e.key === "Backspace") {
// // //     deleteLast();
// // //   } else if (e.key === "Escape") {
// // //     resetCalculator();
// // //   }
// // //   updateDisplays();
// // // });
// // const display = document.getElementById("expression");
// // const resultDisplay = document.getElementById("result");
// // const buttons = document.querySelectorAll("button");
// // const themeToggle = document.querySelector(".toggle-theme input");

// // let fullExpression = "";
// // const savedTheme = localStorage.getItem("theme");

// // if (savedTheme === "dark") {
// //   document.body.classList.add("dark");
// //   themeToggle.checked = true;
// // } else {
// //   document.body.classList.add("light");
// //   themeToggle.checked = false;
// // }

// // // Theme Setting
// // themeToggle.addEventListener("change", () => {
// //   if (themeToggle.checked) {
// //     document.body.classList.remove("light");
// //     document.body.classList.add("dark");
// //     localStorage.setItem("theme", "dark");
// //   } else {
// //     document.body.classList.remove("dark");
// //     document.body.classList.add("light");
// //     localStorage.setItem("theme", "light");
// //   }
// // });

// // function updateDisplays() {
// //   display.textContent = fullExpression || "0";
// //   try {
// //     const result = eval(fullExpression);
// //     resultDisplay.textContent = isNaN(result) ? "" : formatNumber(result);
// //   } catch (error) {
// //     resultDisplay.textContent = "Error!";
// //   }
// // }

// // function formatNumber(number) {
// //   return Number(number).toLocaleString("en-US", { maximumFractionDigits: 5 });
// // }

// // function resetCalculator() {
// //   fullExpression = "";
// //   updateDisplays();
// // }

// // buttons.forEach((button) => {
// //   button.addEventListener("click", () => {
// //     const value = button.getAttribute("data-value");

// //     if (!isNaN(value) || value === ".") {
// //       fullExpression += value;
// //     } else if (value === "clear") {
// //       resetCalculator();
// //     } else if (value === "del") {
// //       fullExpression = fullExpression.slice(0, -1);
// //     } else if (value === "=" && fullExpression) {
// //       updateDisplays();
// //       return;
// //     } else if (["+", "-", "*", "/", "%", "^"].includes(value)) {
// //       if (/[+\-*/%^]$/.test(fullExpression)) return; // Prevent multiple operators
// //       fullExpression += value;
// //     } else if (value === "sqrt") {
// //       fullExpression += "Math.sqrt(";
// //     } else if (value === "square") {
// //       fullExpression += "**2";
// //     }

// //     updateDisplays();
// //   });
// // });

// // // Keyboard Support
// // document.addEventListener("keydown", (e) => {
// //   if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
// //     fullExpression += e.key;
// //   } else if (["+", "-", "*", "/", "%", "^"].includes(e.key)) {
// //     if (/[+\-*/%^]$/.test(fullExpression)) return; // Prevent multiple operators
// //     fullExpression += e.key;
// //   } else if (e.key === "Enter") {
// //     updateDisplays();
// //   } else if (e.key === "Backspace") {
// //     fullExpression = fullExpression.slice(0, -1);
// //   } else if (e.key === "Escape") {
// //     resetCalculator();
// //   }

// //   updateDisplays();
// // });
// const display = document.getElementById("expression");
// const resultDisplay = document.getElementById("result");
// const buttons = document.querySelectorAll("button");
// const themeToggle = document.querySelector(".toggle-theme input");

// let fullExpression = "";
// const savedTheme = localStorage.getItem("theme");

// if (savedTheme === "dark") {
//   document.body.classList.add("dark");
//   themeToggle.checked = true;
// } else {
//   document.body.classList.add("light");
//   themeToggle.checked = false;
// }

// // Theme Setting
// themeToggle.addEventListener("change", () => {
//   if (themeToggle.checked) {
//     document.body.classList.remove("light");
//     document.body.classList.add("dark");
//     localStorage.setItem("theme", "dark");
//   } else {
//     document.body.classList.remove("dark");
//     document.body.classList.add("light");
//     localStorage.setItem("theme", "light");
//   }
// });

// function updateDisplays() {
//   display.textContent = fullExpression || "0";
//   try {
//     const result = eval(fullExpression);
//     resultDisplay.textContent = isNaN(result) ? "" : formatNumber(result);
//   } catch (error) {
//     resultDisplay.textContent = "Error!";
//   }
// }

// function formatNumber(number) {
//   return Number(number).toLocaleString("en-US", { maximumFractionDigits: 5 });
// }

// function resetCalculator() {
//   fullExpression = "";
//   updateDisplays();
// }

// buttons.forEach((button) => {
//   button.addEventListener("click", () => {
//     const value = button.getAttribute("data-value");

//     if (!isNaN(value) || value === ".") {
//       fullExpression += value;
//     } else if (value === "clear") {
//       resetCalculator();
//     } else if (value === "del") {
//       fullExpression = fullExpression.slice(0, -1);
//     } else if (value === "=" && fullExpression) {
//       updateDisplays();
//       return;
//     } else if (["+", "-", "*", "/", "%", "^"].includes(value)) {
//       if (/[+\-*/%^]$/.test(fullExpression)) return; // Prevent multiple operators
//       fullExpression += value;
//     } else if (value === "sqrt") {
//       fullExpression += "Math.sqrt(";
//     } else if (value === "square") {
//       fullExpression += "**2";
//     }

//     updateDisplays();
//   });
// });

// // Keyboard Support
// document.addEventListener("keydown", (e) => {
//   if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
//     fullExpression += e.key;
//   } else if (["+", "-", "*", "/", "%", "^"].includes(e.key)) {
//     if (/[+\-*/%^]$/.test(fullExpression)) return; // Prevent multiple operators
//     fullExpression += e.key;
//   } else if (e.key === "Enter") {
//     updateDisplays();
//   } else if (e.key === "Backspace") {
//     fullExpression = fullExpression.slice(0, -1);
//   } else if (e.key === "Escape") {
//     resetCalculator();
//   }

//   updateDisplays();
// });
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
