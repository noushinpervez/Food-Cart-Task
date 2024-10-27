// Select the mobile menu button
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

// Add event listener to the button
btn.addEventListener("click", () => {
  // Toggle the 'hidden' class on the mobile menu
  menu.classList.toggle("hidden");
});