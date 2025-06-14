document.addEventListener("DOMContentLoaded", function () {
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");

  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");

  const bookingRequests = document.getElementById("booking-requests");

  // Hamburger menu functionality for mobile sidebar
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.getElementById("sidebar");

  if (hamburger && sidebar) {
    hamburger.addEventListener("click", function () {
      sidebar.classList.toggle("hidden");
      sidebar.classList.toggle("open");
    });
  }

  // Notifications toggle
  if (notificationToggle && notificationDropdown) {
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
      if (categoriesDropdown) {
        categoriesDropdown.classList.add("hidden");
      }
    });
  }

  // Categories toggle
  if (categoriesBtn && categoriesDropdown) {
    categoriesBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      categoriesDropdown.classList.toggle("hidden");

      // Close notifications if open
      if (notificationDropdown) {
        notificationDropdown.classList.add("hidden");
        notificationToggle.classList.remove("bg-[#6D7F96]");
      }
    });
  }

  // Click outside to close both dropdowns
  document.addEventListener("click", function (e) {
    if (notificationDropdown && notificationToggle) {
      if (
        !notificationDropdown.contains(e.target) &&
        !notificationToggle.contains(e.target)
      ) {
        notificationDropdown.classList.add("hidden");
        notificationToggle.classList.remove("bg-[#6D7F96]");
      }
    }

    if (categoriesDropdown && categoriesBtn) {
      if (
        !categoriesDropdown.contains(e.target) &&
        !categoriesBtn.contains(e.target)
      ) {
        categoriesDropdown.classList.add("hidden");
      }
    }
  });

  // Redirect to libranet3.html when "Booking Requests" is clicked
  if (bookingRequests) {
    bookingRequests.addEventListener("click", function () {
      window.location.href = "librarianBookingRequests.html";
    });
  }

  // Close mobile sidebar when clicking outside
  document.addEventListener("click", function (e) {
    if (sidebar && hamburger) {
      if (
        !sidebar.contains(e.target) &&
        !hamburger.contains(e.target) &&
        window.innerWidth <= 768
      ) {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("open");
      }
    }
  });

  // Handle window resize for responsive behavior
  window.addEventListener("resize", function () {
    if (sidebar) {
      if (window.innerWidth > 768) {
        sidebar.classList.remove("hidden");
        sidebar.classList.remove("open");
      } else {
        sidebar.classList.add("hidden");
        sidebar.classList.remove("open");
      }
    }
  });
});



