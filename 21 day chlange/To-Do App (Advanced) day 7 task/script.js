const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearCompleted = document.getElementById("clearCompleted");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateTaskCount() {
    taskCount.textContent = `${tasks.length} Tasks`;
}

function renderTasks() {

    taskList.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") return !task.completed;
        if (currentFilter === "completed") return task.completed;
        return true;
    });

    filteredTasks.forEach((task, index) => {

        const li = document.createElement("li");
        li.className = `task ${task.completed ? "completed" : ""}`;

        li.innerHTML = `
            <div class="task-left">
                <input type="checkbox" ${task.completed ? "checked" : ""}>
                <span>${task.text}</span>
            </div>

            <div>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </div>
        `;

        const checkbox = li.querySelector("input");
        const editBtn = li.querySelector(".edit-btn");
        const deleteBtn = li.querySelector(".delete-btn");

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            saveTasks();
            renderTasks();
        });

        editBtn.addEventListener("click", () => {
            const newText = prompt("Edit task:", task.text);

            if (newText !== null && newText.trim() !== "") {
                task.text = newText;
                saveTasks();
                renderTasks();
            }
        });

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        taskList.appendChild(li);
    });

    updateTaskCount();
}

function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text,
        completed: false
    });

    taskInput.value = "";

    saveTasks();
    renderTasks();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

clearCompleted.addEventListener("click", () => {
    tasks = tasks.filter(task => !task.completed);
    saveTasks();
    renderTasks();
});

filterButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        document.querySelector(".filter-btn.active")
            .classList.remove("active");

        btn.classList.add("active");

        currentFilter = btn.dataset.filter;

        renderTasks();
    });
});

renderTasks();