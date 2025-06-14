document.addEventListener("DOMContentLoaded", function () {
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");
  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");

  if (notificationToggle && notificationDropdown) {
    notificationToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      notificationDropdown.classList.toggle("hidden");
    });
  }

  if (categoriesBtn && categoriesDropdown) {
    categoriesBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      categoriesDropdown.classList.toggle("hidden");
    });
  }

  document.addEventListener("click", function (e) {
    if (notificationDropdown && !notificationDropdown.contains(e.target) && !notificationToggle.contains(e.target)) {
      notificationDropdown.classList.add("hidden");
    }
    if (categoriesDropdown && !categoriesDropdown.contains(e.target) && !categoriesBtn.contains(e.target)) {
      categoriesDropdown.classList.add("hidden");
    }
  });

  // MOBILE FUNCTIONALITY
  const hamburger = document.getElementById("hamburger");
  const mobileSidebar = document.getElementById("mobile-sidebar");
  const mobileSidebarOverlay = document.getElementById("mobile-sidebar-overlay");
  const mobileNotificationToggle = document.getElementById("mobile-notification-toggle");
  const mobileNotificationScreen = document.getElementById("mobile-notification-screen");
  const mobileBackBtn = document.getElementById("mobile-back-btn");

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      mobileSidebar.classList.add("open");
      mobileSidebarOverlay.classList.remove("hidden");
    });
  }

  if (mobileSidebarOverlay) {
    mobileSidebarOverlay.addEventListener("click", () => {
      mobileSidebar.classList.remove("open");
      mobileSidebarOverlay.classList.add("hidden");
    });
  }

  if (mobileNotificationToggle && mobileNotificationScreen) {
    mobileNotificationToggle.addEventListener("click", () => {
      mobileNotificationScreen.classList.remove("hidden");
      mobileSidebar.classList.remove("open");
      mobileSidebarOverlay.classList.add("hidden");
    });
  }

  if (mobileBackBtn) {
    mobileBackBtn.addEventListener("click", () => {
      mobileNotificationScreen.classList.add("hidden");
    });
  }

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      mobileSidebar.classList.remove("open");
      mobileSidebarOverlay.classList.add("hidden");
      mobileNotificationScreen.classList.add("hidden");
    }
  });
});
