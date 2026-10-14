const data = [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "MongoDB",
    "Python",
    "Java",
    "C++",
    "Bootstrap",
    "Tailwind CSS"
];

const searchInput = document.getElementById("searchInput");
const results = document.getElementById("results");

function debounce(func, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

function searchItems() {
    const query = searchInput.value.toLowerCase();

    const filtered = data.filter(item =>
        item.toLowerCase().includes(query)
    );

    displayResults(filtered);
}

function displayResults(items) {
    results.innerHTML = "";

    if (items.length === 0) {
        results.innerHTML = "<p>No results found</p>";
        return;
    }

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("item");
        div.textContent = item;
        results.appendChild(div);
    });
}

const debouncedSearch = debounce(searchItems, 500);

searchInput.addEventListener("input", debouncedSearch);

displayResults(data);