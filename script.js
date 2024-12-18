document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("todo-form");
    const taskList = document.getElementById("task-list");
    const themeToggle = document.getElementById("theme-toggle");
  
    const loadTasks = () => {
      const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
      tasks.forEach(task => addTaskToDOM(task));
    };
  
    const saveTasks = () => {
      const tasks = Array.from(taskList.children).map(item => ({
        name: item.querySelector(".task-name").textContent,
        dueDate: item.querySelector(".task-date").textContent,
      }));
      localStorage.setItem("tasks", JSON.stringify(tasks));
    };
  
    const addTaskToDOM = ({ name, dueDate }) => {
      const li = document.createElement("li");
      li.classList.add("task-item");
  
      const taskName = document.createElement("span");
      taskName.classList.add("task-name");
      taskName.textContent = name;
  
      const taskDate = document.createElement("span");
      taskDate.classList.add("task-date");
      taskDate.textContent = dueDate;
  
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.onclick = () => {
        const newName = prompt("Edit task name:", name);
        const newDate = prompt("Edit due date (YYYY-MM-DD):", dueDate);
        if (newName && newDate) {
          taskName.textContent = newName;
          taskDate.textContent = newDate;
          checkOverdue(li, newDate);
          saveTasks();
        }
      };
  
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.onclick = () => {
        if (confirm("Are you sure you want to delete this task?")) {
          li.remove();
          saveTasks();
        }
      };
  
      li.append(taskName, taskDate, editBtn, deleteBtn);
      checkOverdue(li, dueDate);
      taskList.appendChild(li);
    };
  
    const checkOverdue = (taskItem, dueDate) => {
      const today = new Date().toISOString().split("T")[0];
      taskItem.classList.toggle("overdue", dueDate < today);
    };
  
    taskForm.onsubmit = event => {
      event.preventDefault();
      const name = document.getElementById("task-name").value;
      const dueDate = document.getElementById("due-date").value;
      addTaskToDOM({ name, dueDate });
      saveTasks();
      taskForm.reset();
    };
  
    themeToggle.onclick = () => {
      document.body.classList.toggle("dark-mode");
    };
  
    loadTasks();
  });
  