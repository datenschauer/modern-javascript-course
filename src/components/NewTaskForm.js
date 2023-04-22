import { useState, useContext } from "react";
import { TaskContext } from "../App";

function NewTaskForm() {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [taskInput, setTaskInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default form submission behavior
  
    // check if taskInput is empty
    if (!taskInput.trim()) {
      alert("Please enter a task!");
      return; // stop execution of the function
    }
  
    const newTaskList = [...taskList, { index: taskList.length, taskText: taskInput }];
    setTaskList(newTaskList);
    setTaskInput(""); // clear the input state
  };
  

  return (
    <form id="new-task-form" onSubmit={handleSubmit}>
      <input type="text" id="new-task-input" placeholder="Was hast du geplant?" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
      <input type="submit" id="new-task-submit" value="Task hinzufügen" />
    </form>
  );
}

export default NewTaskForm;
