document.addEventListener("DOMContentLoaded", function () {
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");
  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");
  const bookingRequests = document.getElementById("booking-requests");

  // Desktop dropdown functionality
  if (notificationToggle && notificationDropdown) {
    notificationToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      notificationDropdown.classList.toggle("hidden");
      notificationToggle.classList.toggle("bg-[#6D7F96]", !notificationDropdown.classList.contains("hidden"));
      categoriesDropdown?.classList.add("hidden");
    });
  }

  if (categoriesBtn && categoriesDropdown) {
    categoriesBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      categoriesDropdown.classList.toggle("hidden");
      notificationDropdown?.classList.add("hidden");
      notificationToggle?.classList.remove("bg-[#6D7F96]");
    });
  }

  document.addEventListener("click", function (e) {
    if (notificationDropdown && !notificationDropdown.contains(e.target) && !notificationToggle.contains(e.target)) {
      notificationDropdown.classList.add("hidden");
      notificationToggle.classList.remove("bg-[#6D7F96]");
    }
    if (categoriesDropdown && !categoriesDropdown.contains(e.target) && !categoriesBtn.contains(e.target)) {
      categoriesDropdown.classList.add("hidden");
    }
  });

  if (bookingRequests) {
    bookingRequests.addEventListener("click", function () {
      window.location.href = "librarianBookingRequests.html";
    });
  }

  // === Mobile additions ===
  const hamburger = document.getElementById("hamburger");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const mobileSidebarOverlay = document.getElementById("mobile-sidebar-overlay");
  const mobileNotificationToggle = document.getElementById("mobile-notification-toggle");
  const mobileNotificationScreen = document.getElementById("mobile-notification-screen");
  const mobileBackBtn = document.getElementById("mobile-back-btn");

  if (hamburger) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileSidebar.classList.add("open");
      mobileSidebarOverlay.classList.remove("hidden");
      mobileNotificationScreen?.classList.add("hidden");
    });
  }

  if (mobileSidebarOverlay) {
    mobileSidebarOverlay.addEventListener("click", function (e) {
      if (e.target === mobileSidebarOverlay) {
        mobileSidebar.classList.remove("open");
        mobileSidebarOverlay.classList.add("hidden");
      }
    });
  }

  if (mobileNotificationToggle) {
    mobileNotificationToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileNotificationScreen.classList.remove("hidden");
      mobileSidebar.classList.remove("open");
      mobileSidebarOverlay.classList.add("hidden");
    });
  }

  if (mobileBackBtn) {
    mobileBackBtn.addEventListener("click", function () {
      mobileNotificationScreen.classList.add("hidden");
    });
  }
});

