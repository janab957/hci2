document.addEventListener("DOMContentLoaded", function () {
  const notificationToggle = document.getElementById("notification-toggle");
  const notificationDropdown = document.getElementById("notification-dropdown");
  const categoriesBtn = document.getElementById("categories-btn");
  const categoriesDropdown = document.getElementById("categories-dropdown");
  const hamburger = document.getElementById("hamburger");
  const sidebar = document.querySelector(".side-nav");

  // 🔔 Toggle Notifications (Desktop)
  notificationToggle?.addEventListener("click", function (e) {
    e.stopPropagation();
    notificationDropdown?.classList.toggle("hidden");
    categoriesDropdown?.classList.add("hidden");
  });

  // 📁 Toggle Categories
  categoriesBtn?.addEventListener("click", function (e) {
    e.stopPropagation();
    categoriesDropdown?.classList.toggle("hidden");
    notificationDropdown?.classList.add("hidden");
  });

  // ❌ Close dropdowns when clicking outside
  document.addEventListener("click", function (e) {
    if (!notificationDropdown?.contains(e.target) && !notificationToggle?.contains(e.target)) {
      notificationDropdown?.classList.add("hidden");
    }
    if (!categoriesDropdown?.contains(e.target) && !categoriesBtn?.contains(e.target)) {
      categoriesDropdown?.classList.add("hidden");
    }
  });

  // 🍔 Mobile Sidebar Toggle
  if (hamburger && sidebar) {
    hamburger.addEventListener("click", () => {
      sidebar.classList.toggle("hidden");
    });
  }

  // 📥 Install LibraNet PWA
  let deferredPrompt;
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.querySelectorAll(".install-btn").forEach(btn => {
      btn.style.display = "inline-block";
      btn.disabled = false;
    });
  });

  document.querySelectorAll(".install-btn").forEach(button => {
    button.style.display = "none";
    button.disabled = true;

    button.addEventListener("click", async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      button.style.display = "none";
    });
  });
});


