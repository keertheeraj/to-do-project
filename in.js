// adding task
function addTask(){
    var addedTasks = new Set();
    var addButton = document.getElementById("addButton");
    var taskList = document.getElementById("taskList");
    var searchInput = document.getElementById("searchInput");
    addButton.addEventListener("click", addTask);
    searchInput.addEventListener("input", searchTasks);
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    // check if the task is empty
    if (taskText === "") {
        return;
    }
    if (addedTasks.has(taskText) && !isCompletedSelected()) {
        return;
    }
    // div to store all element
    addedTasks.add(taskText);
    var taskItem = document.createElement("div");
    taskItem.classList.add("todo-item");
    //checkbox
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("checkbox");
    taskItem.appendChild(checkbox);
    // to-do text
    var taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskTextElement.classList.add("task-text");
    taskItem.appendChild(taskTextElement);
    // dropdown
    var statusDropdown = document.createElement("select");
    statusDropdown.classList.add("status-dropdown");
    var statusOptions = ["To-Do", "In Progress", "Completed"];
    statusOptions.forEach(function (option) {
        var statusOption = document.createElement("option");
        statusOption.value = option;
        statusOption.textContent = option;
        statusDropdown.appendChild(statusOption);
    });
    taskItem.appendChild(statusDropdown);
    // delete task
    var deleteButton = document.createElement("span");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("delete-button", "btn", "btn-secondary");
    deleteButton.addEventListener("click", function () {
        taskItem.remove();
    });
    // to-do text strike
    statusDropdown.addEventListener("change", function () {
        var selectedStatus = this.value;
        if (selectedStatus === "Completed") {
            checkbox.checked = true;
            taskTextElement.style.textDecoration = "line-through";
        }
        else {
            checkbox.checked = false;
            taskTextElement.style.textDecoration = "none";
        }
    });
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
    taskInput.value = "";
}
// check if the task is completed
function isCompletedSelected() {
    var statusDropdown = document.querySelector(".status-dropdown");
    return statusDropdown.value === "Completed";
}
// searchTasks
function searchTasks() {
    var searchText = searchInput.value.trim().toLowerCase();
    var taskItems = Array.from(taskList.getElementsByClassName("todo-item"));
    taskItems.forEach(function (taskItem) {
        var taskTextElement = taskItem.querySelector("span");
        var taskText = taskTextElement.textContent.toLowerCase();
        if (taskText.includes(searchText)) {
            taskItem.style.display = "flex";
        }
        else {
            taskItem.style.display = "none";
        }
    });
}