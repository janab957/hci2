document.addEventListener("DOMContentLoaded", function () {
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");
  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");
  const bookingRequests = document.getElementById("booking-requests");

  // Toggle Notifications
  notificationToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    notificationDropdown.classList.toggle("hidden");
    if (notificationDropdown.classList.contains("hidden")) {
      notificationToggle.classList.remove("bg-[#6D7F96]");
    } else {
      notificationToggle.classList.add("bg-[#6D7F96]");
    }
    categoriesDropdown.classList.add("hidden");
  });

  // Toggle Categories
  categoriesBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    categoriesDropdown.classList.toggle("hidden");
    notificationDropdown.classList.add("hidden");
    notificationToggle.classList.remove("bg-[#6D7F96]");
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!notificationDropdown.contains(e.target) && !notificationToggle.contains(e.target)) {
      notificationDropdown.classList.add("hidden");
      notificationToggle.classList.remove("bg-[#6D7F96]");
    }
    if (!categoriesDropdown.contains(e.target) && !categoriesBtn.contains(e.target)) {
      categoriesDropdown.classList.add("hidden");
    }
  });

  // Redirect on Booking Request
  bookingRequests.addEventListener("click", function () {
    window.location.href = "librarianBookingRequests.html";
  });

  // Hamburger Menu Toggle
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.querySelector(".side-nav");
  if (hamburger && sidebar) {
    hamburger.addEventListener("click", function () {
      sidebar.classList.toggle("hidden");
    });
  }
});

// Install App Logic
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  document.querySelectorAll(".install-btn").forEach((btn) => {
    btn.style.display = "inline-block";
    btn.disabled = false;
  });
});
document.querySelectorAll(".install-btn").forEach((button) => {
  button.style.display = "none";
  button.disabled = true;
  button.addEventListener("click", async () => {
    if (!deferredPrompt) {
      alert("Install prompt not available.");
      return;
    }
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    deferredPrompt = null;
    document.querySelectorAll(".install-btn").forEach((btn) => {
      btn.style.display = "none";
      btn.disabled = true;
    });
  });
});


