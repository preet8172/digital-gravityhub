const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");
const formatToggle = document.getElementById("formatToggle");
const themeToggle = document.getElementById("themeToggle");

let is24Hour = true;

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  let ampm = "";

  if (!is24Hour) {
    ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12 || 12;
  }

  const formattedTime = 
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ampm;

  timeEl.textContent = formattedTime;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(undefined, options);
}

formatToggle.addEventListener("click", () => {
  is24Hour = !is24Hour;
  formatToggle.textContent = is24Hour ? "Switch to 12H" : "Switch to 24H";
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent =
    document.body.classList.contains("dark") ? "☀ Light Mode" : "🌙 Dark Mode";
});

setInterval(updateClock, 1000);
updateClock();
