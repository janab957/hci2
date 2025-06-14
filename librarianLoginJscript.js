// Elements
const togglePassword = document.getElementById("togglePassword");
const passwordInput = document.getElementById("password");
const emailInput = document.getElementById("email");
const loginBtn = document.getElementById("loginBtn");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

// Track if user interacted with each field
let emailTouched = false;
let passwordTouched = false;

// Toggle password visibility
togglePassword.addEventListener("click", () => {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  togglePassword.innerHTML = isPassword
    ? '<i class="fas fa-eye-slash"></i>'
    : '<i class="fas fa-eye"></i>';
});

// Email format checker
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// Field validation and button toggle
function checkFields() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let isValid = true;

  // Email error (only after user types in email field)
  if (emailTouched) {
    if (!isValidEmail(email)) {
      emailError.classList.remove("hidden");
      isValid = false;
    } else {
      emailError.classList.add("hidden");
    }
  }

  // Password error (only after user types in password field)
  if (passwordTouched) {
    if (password.length < 8) {
      passwordError.classList.remove("hidden");
      isValid = false;
    } else {
      passwordError.classList.add("hidden");
    }
  }

  // Enable or disable login button
  if (isValid && email !== "" && password !== "") {
    loginBtn.disabled = false;
    loginBtn.classList.remove("btn-disabled");
    loginBtn.classList.add("btn-enabled");
  } else {
    loginBtn.disabled = true;
    loginBtn.classList.remove("btn-enabled");
    loginBtn.classList.add("btn-disabled");
  }
}

// Mark fields as touched when user types in them
emailInput.addEventListener("input", () => {
  emailTouched = true;
  checkFields();
});

passwordInput.addEventListener("input", () => {
  passwordTouched = true;
  checkFields();
});

// Login action
loginBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // Optional: add final validation check here again if needed

  // Show success alert
  alert("✅ You are now logged in!");

  // Redirect to dashboard after short delay
  setTimeout(() => {
    window.location.href = "librarianDashboard.html"; // <-- change this to your dashboard file
  }, 500); // 0.5 second delay
});
