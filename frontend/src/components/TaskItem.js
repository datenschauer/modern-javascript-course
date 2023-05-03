import { useContext, useState, useRef } from "react";
import { TaskContext } from "../App";
import { deleteTask, updateTask } from "../api";

function TaskItem({ task }) {
  const { taskList, setTaskList } = useContext(TaskContext);
  const [editMode, setEditMode] = useState(false);
  const textInputRef = useRef(null);

  const handleDelete = async () => {
    try {
      await deleteTask(task.id);
      const newTaskList = taskList.filter((t) => t.id !== task.id);
      setTaskList(newTaskList);
    } catch (error) {
      alert("Fehler beim Löschen des Tasks.");
    }
  };

  const handleInputChange = (event) => {
    const newTaskList = taskList.map((t) => {
      if (t.id === task.id) {
        return { ...t, text: event.target.value };
      } else {
        return t;
      }
    });
    setTaskList(newTaskList);
  };

  const onToggleEditMode = async () => {
    if (editMode === true) {
      try {
        await updateTask(task.id, task.text);
      } catch (error) {
        alert("Fehler beim aktualisieren des Tasks.");
      }
    }
    setEditMode(!editMode);
    textInputRef.current.focus();
  };

  return (
    <div className="task">
      <input type="text" className="text" value={task.text} readOnly={!editMode} ref={textInputRef} onChange={handleInputChange} />
      <div className="task-actions">
        <button className="edit" onClick={onToggleEditMode}>
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
