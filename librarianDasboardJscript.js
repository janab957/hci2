document.addEventListener("DOMContentLoaded", function () {
  const notificationToggle = document.getElementById("notification-btn");
  const notificationDropdown = document.getElementById("notification-dropdown");

  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");

  const bookingRequests = document.getElementById("booking-requests");

  // Notifications toggle
  notificationToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    notificationDropdown.classList.toggle("hidden");

    // Toggle highlight class
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

  // Redirect to booking page
  if (bookingRequests) {
    bookingRequests.addEventListener("click", function () {
      window.location.href = "librarianBookingRequests.html";
    });
  }
});



