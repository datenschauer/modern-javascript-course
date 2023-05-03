const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const listElement = document.querySelector("#tasks");

form.addEventListener("submit", (e) => {
  /*
    When using the e.preventDefault(); method in a submit event, it prevents the default
    action of the submit event from happening. The default action of the submit event is a GET-request and it will also reload the page.
  */
  e.preventDefault();
  const enteredTask = input.value;
  if (!enteredTask) {
    alert("Bitte gebe einen Task ein!");
  } else {
    createNewTask(enteredTask);
    // Clear text input
    input.value = "";
  }
});

function addEditListener(taskEditElement, taskInputElement) {
  let isInEditMode = false;
  taskEditElement.addEventListener("click", () => {
    if (!isInEditMode) {
      taskInputElement.removeAttribute("readonly");
      /*
      Calling focus() on it will cause the cursor to be placed in the field, ready for the user to enter text.
      The "readonly" attribute is deleted by this action.
      */
      taskInputElement.focus();
      taskEditElement.innerText = "Speichern";
    } else {
      taskInputElement.readOnly = true;
      taskEditElement.innerText = "Bearbeiten";
    }
    isInEditMode = !isInEditMode;
  });
}

function addDeleteListener(taskDeleteElement, taskElement) {
  taskDeleteElement.addEventListener("click", () => {
    listElement.removeChild(taskElement);
  });
}

function createNewTask(task) {
  /*
  The document.createElement() method is used to create a new element in an HTML document.
  It takes a single argument, which is the name of the element to be created, and returns a reference to the new element.
  */
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const taskInputElement = document.createElement("input");
  taskInputElement.classList.add("text");
  taskInputElement.type = "text";
  taskInputElement.value = task;
  /*
  The taskInputElement.setAttribute("readonly", "readonly") method sets the readonly attribute on the taskInputElement element.
  This means that the element will be displayed, but the user will not be able to interact with it or modify its content.
  */
  taskInputElement.setAttribute("readonly", "readonly");

  // Add action buttons
  const taskActionsElement = document.createElement("div");
  taskActionsElement.classList.add("task-actions");

  const taskEditElement = document.createElement("button");
  const taskDeleteElement = document.createElement("button");

  taskEditElement.classList.add("edit");
  taskEditElement.innerHTML = "Bearbeiten";
  taskDeleteElement.classList.add("delete");
  taskDeleteElement.innerHTML = "Löschen";

  taskActionsElement.appendChild(taskEditElement);
  taskActionsElement.appendChild(taskDeleteElement);

  addEditListener(taskEditElement, taskInputElement);
  addDeleteListener(taskDeleteElement, taskElement);

  taskElement.appendChild(taskInputElement);
  taskElement.appendChild(taskActionsElement);
  listElement.appendChild(taskElement);
}
