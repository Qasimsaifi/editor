<script>
  import Editors from "../components/Editors.svelte";
  import Preview from "../components/Preview.svelte";
  import { fullscreenStore } from "../store/fullscreenStore";
  export let htmlCode = "";
  export let cssCode = "";
  export let jsCode = "";
  let isFullScreen;
  fullscreenStore.subscribe((value) => {
    isFullScreen = value; // Log the value whenever it changes
  });

  if (typeof localStorage !== "undefined") {
    htmlCode =
      localStorage.getItem("htmlCode") ||
      `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Task Manager</title>
</head>
<body>
    <div class="container">
        <h1>Task Manager</h1>
        <div class="task-form">
            <input type="text" id="taskInput" placeholder="Add a new task">
            <button id="addTaskBtn">Add Task</button>
        </div>
        <ul id="taskList"></ul>
    </div>
</body>
</html>

`;

    cssCode =
      localStorage.getItem("cssCode") ||
      `body {
    font-family: 'Arial', sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 0;
}

.container {
    max-width: 500px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
    padding: 20px;
    text-align: center;
}

h1 {
    color: #333;
    font-size: 28px;
    margin-bottom: 20px;
}

.task-form {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
}

input[type="text"] {
    flex: 1;
    padding: 10px;
    border: none;
    border-bottom: 2px solid #333;
    border-radius: 0;
    font-size: 16px;
    margin-right: 10px;
    outline: none;
}

button {
    padding: 10px 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

button:hover {
    background-color: #555;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
    background-color: #f0f0f0;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.completed {
    text-decoration: line-through;
    color: #888;
}

`;

    jsCode =
      localStorage.getItem("jsCode") ||
      `document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            const li = document.createElement("li");
            const taskTextSpan = document.createElement("span");
            taskTextSpan.textContent =taskText;

            const removeBtn = document.createElement("button");
            removeBtn.textContent = "Remove";
            removeBtn.addEventListener("click", function () {
                li.remove();
            });

            const completeBtn = document.createElement("button");
            completeBtn.textContent = "Complete";
            completeBtn.addEventListener("click", function () {
                taskTextSpan.classList.toggle("completed");
            });

            li.appendChild(taskTextSpan);
            li.appendChild(removeBtn);
            li.appendChild(completeBtn);

            taskList.appendChild(li);
            taskInput.value = "";
        }
    });
});
`;
  }
  function updateCode(newHtmlCode, newCssCode, newJsCode) {
    htmlCode = newHtmlCode;
    cssCode = newCssCode;
    jsCode = newJsCode;
  }
</script>

{#if isFullScreen}
  <Editors bind:htmlCode bind:cssCode bind:jsCode {updateCode} />
{:else}
  <div class="flex flex-col lg:flex-row h-screen">
    <div class="w-full lg:w-1/2">
      <Editors bind:htmlCode bind:cssCode bind:jsCode {updateCode} />
    </div>
    <div class="w-full lg:w-1/2">
      <Preview {htmlCode} {cssCode} {jsCode} />
    </div>
  </div>
{/if}
