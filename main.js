// Define Elements
const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const listElement = document.querySelector("#tasks");

function addEditListener(taskEditElement, taskInputElement) {
  taskEditElement.addEventListener("click", () => {
    if (taskEditElement.innerText.toLowerCase() == "edit") {
      taskInputElement.removeAttribute("readonly");
      // calling focus() on it will cause the cursor to be placed in the field, ready for the user to enter text.
      // he "readonly" attribute is deleted by this action
      taskInputElement.focus();
      taskEditElement.innerText = "Save";
    } else {
      taskInputElement.setAttribute("readonly", "readonly");
      taskEditElement.innerText = "Edit";
    }
  });
}

function addDeleteListener(taskDeleteElement, taskElement) {
  taskDeleteElement.addEventListener("click", () => {
    listElement.removeChild(taskElement);
  });
}

function addActionButtons(taskActionsElement, taskEditElement, taskDeleteElement) {
  taskEditElement.classList.add("edit");
  taskEditElement.innerHTML = "Edit";
  taskDeleteElement.classList.add("edit");
  taskDeleteElement.innerHTML = "Delete";

  taskActionsElement.appendChild(taskEditElement);
  taskActionsElement.appendChild(taskDeleteElement);
}

form.addEventListener("submit", (e) => {
  // When using the e.preventDefault(); method in a submit event, it prevents the default
  // action of the submit event from happening. In the case of a form submit event,
  // the default action is to submit the form data to the server and reload the page.
  e.preventDefault();
  const task = input.value;
  if (!task) {
    alert("Bitte gebe einen Task ein!");
  } else {
    // The document.createElement() method is used to create a new element in an HTML document.
    // It takes a single argument, which is the name of the element to be created, and returns a reference to the new element.
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");

    const taskContentElement = document.createElement("div");
    taskContentElement.classList.add("content");

    const taskInputElement = document.createElement("input");
    taskInputElement.classList.add("text");
    taskInputElement.type = "text";
    taskInputElement.value = task;

    // The task_input_el.setAttribute("readonly", "readonly") method sets the readonly attribute on the task_input_el element.
    // This means that the element will be displayed, but the user will not be able to interact with it or modify its content.
    taskInputElement.setAttribute("readonly", "readonly");

    // Add action buttons
    const taskActionsElement = document.createElement("div");
    taskActionsElement.classList.add("actions");

    const taskEditElement = document.createElement("button");
    const taskDeleteElement = document.createElement("button");

    addActionButtons(taskActionsElement, taskEditElement, taskDeleteElement);
    addEditListener(taskEditElement, taskInputElement);
    addDeleteListener(taskDeleteElement, taskElement);

    taskElement.appendChild(taskContentElement);
    taskContentElement.appendChild(taskInputElement);
    taskElement.appendChild(taskActionsElement);
    listElement.appendChild(taskElement);

    // Clear text input
    input.value = "";
  }
});
