import { useContext, useState, useRef } from "react";
import { TaskContext } from "../App";

function TaskItem({ task }) {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [editMode, setEditMode] = useState(false);
  const textInputRef = useRef(null);

  const handleDelete = () => {
    const newTaskList = taskList.filter((t) => t.index !== task.index);
    setTaskList(newTaskList);
  };

  const handleInputChange = (event) => {
    const newTaskList = taskList.map((t) => {
      if (t.index === task.index) {
        return { ...t, taskText: event.target.value };
      } else {
        return t;
      }
    });
    setTaskList(newTaskList);
  };

  return (
    <div className="task">
      <input type="text" className="text" value={task.taskText} readOnly={!editMode} ref={textInputRef} onChange={handleInputChange} />
      <div className="actions">
        <button
          className="edit"
          onClick={() => {
            setEditMode(!editMode);
            textInputRef.current.focus();
          }}
        >
          {editMode ? "Speichern" : "Bearbeiten"}
        </button>
        <button className="delete" onClick={handleDelete}>
          Löschen
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
