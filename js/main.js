const form = document.querySelector("#new-task-form");
const input = document.querySelector("#new-task-input");
const taskList = document.querySelector("#tasks");

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

function createNewTask(enteredTask) {
  /*
  The document.createElement() method is used to create a new element in an HTML document.
  It takes a single argument, which is the name of the element to be created, and returns a reference to the new element.
  */
  const taskElement = document.createElement("div");
  taskElement.classList.add("task");

  const taskInputElement = document.createElement("input");
  taskInputElement.classList.add("text");
  taskInputElement.type = "text";
  taskInputElement.value = enteredTask;
  /*
  Alternative: taskInputElement.setAttribute("readonly", "readonly") method sets the readonly attribute on the taskInputElement element.
  This means that the element will be displayed, but the user will not be able to interact with it or modify its content.
  */
  taskInputElement.readOnly = true;

  // Add action buttons
  const taskActionsElement = document.createElement("div");
  taskActionsElement.classList.add("task-actions");

  const taskEditButton = document.createElement("button");
  const taskDeleteButton = document.createElement("button");

  taskEditButton.classList.add("edit");
  taskEditButton.innerHTML = "Bearbeiten";
  taskDeleteButton.classList.add("delete");
  taskDeleteButton.innerHTML = "Löschen";

  taskActionsElement.appendChild(taskEditButton);
  taskActionsElement.appendChild(taskDeleteButton);

  addEditListener(taskEditButton, taskInputElement);
  addDeleteListener(taskDeleteButton, taskElement);

  taskElement.appendChild(taskInputElement);
  taskElement.appendChild(taskActionsElement);
  taskList.appendChild(taskElement);
}

function addEditListener(taskEditButton, taskInputElement) {
  let isInEditMode = false;
  taskEditButton.addEventListener("click", () => {
    if (isInEditMode) {
      taskInputElement.readOnly = true;
      taskEditButton.innerHTML = "Bearbeiten";
    } else {
      taskInputElement.readOnly = false;
      /*
      Calling focus() on it will cause the cursor to be placed in the field, ready for the user to enter text.
      The "readonly" attribute is deleted by this action.
      */
      taskInputElement.focus();
      taskEditButton.innerHTML = "Speichern";
    }
    isInEditMode = !isInEditMode;
  });
}

function addDeleteListener(taskDeleteButton, taskElement) {
  taskDeleteButton.addEventListener("click", () => {
    taskList.removeChild(taskElement);
  });
}
