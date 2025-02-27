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

function openModal(name, height, weight, bust, waist, hips, image) {
  document.getElementById("modalName").textContent = name;
  document.getElementById("modalHeight").textContent = "Height: " + height;
  document.getElementById("modalWeight").textContent = "Weight: " + weight;
  document.getElementById("modalBust").textContent = "Bust: " + bust;
  document.getElementById("modalWaist").textContent = "Waist: " + waist;
  document.getElementById("modalHips").textContent = "Hips: " + hips;
  document.getElementById("modalImage").src = image;

  const modal = document.getElementById("modelModal");
  const content = document.getElementById("modalContent");
  modal.classList.remove("hidden");
  setTimeout(() => {
    content.classList.remove("scale-90", "opacity-0");
    content.classList.add("scale-100", "opacity-100");
  }, 50);
}

function closeModal() {
  const modal = document.getElementById("modelModal");
  const content = document.getElementById("modalContent");
  content.classList.remove("scale-100", "opacity-100");
  content.classList.add("scale-90", "opacity-0");
  setTimeout(() => {
    modal.classList.add("hidden");
  }, 300);
}

function selectModel(
  element,
  imgSrc,
  name,
  height,
  weight,
  bust,
  waist,
  hips,
  galleryImages
) {
  const allCards = document.querySelectorAll(".model-card");
  const selectedIndex = parseInt(element.dataset.index);

  allCards.forEach((card) => {
    const cardIndex = parseInt(card.dataset.index);
    if (cardIndex < selectedIndex) {
      card.classList.add("move-left");
    } else {
      card.classList.add("move-right");
    }
  });

  document.getElementById("mainImage").style.backgroundImage = `url(${imgSrc})`;
  document.getElementById("modalName").innerText = name;
  document.getElementById("modalHeight").innerText = height;
  document.getElementById("modalWeight").innerText = weight;
  document.getElementById("modalBust").innerText = bust;
  document.getElementById("modalWaist").innerText = waist;
  document.getElementById("modalHips").innerText = hips;
  // Ensure gallery images are assigned correctly to div4 to div8
  galleryImages.forEach((image, index) => {
    const divNumber = index + 4; // div4 to div8
    const div = document.querySelector(`.div${divNumber}`);
    if (div) {
      div.style.backgroundImage = `url(${image})`;
    }
  });

  document.getElementById("modelDetails").classList.remove("hidden");
  setTimeout(() => {
    document.getElementById("modalContainer").classList.add("show");
  }, 200);
}

function closeModal() {
  document.getElementById("modalContainer").classList.remove("show");
  setTimeout(() => {
    document.getElementById("modelDetails").classList.add("hidden");
  }, 200);

  document.querySelectorAll(".model-card").forEach((card) => {
    card.classList.remove("move-left", "move-right", "centered-card");
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const aboutSection = document.querySelector(".about-section");

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          aboutSection.classList.add("show");

          observer.unobserve(entry.target); // Stop observing once it's shown
        }
      });
    },
    { threshold: 0.6 } // Trigger when 20% of the section is visible
  );

  observer.observe(aboutSection);
});
