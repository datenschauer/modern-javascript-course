const API_URL = "http://localhost:3030/tasks";

async function fetchTasks() {
  const response = await fetch(API_URL);
  return response.json();
}

async function addTask(taskText) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: taskText }),
  });
  return response.json();
}

async function deleteTask(taskId) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });

  return response.json();
}

async function updateTask(taskId, taskText) {
  const response = await fetch(`${API_URL}/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: taskText }),
  });
}

export { fetchTasks, addTask, deleteTask, updateTask };
