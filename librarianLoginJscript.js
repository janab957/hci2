// Hamburger menu functionality
const hamburger = document.getElementById(\'hamburger\');
const sidebar = document.getElementById(\'sidebar\');

hamburger.addEventListener(\'click\', () => {
  sidebar.classList.toggle(\'hidden\');
  sidebar.classList.toggle(\'open\');
});
