import { useContext, useState, useEffect } from "react";
import { TaskContext } from "../App";
import TaskItem from "./TaskItem";
import { fetchTasks } from "../api";

function TaskList() {
  const { taskList, setTaskList } = useContext(TaskContext);

  const [serverTasks, setServerTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      try {
        const tasks = await fetchTasks();
        setServerTasks(tasks);
      } catch (error) {
        alert("Fehler beim Laden der Tasks.");
      }
    }
    getTasks();
  }, []);

  useEffect(() => {
    setTaskList(serverTasks);
  }, [serverTasks, setTaskList]);

  return (
    <div id="tasks">
      {taskList.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TaskList;
