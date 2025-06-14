document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM loaded - initializing desktop functionality");

  // ORIGINAL DESKTOP FUNCTIONALITY - COMPLETELY PRESERVED
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");
  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");
  const bookingRequests = document.getElementById("booking-requests");

  console.log("Desktop elements found:", {
    notificationToggle: !!notificationToggle,
    notificationDropdown: !!notificationDropdown,
    categoriesBtn: !!categoriesBtn,
    categoriesDropdown: !!categoriesDropdown,
    bookingRequests: !!bookingRequests
  });

  // Desktop Notifications toggle - ORIGINAL CODE
  if (notificationToggle && notificationDropdown) {
    console.log("Setting up notification toggle");
    notificationToggle.addEventListener("click", function (e) {
      console.log("Notification toggle clicked");
      e.stopPropagation();
      notificationDropdown.classList.toggle("hidden");

      // Toggle highlight class (like hover fill)
      if (notificationDropdown.classList.contains("hidden")) {
        notificationToggle.classList.remove("bg-[#6D7F96]");
        console.log("Notification dropdown hidden");
      } else {
        notificationToggle.classList.add("bg-[#6D7F96]");
        console.log("Notification dropdown shown");
      }

      // Close categories if open
      if (categoriesDropdown) {
        categoriesDropdown.classList.add("hidden");
      }
    });
  } else {
    console.error("Notification elements not found!");
  }

  // Desktop Categories toggle - ORIGINAL CODE
  if (categoriesBtn && categoriesDropdown) {
    console.log("Setting up categories toggle");
    categoriesBtn.addEventListener("click", function (e) {
      console.log("Categories button clicked");
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
  } else {
    console.error("Categories elements not found!");
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
      console.log("Booking requests clicked");
      window.location.href = "librarianBookingRequests.html";
    });
  }

  // Install Button functionality - FIXED
  const installButtons = document.querySelectorAll('.install-btn');
  console.log("Install buttons found:", installButtons.length);

  // Show install buttons by default for testing
  installButtons.forEach(button => {
    button.style.display = 'inline-flex';
    button.disabled = false;
    console.log("Install button made visible");
  });

  let deferredPrompt;

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log("Before install prompt event fired");
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Save the event for later use
    deferredPrompt = e;

    // Show all install buttons
    installButtons.forEach(btn => {
      btn.style.display = 'inline-flex';
      btn.disabled = false;
    });
  });

  installButtons.forEach(button => {
    button.addEventListener('click', async () => {
      console.log("Install button clicked");
      
      if (!deferredPrompt) {
        console.log("No deferred prompt available, showing fallback");
        alert('Install prompt not available. This feature works when the site is served over HTTPS and meets PWA criteria.');
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
      installButtons.forEach(btn => {
        btn.style.display = 'none';
        btn.disabled = true;
      });
    });
  });

  // NEW MOBILE FUNCTIONALITY - ADDED ONLY FOR MOBILE
  
  // Mobile elements
  const hamburger = document.getElementById("hamburger");
  const mobileSidebarOverlay = document.getElementById("mobile-sidebar-overlay");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const mobileNotificationToggle = document.getElementById("mobile-notification-toggle");
  const mobileNotificationScreen = document.getElementById("mobile-notification-screen");
  const mobileBackBtn = document.getElementById("mobile-back-btn");

  console.log("Mobile elements found:", {
    hamburger: !!hamburger,
    mobileSidebarOverlay: !!mobileSidebarOverlay,
    mobileSidebar: !!mobileSidebar,
    mobileNotificationToggle: !!mobileNotificationToggle,
    mobileNotificationScreen: !!mobileNotificationScreen,
    mobileBackBtn: !!mobileBackBtn
  });

  // Mobile hamburger menu functionality
  if (hamburger && mobileSidebarOverlay && mobileSidebar) {
    hamburger.addEventListener("click", function (e) {
      console.log("Mobile hamburger clicked");
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
      console.log("Mobile hamburger touched");
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
        console.log("Mobile sidebar overlay clicked - closing");
        mobileSidebarOverlay.classList.add("hidden");
        mobileSidebar.classList.remove("open");
      }
    });
  }

  // Mobile notification functionality
  if (mobileNotificationToggle && mobileNotificationScreen) {
    mobileNotificationToggle.addEventListener("click", function (e) {
      console.log("Mobile notification toggle clicked");
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
      console.log("Mobile notification toggle touched");
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
      console.log("Mobile back button clicked");
      mobileNotificationScreen.classList.add("hidden");
    });

    // Add touch event for better mobile support
    mobileBackBtn.addEventListener("touchstart", function (e) {
      console.log("Mobile back button touched");
      e.preventDefault();
      mobileNotificationScreen.classList.add("hidden");
    });
  }

  // Handle window resize for responsive behavior
  window.addEventListener("resize", function () {
    console.log("Window resized to:", window.innerWidth);
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

  console.log("All event listeners set up successfully");
});


