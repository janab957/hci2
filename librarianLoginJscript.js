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

// Hamburger menu functionality for mobile sidebar (matching studentDashboard)
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", function () {
      sidebar.classList.toggle("hidden");
    });
  }
});

// PWA Install functionality (matching studentDashboard)
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent the mini-infobar from appearing on mobile
  e.preventDefault();
  // Save the event for later use
  deferredPrompt = e;

  // Show all install buttons (in case they were hidden)
  document.querySelectorAll('.install-btn').forEach(btn => {
    btn.style.display = 'inline-block'; // or 'flex' depending on your button styling
    btn.disabled = false; // enable button if disabled
  });
});

document.querySelectorAll('.install-btn').forEach(button => {
  // Initially hide or disable install buttons until prompt is available
  button.style.display = 'none';
  button.disabled = true;

  button.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert('Install prompt not available yet. Please try again later.');
      return;
    }
    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    // Clear the saved prompt since it can only be used once
    deferredPrompt = null;

    // Hide install buttons after prompt
    document.querySelectorAll('.install-btn').forEach(btn => {
      btn.style.display = 'none';
      btn.disabled = true;
    });
  });
});





