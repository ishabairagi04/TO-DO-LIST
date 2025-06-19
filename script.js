const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

window.onload = () => {
  const stored = JSON.parse(localStorage.getItem("tasks")) || [];
  stored.forEach(task => addTask(task.text, task.completed));
};

addBtn.addEventListener("click", () => {
  addTask();
});

function addTask(text = taskInput.value, completed = false) {
  if (!text.trim()) return;

  const li = document.createElement("li");
  li.className = `flex justify-between items-center p-3 bg-gray-200 rounded ${completed ? 'line-through text-gray-500' : ''}`;

  const taskText = document.createElement("span");
  taskText.textContent = text;
  li.appendChild(taskText);

  const btnGroup = document.createElement("div");
  btnGroup.className = "flex space-x-2";

  const btnComplete = document.createElement("button");
  btnComplete.textContent = "✓";
  btnComplete.className = "bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600";
  btnComplete.addEventListener("click", () => {
    li.classList.toggle("line-through");
    li.classList.toggle("text-gray-500");
    saveTasks();
  });

  const btnEdit = document.createElement("button");
  btnEdit.textContent = "✏️";
  btnEdit.className = "bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600";
  btnEdit.addEventListener("click", () => {
    const newText = prompt("Edit task:", taskText.textContent);
    if (newText !== null && newText.trim()) {
      taskText.textContent = newText.trim();
      saveTasks();
    }
  });

  const btnDelete = document.createElement("button");
  btnDelete.textContent = "🗑";
  btnDelete.className = "bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600";
  btnDelete.addEventListener("click", () => {
    taskList.removeChild(li);
    saveTasks();
  });

  btnGroup.appendChild(btnComplete);
  btnGroup.appendChild(btnEdit);
  btnGroup.appendChild(btnDelete);
  li.appendChild(btnGroup);
  taskList.appendChild(li);

  if (text === taskInput.value) taskInput.value = "";
  saveTasks();
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("#taskList li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.classList.contains("line-through");
    tasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
