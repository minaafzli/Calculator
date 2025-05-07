const display = document.getElementById("expression");
const resultDisplay = document.getElementById("result");
const buttons = document.querySelectorAll("button");
const themeToggle = document.querySelector(".toggle-theme input");

let fullExpression = "";
let lastResult = null;
const savedTheme = localStorage.getItem("theme");

// default theme setting
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  themeToggle.checked = true;
} else {
  document.body.classList.add("light");
  themeToggle.checked = false;
}

// light and dark theme
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

// 3 digits format
function formatNumber(number) {
  if (isNaN(number) || !isFinite(number)) return "Error!";
  return Number(number).toLocaleString("en-US", { maximumFractionDigits: 10 });
}

// محاسبه ایمن با رعایت تقدم عملیات
function calculateExpression(expression) {
  try {
    // clean and ready
    let cleanExpr = expression
      .replace(/×/g, "*")
      .replace(/÷/g, "/")
      .replace(/\^/g, "**");

    // using eval function for safty
    const result = new Function("return " + cleanExpr)();

    // is result true?
    if (isNaN(result) || !isFinite(result)) {
      return "Error!";
    }

    return formatNumber(result);
  } catch (error) {
    console.error("محاسبه با خطا مواجه شد:", error);
    return "Error!";
  }
}

// تبدیل عبارت داخلی به عبارت قابل نمایش
function formatDisplayExpression(expr) {
  try {
    if (!expr) return "";

    // جلوگیری از تطبیق ناقص الگوها با بررسی تعداد پرانتزها
    let formatted = expr;

    // جایگزینی عملگرهای ریاضی به ترتیب
    // ابتدا توان 2 را جایگزین کن (حالت خاص)
    formatted = formatted.replace(
      /Math\.pow\(([^,]+), 2\)/g,
      function (match, p1) {
        // بررسی تعادل پرانتزها در p1
        if (countParentheses(p1).open === countParentheses(p1).close) {
          return "(" + p1 + ")²";
        }
        return match; // اگر پرانتزها متعادل نیستند، تغییری نده
      }
    );

    // سپس سایر توان‌ها را جایگزین کن
    formatted = formatted.replace(
      /Math\.pow\(([^,]+), ([^)]+)\)/g,
      function (match, p1, p2) {
        // بررسی تعادل پرانتزها
        if (
          countParentheses(p1).open === countParentheses(p1).close &&
          countParentheses(p2).open === countParentheses(p2).close
        ) {
          return "(" + p1 + ")^(" + p2 + ")";
        }
        return match;
      }
    );

    // در نهایت جذر را جایگزین کن
    formatted = formatted.replace(
      /Math\.sqrt\(([^)]+)\)/g,
      function (match, p1) {
        if (countParentheses(p1).open === countParentheses(p1).close) {
          return "√(" + p1 + ")";
        }
        return match;
      }
    );

    return formatted;
  } catch (error) {
    console.error("خطا در فرمت عبارت:", error);
    return expr; // در صورت خطا، عبارت اصلی را برگردان
  }
}

// به روز رسانی نمایشگرها
function updateDisplays() {
  try {
    const displayExpr = formatDisplayExpression(fullExpression);
    display.textContent = displayExpr || "0";

    // فقط اگر عبارت معتبر است نتیجه را نمایش بده
    if (
      fullExpression &&
      !fullExpression.endsWith(" ") &&
      !/[+\-*/^]$/.test(fullExpression)
    ) {
      try {
        resultDisplay.textContent = calculateExpression(fullExpression);
      } catch (error) {
        console.error("خطا در محاسبه نتیجه:", error);
        resultDisplay.textContent = "";
      }
    } else {
      resultDisplay.textContent = "";
    }
  } catch (error) {
    console.error("خطا در به‌روزرسانی نمایشگر:", error);
    // در صورت بروز خطا، نمایش ساده عبارت
    display.textContent = fullExpression || "0";
    resultDisplay.textContent = "";
  }
}

// تنظیم مجدد
function resetCalculator() {
  fullExpression = "";
  lastResult = null;
  updateDisplays();
}

