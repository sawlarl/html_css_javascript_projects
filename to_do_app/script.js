const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") addTask();
});

// Add Task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    createTask(taskText);
    saveTask(taskText);
    taskInput.value = "";
}

function createTask(text) {
    const li = document.createElement("li");
    li.className = "task";

    li.innerHTML = `
        <span class="task-text">${text}</span>
        <div class="actions">
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        </div>
    `;

    // Complete task
    li.querySelector(".task-text").addEventListener("click", () => {
        li.classList.toggle("completed");
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
        removeTask(text);
        li.remove();
    });

    // Edit task
    li.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit task:", text);
        if (newText && newText.trim() !== "") {
            updateTask(text, newText);
            li.querySelector(".task-text").textContent = newText;
        }
    });

    taskList.appendChild(li);
}

// Save to LocalStorage
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update edited task in LocalStorage
function updateTask(oldText, newText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const index = tasks.indexOf(oldText);
    if (index !== -1) {
        tasks[index] = newText;
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Remove task from LocalStorage
function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks on start
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(t => createTask(t));
}

// DARK MODE FUNCTIONALITY
const toggleBtn = document.getElementById("theme-toggle");

// Load saved mode
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        toggleBtn.textContent = "☀ Light Mode";
    }

    loadTasks(); // already in your script
});

// Toggle dark mode
toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        toggleBtn.textContent = "Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        toggleBtn.textContent = "🌙 Dark Mode";
    }
});
