document.addEventListener("DOMContentLoaded", function () {
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");

  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");

  const bookingRequests = document.getElementById("booking-requests");

  // Notifications toggle
  notificationToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    notificationDropdown.classList.toggle("hidden");

    // Toggle highlight class (like hover fill)
    if (notificationDropdown.classList.contains("hidden")) {
      notificationToggle.classList.remove("bg-[#6D7F96]");
    } else {
      notificationToggle.classList.add("bg-[#6D7F96]");
    }

    // Close categories if open
    categoriesDropdown.classList.add("hidden");
  });

  // Categories toggle
  categoriesBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    categoriesDropdown.classList.toggle("hidden");

    // Close notifications if open
    notificationDropdown.classList.add("hidden");
    notificationToggle.classList.remove("bg-[#6D7F96]");
  });

  // Click outside to close both dropdowns
  document.addEventListener("click", function (e) {
    if (
      !notificationDropdown.contains(e.target) &&
      !notificationToggle.contains(e.target)
    ) {
      notificationDropdown.classList.add("hidden");
      notificationToggle.classList.remove("bg-[#6D7F96]");
    }

    if (
      !categoriesDropdown.contains(e.target) &&
      !categoriesBtn.contains(e.target)
    ) {
      categoriesDropdown.classList.add("hidden");
    }
  });

  // Redirect to libranet3.html when "Booking Requests" is clicked
  bookingRequests.addEventListener("click", function () {
    window.location.href = "librarianBookingRequests.html";
  });
});


// Hamburger menu functionality for mobile sidebar
document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.querySelector(".side-nav");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", function () {
      sidebar.classList.toggle("hidden");
    });
  }
});

// PWA Install functionality
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;

  document.querySelectorAll('.install-btn').forEach(btn => {
    btn.style.display = 'inline-block';
    btn.disabled = false;
  });
});

document.querySelectorAll('.install-btn').forEach(button => {
  button.style.display = 'none';
  button.disabled = true;

  button.addEventListener('click', async () => {
    if (!deferredPrompt) {
      alert('Install prompt not available yet.');
      return;
    }
    deferredPrompt.prompt();
    const choiceResult = await deferredPrompt.userChoice;

    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }

    deferredPrompt = null;
    document.querySelectorAll('.install-btn').forEach(btn => {
      btn.style.display = 'none';
      btn.disabled = true;
    });
  });
});


