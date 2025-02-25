const modelsBtn = document.getElementById("models-btn");
const dropdownMenu = document.getElementById("dropdown-menu");
const dropdownIcon = document.getElementById("dropdown-icon");

modelsBtn.addEventListener("click", () => {
  dropdownMenu.classList.toggle("opacity-100");
  dropdownMenu.classList.toggle("visible");
  dropdownMenu.classList.toggle("opacity-0");
  dropdownMenu.classList.toggle("invisible");
  dropdownIcon.classList.toggle("rotate-180");
});

// Close dropdown when clicking outside
document.addEventListener("click", (event) => {
  if (
    !modelsBtn.contains(event.target) &&
    !dropdownMenu.contains(event.target)
  ) {
    dropdownMenu.classList.add("opacity-0", "invisible");
    dropdownMenu.classList.remove("opacity-100", "visible");
    dropdownIcon.classList.remove("rotate-180");
  }
});
