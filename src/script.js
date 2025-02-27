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

// DOM elements
const monthYear = document.getElementById("month-year");
const daysContainer = document.getElementById("days");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const appointmentPanel = document.getElementById("appointment-panel");
const closePanel = document.getElementById("close-panel");
const selectedDateEl = document.getElementById("selected-date");
const timeSlotsContainer = document.getElementById("time-slots");
const eventTitleInput = document.getElementById("eventTitle");
const eventDescriptionInput = document.getElementById("eventDescription");
const saveBtn = document.getElementById("saveBtn");
const eventsContainer = document.getElementById("events-container");
const overlay = document.getElementById("overlay");

// Variables
let currentDate = new Date();
let selectedDate = null;
let selectedTimeSlots = []; // Changed from a single value to an array
let events = JSON.parse(localStorage.getItem("calendarEvents")) || {};

// Available time slots (9 AM to 5 PM, hourly)
const availableTimeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

// Initialize calendar
function initCalendar() {
  renderCalendar();
  displayEvents();

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
  });

  closePanel.addEventListener("click", closeAppointmentPanel);
  overlay.addEventListener("click", closeAppointmentPanel);

  saveBtn.addEventListener("click", saveAppointment);
}

// Render calendar
function renderCalendar() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  monthYear.textContent = `${
    months[currentDate.getMonth()]
  } ${currentDate.getFullYear()}`;
  daysContainer.innerHTML = "";

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstDayIndex = firstDay.getDay();
  const totalDays = lastDay.getDate();
  const prevMonth = new Date(year, month, 0);
  const prevMonthDays = prevMonth.getDate();
  const today = new Date();

  // Days from previous month
  for (let i = firstDayIndex; i > 0; i--) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day", "other-month");
    dayEl.innerHTML = `<div class="day-num">${prevMonthDays - i + 1}</div>`;
    daysContainer.appendChild(dayEl);
  }

  // Days for current month
  for (let i = 1; i <= totalDays; i++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day");

    // Highlight today's date
    if (
      i === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayEl.classList.add("today");
    }

    dayEl.innerHTML = `<div class="day-num">${i}</div>`;

    // Format date key for the current day
    const dateStr = formatDateKey(new Date(year, month, i));

    // Calculate booked slots for the day
    let bookedSlots = [];
    if (events[dateStr]) {
      events[dateStr].forEach((event) => {
        if (event.times) {
          bookedSlots.push(...event.times);
        } else if (event.time) {
          bookedSlots.push(event.time);
        }
      });
      bookedSlots = [...new Set(bookedSlots)]; // Remove duplicates
    }

    // If all available time slots are booked, mark the day as fully booked
    if (bookedSlots.length === availableTimeSlots.length) {
      dayEl.classList.add("fully-booked");
    } else {
      // Otherwise, make the day clickable to schedule an appointment
      dayEl.addEventListener("click", () => {
        // Remove selected class from all days
        document.querySelectorAll(".day").forEach((day) => {
          day.classList.remove("selected");
        });

        dayEl.classList.add("selected");
        selectedDate = new Date(year, month, i);
        selectedTimeSlots = []; // Reset any previously selected time slots
        showAppointmentPanel();
      });
    }

    // Add event dot if there are any events
    if (events[dateStr] && events[dateStr].length > 0) {
      const eventDot = document.createElement("div");
      eventDot.classList.add("event-dot");
      dayEl.appendChild(eventDot);
    }

    daysContainer.appendChild(dayEl);
  }

  // Days for next month (to fill the calendar grid)
  const daysFromNextMonth = 42 - (firstDayIndex + totalDays);
  for (let i = 1; i <= daysFromNextMonth; i++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("day", "other-month");
    dayEl.innerHTML = `<div class="day-num">${i}</div>`;
    daysContainer.appendChild(dayEl);
  }
}

// Show appointment panel
function showAppointmentPanel() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  selectedDateEl.textContent = `Appointment for ${selectedDate.toLocaleDateString(
    "en-US",
    options
  )}`;
  eventTitleInput.value = "";
  eventDescriptionInput.value = "";
  selectedTimeSlots = []; // Reset the array for new selections
  generateTimeSlots();
  appointmentPanel.classList.add("active");
  overlay.classList.add("active");
}

// Close appointment panel
function closeAppointmentPanel() {
  appointmentPanel.classList.remove("active");
  overlay.classList.remove("active");
}

