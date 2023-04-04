import { useContext } from "react";
import { TaskContext } from "../App";

function TaskItem({ task }) {
  const { taskList, setTaskList } = useContext(TaskContext);

  const handleDelete = () => {
    const newTaskList = taskList.filter((t) => t.index !== task.index);
    setTaskList(newTaskList);
  };

  return (
    <div className="task">
      <div className="content">
        <input type="text" className="text" value={task.taskText} readOnly />
      </div>
      <div className="actions">
        <button className="edit">Bearbeiten</button>
        <button className="delete" onClick={handleDelete}>
          Löschen
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
