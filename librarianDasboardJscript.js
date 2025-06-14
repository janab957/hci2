document.addEventListener("DOMContentLoaded", function () {
  // Desktop elements
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");
  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");
  const bookingRequests = document.getElementById("booking-requests");

  // Mobile elements
  const hamburger = document.getElementById("hamburger");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const mobileNotificationToggle = document.getElementById("mobile-notification-toggle");
  const mobileNotificationDropdown = document.getElementById("mobile-notification-dropdown");
  const mobileBackBtn = document.getElementById("mobile-back-btn");

  // Hamburger menu functionality for mobile sidebar
  if (hamburger && mobileSidebar) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileSidebar.classList.toggle("open");
      // Close mobile notification if open
      if (mobileNotificationDropdown) {
        mobileNotificationDropdown.classList.add("hidden");
      }
    });
  }

  // Mobile notification toggle
  if (mobileNotificationToggle && mobileNotificationDropdown) {
    mobileNotificationToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileNotificationDropdown.classList.toggle("hidden");
      // Close mobile sidebar if open
      if (mobileSidebar) {
        mobileSidebar.classList.remove("open");
      }
    });
  }

  // Mobile back button
  if (mobileBackBtn && mobileNotificationDropdown) {
    mobileBackBtn.addEventListener("click", function () {
      mobileNotificationDropdown.classList.add("hidden");
    });
  }

  // Desktop notifications toggle
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

  // Desktop categories toggle
  if (categoriesBtn && categoriesDropdown) {
    categoriesBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      categoriesDropdown.classList.toggle("hidden");

      // Close notifications if open
      if (notificationDropdown) {
        notificationDropdown.classList.add("hidden");
        if (notificationToggle) {
          notificationToggle.classList.remove("bg-[#6D7F96]");
        }
      }
    });
  }

  // Click outside to close dropdowns and mobile elements
  document.addEventListener("click", function (e) {
    // Close desktop notification dropdown
    if (notificationDropdown && notificationToggle) {
      if (
        !notificationDropdown.contains(e.target) &&
        !notificationToggle.contains(e.target)
      ) {
        notificationDropdown.classList.add("hidden");
        notificationToggle.classList.remove("bg-[#6D7F96]");
      }
    }

    // Close desktop categories dropdown
    if (categoriesDropdown && categoriesBtn) {
      if (
        !categoriesDropdown.contains(e.target) &&
        !categoriesBtn.contains(e.target)
      ) {
        categoriesDropdown.classList.add("hidden");
      }
    }

    // Close mobile sidebar
    if (mobileSidebar && hamburger) {
      if (
        !mobileSidebar.contains(e.target) &&
        !hamburger.contains(e.target) &&
        window.innerWidth <= 768
      ) {
        mobileSidebar.classList.remove("open");
      }
    }

    // Close mobile notification dropdown
    if (mobileNotificationDropdown && mobileNotificationToggle) {
      if (
        !mobileNotificationDropdown.contains(e.target) &&
        !mobileNotificationToggle.contains(e.target) &&
        window.innerWidth <= 768
      ) {
        mobileNotificationDropdown.classList.add("hidden");
      }
    }
  });

  // Redirect to booking requests page
  if (bookingRequests) {
    bookingRequests.addEventListener("click", function () {
      window.location.href = "librarianBookingRequests.html";
    });
  }

  // Handle window resize for responsive behavior
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      // Desktop mode - hide mobile elements
      if (mobileSidebar) {
        mobileSidebar.classList.remove("open");
      }
      if (mobileNotificationDropdown) {
        mobileNotificationDropdown.classList.add("hidden");
      }
    } else {
      // Mobile mode - hide desktop dropdowns
      if (notificationDropdown) {
        notificationDropdown.classList.add("hidden");
      }
      if (categoriesDropdown) {
        categoriesDropdown.classList.add("hidden");
      }
      if (notificationToggle) {
        notificationToggle.classList.remove("bg-[#6D7F96]");
      }
    }
  });

  // PWA Install functionality
  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Save the event for later use
    deferredPrompt = e;

    // Show all install buttons
    document.querySelectorAll('.install-btn').forEach(btn => {
      btn.style.display = 'inline-flex';
      btn.disabled = false;
    });
  });

  document.querySelectorAll('.install-btn').forEach(button => {
    // Initially hide install buttons until prompt is available
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
});