// Generate available time slots
function generateTimeSlots() {
  timeSlotsContainer.innerHTML = "";
  const dateKey = formatDateKey(selectedDate);
  let bookedSlots = [];
  if (events[dateKey]) {
    events[dateKey].forEach((event) => {
      // Handle events with multiple time slots
      if (event.times) {
        bookedSlots = bookedSlots.concat(event.times);
      } else if (event.time) {
        bookedSlots.push(event.time);
      }
    });
  }

  availableTimeSlots.forEach((time) => {
    const timeSlotEl = document.createElement("div");
    timeSlotEl.classList.add("time-slot");

    // Mark time slots as booked if they exist in bookedSlots
    if (bookedSlots.includes(time)) {
      timeSlotEl.classList.add("booked");
      timeSlotEl.textContent = `${time} (Booked)`;
    } else {
      timeSlotEl.textContent = time;

      // Toggle selection for multiple time slots
      timeSlotEl.addEventListener("click", () => {
        if (selectedTimeSlots.includes(time)) {
          // Deselect if already selected
          selectedTimeSlots = selectedTimeSlots.filter((t) => t !== time);
          timeSlotEl.classList.remove("selected");
        } else {
          // Select this time slot
          selectedTimeSlots.push(time);
          timeSlotEl.classList.add("selected");
        }
      });
    }
    timeSlotsContainer.appendChild(timeSlotEl);
  });
}

// Save appointment with multiple time slots
function saveAppointment() {
  if (!selectedDate || selectedTimeSlots.length === 0) {
    alert("Please select a date and at least one time slot.");
    return;
  }
  if (!eventTitleInput.value.trim()) {
    alert("Please enter an appointment title.");
    return;
  }

  const dateKey = formatDateKey(selectedDate);
  const newEvent = {
    title: eventTitleInput.value.trim(),
    description: eventDescriptionInput.value.trim(),
    times: selectedTimeSlots, // Save multiple selected time slots
    date: selectedDate,
  };

  if (!events[dateKey]) {
    events[dateKey] = [];
  }
  events[dateKey].push(newEvent);
  localStorage.setItem("calendarEvents", JSON.stringify(events));
  renderCalendar();
  displayEvents();
  closeAppointmentPanel();
  alert("Appointment saved successfully!");
}

// Display appointments
function displayEvents() {
  eventsContainer.innerHTML = "";
  const sortedDates = Object.keys(events).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  if (sortedDates.length === 0) {
    const noEvents = document.createElement("p");
    noEvents.textContent = "No appointments scheduled.";
    noEvents.style.color = "#6c757d";
    noEvents.style.textAlign = "center";
    noEvents.style.padding = "10px 0";
    eventsContainer.appendChild(noEvents);
    return;
  }

  sortedDates.forEach((dateKey) => {
    const dateEvents = events[dateKey];
    if (dateEvents.length > 0) {
      const dateParts = dateKey.split("-");
      const eventDate = new Date(
        parseInt(dateParts[0]),
        parseInt(dateParts[1]) - 1,
        parseInt(dateParts[2])
      );
      const options = { weekday: "short", month: "short", day: "numeric" };
      const formattedDate = eventDate.toLocaleDateString("en-US", options);

      dateEvents.forEach((event) => {
        const eventEl = document.createElement("div");
        eventEl.classList.add("event-item");

        const eventTitle = document.createElement("div");
        eventTitle.classList.add("event-title");
        eventTitle.textContent = event.title;

        const eventTime = document.createElement("div");
        eventTime.classList.add("event-time");
        // Join multiple time slots if available
        let timesText = event.times ? event.times.join(", ") : event.time;
        eventTime.textContent = `${formattedDate} at ${timesText}`;

        eventEl.appendChild(eventTitle);
        eventEl.appendChild(eventTime);

        if (event.description) {
          const eventDesc = document.createElement("div");
          eventDesc.classList.add("event-desc");
          eventDesc.textContent = event.description;
          eventEl.appendChild(eventDesc);
        }

        eventsContainer.appendChild(eventEl);
      });
    }
  });
}

// Format date as key (YYYY-MM-DD)
function formatDateKey(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Month is 0-indexed
  const day = date.getDate();
  return `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`;
}

// Initialize calendar on page load
window.addEventListener("DOMContentLoaded", initCalendar);
