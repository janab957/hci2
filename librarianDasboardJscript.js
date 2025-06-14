document.addEventListener("DOMContentLoaded", function () {
  // ORIGINAL DESKTOP FUNCTIONALITY - COMPLETELY PRESERVED
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");
  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");
  const bookingRequests = document.getElementById("booking-requests");

  // Desktop Notifications toggle - ORIGINAL CODE
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

  // Desktop Categories toggle - ORIGINAL CODE
  if (categoriesBtn && categoriesDropdown) {
    categoriesBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      categoriesDropdown.classList.toggle("hidden");

      // Close notifications if open
      if (notificationDropdown) {
        notificationDropdown.classList.add("hidden");
      }
      if (notificationToggle) {
        notificationToggle.classList.remove("bg-[#6D7F96]");
      }
    });
  }

  // Desktop Click outside to close both dropdowns - ORIGINAL CODE
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

  // Desktop Booking Requests redirect - ORIGINAL CODE
  if (bookingRequests) {
    bookingRequests.addEventListener("click", function () {
      window.location.href = "librarianBookingRequests.html";
    });
  }

  // NEW MOBILE FUNCTIONALITY - ADDED ONLY FOR MOBILE
  
  // Mobile elements
  const hamburger = document.getElementById("hamburger");
  const mobileSidebarOverlay = document.getElementById("mobile-sidebar-overlay");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const mobileNotificationToggle = document.getElementById("mobile-notification-toggle");
  const mobileNotificationScreen = document.getElementById("mobile-notification-screen");
  const mobileBackBtn = document.getElementById("mobile-back-btn");

  // Mobile hamburger menu functionality
  if (hamburger && mobileSidebarOverlay && mobileSidebar) {
    hamburger.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileSidebarOverlay.classList.remove("hidden");
      mobileSidebar.classList.add("open");
      
      // Close mobile notification if open
      if (mobileNotificationScreen) {
        mobileNotificationScreen.classList.add("hidden");
      }
    });

    // Add touch event for better mobile support
    hamburger.addEventListener("touchstart", function (e) {
      e.preventDefault();
      e.stopPropagation();
      mobileSidebarOverlay.classList.remove("hidden");
      mobileSidebar.classList.add("open");
      
      // Close mobile notification if open
      if (mobileNotificationScreen) {
        mobileNotificationScreen.classList.add("hidden");
      }
    });

    // Close mobile sidebar when clicking overlay
    mobileSidebarOverlay.addEventListener("click", function (e) {
      if (e.target === mobileSidebarOverlay) {
        mobileSidebarOverlay.classList.add("hidden");
        mobileSidebar.classList.remove("open");
      }
    });
  }

  // Mobile notification functionality
  if (mobileNotificationToggle && mobileNotificationScreen) {
    mobileNotificationToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      mobileNotificationScreen.classList.remove("hidden");
      
      // Close mobile sidebar if open
      if (mobileSidebarOverlay && mobileSidebar) {
        mobileSidebarOverlay.classList.add("hidden");
        mobileSidebar.classList.remove("open");
      }
    });

    // Add touch event for better mobile support
    mobileNotificationToggle.addEventListener("touchstart", function (e) {
      e.preventDefault();
      e.stopPropagation();
      mobileNotificationScreen.classList.remove("hidden");
      
      // Close mobile sidebar if open
      if (mobileSidebarOverlay && mobileSidebar) {
        mobileSidebarOverlay.classList.add("hidden");
        mobileSidebar.classList.remove("open");
      }
    });
  }

  // Mobile back button functionality
  if (mobileBackBtn && mobileNotificationScreen) {
    mobileBackBtn.addEventListener("click", function () {
      mobileNotificationScreen.classList.add("hidden");
    });

    // Add touch event for better mobile support
    mobileBackBtn.addEventListener("touchstart", function (e) {
      e.preventDefault();
      mobileNotificationScreen.classList.add("hidden");
    });
  }

  // Handle window resize for responsive behavior
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      // Desktop mode - hide mobile elements
      if (mobileSidebarOverlay && mobileSidebar) {
        mobileSidebarOverlay.classList.add("hidden");
        mobileSidebar.classList.remove("open");
      }
      if (mobileNotificationScreen) {
        mobileNotificationScreen.classList.add("hidden");
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

  // PWA Install functionality - NEW
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


