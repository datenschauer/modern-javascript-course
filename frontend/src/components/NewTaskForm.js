import { useState, useContext } from "react";
import { TaskContext } from "../App";
import { addTask } from "../api";

function NewTaskForm() {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent default form submission behavior

    // check if taskInput is empty
    if (!taskInput.trim()) {
      alert("Bitte gebe den Namen des Tasks ein!");
      return; // stop execution of the function
    }

    try {
      const taskId = await addTask(taskInput);
      const newTaskList = [...taskList, { id: taskId, text: taskInput }];
      setTaskList(newTaskList);
      setTaskInput(""); // clear the input state
    } catch (error) {
      alert("Fehler beim Hinzufügen des Tasks.");
    }
  };

  return (
    <form id="new-task-form" onSubmit={handleSubmit}>
      <input type="text" id="new-task-input" placeholder="Was hast du geplant?" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
      <input type="submit" id="new-task-submit" value="Task hinzufügen" />
    </form>
  );
}

export default NewTaskForm;