// حذف کاراکتر آخر
function deleteLast() {
  try {
    // اگر رشته خالی است، کاری انجام نده
    if (fullExpression === "") return;

    // اضافه کردن گزارش خطایابی
    console.log("حذف از عبارت:", fullExpression);

    // حذف عملگرهای خاص به صورت کامل
    if (fullExpression.endsWith(" ")) {
      // حذف عملگر با فاصله‌های اطراف
      fullExpression = fullExpression.slice(0, -3);
    } else if (fullExpression.endsWith(")")) {
      // اگر با پرانتز بسته تمام می‌شود (مثل توابع ریاضی)
      const lastOpenParenIndex = fullExpression.lastIndexOf("(");

      // بررسی ویژه برای توابع Math
      if (
        fullExpression.includes("Math.sqrt") ||
        fullExpression.includes("Math.pow")
      ) {
        // پیدا کردن آخرین Math قبل از پرانتز آخر
        const mathIndex = Math.max(
          fullExpression.lastIndexOf("Math.sqrt"),
          fullExpression.lastIndexOf("Math.pow")
        );

        if (mathIndex !== -1) {
          // اگر پرانتز بسته مربوط به این تابع ریاضی است
          const mathParenCount = countParentheses(
            fullExpression.substring(mathIndex)
          );

          if (mathParenCount.open === mathParenCount.close) {
            // اگر همه پرانتزها بسته شده‌اند، کل عبارت را حذف کن
            fullExpression = fullExpression.substring(0, mathIndex);
          } else {
            // فقط پرانتز آخر را حذف کن
            fullExpression = fullExpression.slice(0, -1);
          }
        } else {
          fullExpression = fullExpression.slice(0, -1);
        }
      } else {
        // اگر فقط یک پرانتز ساده است
        fullExpression = fullExpression.slice(0, -1);
      }
    } else {
      // حذف معمولی یک کاراکتر
      fullExpression = fullExpression.slice(0, -1);
    }

    updateDisplays();
  } catch (error) {
    console.error("خطا در حذف کاراکتر:", error);
    // در صورت بروز خطا، به سادگی آخرین کاراکتر را حذف کن
    fullExpression = fullExpression.slice(0, -1);
    updateDisplays();
  }
}

// تابع کمکی برای شمارش پرانتزهای باز و بسته
function countParentheses(str) {
  let open = 0;
  let close = 0;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === "(") open++;
    if (str[i] === ")") close++;
  }

  return { open, close };
}

// عملکرد کلیک دکمه‌ها
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.getAttribute("data-value");

    if (!isNaN(value) || value === ".") {
      fullExpression += value;
    } else if (["+", "-", "*", "/", "^"].includes(value)) {
      // بررسی اگر آخرین کاراکتر یک عملگر است
      if (fullExpression === "" && value !== "-") return;
      if (/[+\-*/^]\s*$/.test(fullExpression) && value !== "-") {
        // عملگر قبلی را با عملگر جدید جایگزین کن
        fullExpression = fullExpression.replace(/[+\-*/^]\s*$/, `${value} `);
      } else {
        if (value === "^") {
          fullExpression += " ^ ";
        } else {
          fullExpression += ` ${value} `;
        }
      }
    } else if (value === "=") {
      if (fullExpression === "") return;

      // بررسی عبارت ناقص
      if (/[+\-*/^]\s*$/.test(fullExpression)) {
        return; // از محاسبه عبارت ناقص جلوگیری کن
      }

      const result = calculateExpression(fullExpression);
      display.textContent = formatDisplayExpression(fullExpression) + " =";
      resultDisplay.textContent = result;

      if (result !== "Error!") {
        lastResult = result.replace(/,/g, "");
        fullExpression = lastResult;
      } else {
        fullExpression = "";
      }
      return;
    } else if (value === "clear") {
      resetCalculator();
      return;
    } else if (value === "del") {
      deleteLast();
      return;
    } else if (value === "sqrt") {
      if (fullExpression === "") {
        fullExpression = "Math.sqrt(";
      } else {
        fullExpression = `Math.sqrt(${fullExpression})`;
      }
    } else if (value === "square") {
      if (fullExpression === "") return;
      fullExpression = `Math.pow(${fullExpression}, 2)`;
    } else if (value === "%") {
      if (fullExpression === "") return;
      fullExpression += " / 100";
    }

    updateDisplays();
  });
});

// keyapad support
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    fullExpression += e.key;
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    if (fullExpression === "" && e.key !== "-") return;
    if (/[+\-*/^]\s*$/.test(fullExpression) && e.key !== "-") {
      fullExpression = fullExpression.replace(/[+\-*/^]\s*$/, `${e.key} `);
    } else {
      fullExpression += ` ${e.key} `;
    }
  } else if (e.key === "^") {
    if (fullExpression === "") return;
    fullExpression += " ^ ";
  } else if (e.key === "Enter" || e.key === "=") {
    if (fullExpression === "" || /[+\-*/^]\s*$/.test(fullExpression)) return;

    const result = calculateExpression(fullExpression);
    display.textContent = formatDisplayExpression(fullExpression) + " =";
    resultDisplay.textContent = result;

    if (result !== "Error!") {
      lastResult = result.replace(/,/g, "");
      fullExpression = lastResult;
    } else {
      fullExpression = "";
    }
    return;
  } else if (e.key === "Backspace") {
    deleteLast();
    return;
  } else if (e.key === "Escape") {
    resetCalculator();
    return;
  }

  updateDisplays();
});
