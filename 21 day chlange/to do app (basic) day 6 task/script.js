function addTask() {
    const input = document.getElementById("inputtask");
    const taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return;
    }

    const taskList = document.getElementById("tasklist");

    const newTask = document.createElement("li");
    newTask.textContent = taskText;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
        taskList.removeChild(newTask);
    };

    newTask.appendChild(deleteBtn);
    taskList.appendChild(newTask);

    input.value = "";
}
