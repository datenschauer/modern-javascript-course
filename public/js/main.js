"use strict";

let form = document.querySelector("#new-task-form");
let input = document.querySelector("#new-task-input");
let listElement = document.querySelector("#tasks");

const baseUrl = "http://localhost:3030"

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
      taskInputElement.setAttribute("readonly", "readonly");
      taskEditElement.innerText = "Bearbeiten";
      dbQuery(
        `${baseUrl}/api/tasks/${taskInputElement.id}`,
        "PUT",
        { text: taskInputElement.value },
        );
      }
    isInEditMode = !isInEditMode;
  });
}

function addDeleteListener(taskDeleteElement, taskElement) {
  taskDeleteElement.addEventListener("click", () => {
     const id = taskElement.firstChild.firstChild.id;
     dbQuery(
         `${baseUrl}/api/tasks/${id}`,
         "DELETE",
     )
     listElement.removeChild(taskElement);
  });
}

function addActionButtons(taskActionsElement, taskEditElement, taskDeleteElement) {
  taskEditElement.classList.add("edit");
  taskEditElement.innerHTML = "Bearbeiten";
  taskDeleteElement.classList.add("delete");
  taskDeleteElement.innerHTML = "Löschen";

  taskActionsElement.appendChild(taskEditElement);
  taskActionsElement.appendChild(taskDeleteElement);
}

async function createNewTask(text, id) {
  /*
  The document.createElement() method is used to create a new element in an HTML document.
  It takes a single argument, which is the name of the element to be created, and returns a reference to the new element.
  */
  let taskElement = document.createElement("div");
  taskElement.classList.add("task");

  let taskContentElement = document.createElement("div");
  taskContentElement.classList.add("content");

  let taskInputElement = document.createElement("input");
  taskInputElement.classList.add("text");
  taskInputElement.id = id ?? '0';
  taskInputElement.type = "text";
  taskInputElement.value = text;
  /*
  The taskInputElement.setAttribute("readonly", "readonly") method sets the readonly attribute on the taskInputElement element.
  This means that the element will be displayed, but the user will not be able to interact with it or modify its content.
  */
  taskInputElement.setAttribute("readonly", "readonly");

  // Add action buttons
  let taskActionsElement = document.createElement("div");
  taskActionsElement.classList.add("actions");

  let taskEditElement = document.createElement("button");
  let taskDeleteElement = document.createElement("button");

  addActionButtons(taskActionsElement, taskEditElement, taskDeleteElement);
  addEditListener(taskEditElement, taskInputElement);
  addDeleteListener(taskDeleteElement, taskElement);

  taskElement.appendChild(taskContentElement);
  taskContentElement.appendChild(taskInputElement);
  taskElement.appendChild(taskActionsElement);
  listElement.appendChild(taskElement);

  // wenn noch keine ID vorhanden war, müssen wir den Task auch auf dem Server anlegen
  if (taskInputElement.id === '0') {
    dbQuery(`${baseUrl}/api/tasks`, 'POST', {text: text})
        .then(response => response.json())
        .then(id => taskInputElement.id = id);
  }
}

form.addEventListener("submit", async (e) => {
  /*
    When using the e.preventDefault(); method in a submit event, it prevents the default
    action of the submit event from happening. In the case of a form submit event,
    the default action is to submit the form data to the server and reload the page.
  */
  e.preventDefault();
  let text = input.value;
  if (!text) {
    alert("Bitte gebe einen Task ein!");
  } else {
    await createNewTask(text);
    // Clear text input
    input.value = "";
  }
});

async function getInitialTasks() {
  const response = await fetch('http://localhost:3030/api/tasks');
  if (response) {
    const tasks = await response.json();
    for (let task of tasks) {
      await createNewTask(task.text, task.id);
    }
  }
}

document.addEventListener("DOMContentLoaded", getInitialTasks);

async function dbQuery (url, method, body={}, contentType="application/json") {
  try {
    return await fetch(url, {
      method: method,
      headers: {"Content-Type": contentType},
      body: JSON.stringify(body),
    })
  } catch (e) {
    console.log(e);
  }
}