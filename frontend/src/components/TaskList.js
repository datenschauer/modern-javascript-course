import { useContext } from "react";
import { TaskContext } from "../App";
import TaskItem from "./TaskItem";

function TaskList() {
  const { taskList } = useContext(TaskContext);
  return (
    <div className="task-list">
      <h2>Tasks</h2>
      <div id="tasks">
        {taskList.map((task) => (
          <TaskItem key={task.index} task={task} />
        ))}
      </div>
    </div>
  );
}

export default TaskList;
