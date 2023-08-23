// adding task
function addTask():void{
    const addedTasks = new Set<string>();
    const addButton = document.getElementById("addButton") as HTMLButtonElement;
    const taskList = document.getElementById("taskList") as HTMLDivElement;
    const searchInput = document.getElementById("searchInput") as HTMLInputElement;
    addButton.addEventListener("click", addTask);
    searchInput.addEventListener("input", searchTasks);
    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const taskText = taskInput.value.trim();

      // check if the task is empty
      if (taskText === ""){
        return;
      }
      if (addedTasks.has(taskText) && !isCompletedSelected()){
        return;
      }

      // div to store all element
      addedTasks.add(taskText);
    
      const taskItem = document.createElement("div");
      taskItem.classList.add("todo-item");
    
      //checkbox
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.classList.add("checkbox");
      taskItem.appendChild(checkbox);
    
      // to-do text
      const taskTextElement = document.createElement("span");
      taskTextElement.textContent = taskText;
      taskTextElement.classList.add("task-text");
      taskItem.appendChild(taskTextElement);
    
      // dropdown
      const statusDropdown = document.createElement("select");
      statusDropdown.classList.add("status-dropdown");
      const statusOptions = ["To-Do", "In Progress", "Completed"];
      statusOptions.forEach((option) => {
        const statusOption = document.createElement("option");
        statusOption.value = option;
        statusOption.textContent = option;
        statusDropdown.appendChild(statusOption);
      });
      taskItem.appendChild(statusDropdown);
    
      // delete task
      const deleteButton = document.createElement("span");
      deleteButton.textContent = "Delete";
      deleteButton.classList.add("delete-button", "btn", "btn-secondary");
      deleteButton.addEventListener("click", () => {
        taskItem.remove();
      });
    
      // to-do text strike
      statusDropdown.addEventListener("change", function() {
        const selectedStatus = this.value;
    
        if (selectedStatus === "Completed"){
          checkbox.checked = true;
          taskTextElement.style.textDecoration = "line-through";
        } else {
          checkbox.checked = false;
          taskTextElement.style.textDecoration = "none";
        }
      });
    
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
      taskInput.value = "";
    }
    
    // check if the task is completed
    function isCompletedSelected():boolean{
      const statusDropdown = document.querySelector(".status-dropdown") as HTMLSelectElement;
      return statusDropdown.value === "Completed";
    }
    
    // searchTasks
    function searchTasks():void{
      const searchText = searchInput.value.trim().toLowerCase();
      const taskItems = Array.from(taskList.getElementsByClassName("todo-item"));
    
      taskItems.forEach((taskItem) => {
        const taskTextElement = taskItem.querySelector("span") as HTMLSpanElement;
        const taskText = taskTextElement.textContent.toLowerCase();
    
        if (taskText.includes(searchText)){
          taskItem.style.display = "flex";
        } else {
          taskItem.style.display = "none";
        }
      });
    }