function TaskItem() {
  return (
    <div class="task">
      <div class="content">
        <input type="text" class="text" value="Dies ist ein Beispiel für einen Task." readonly />
      </div>
      <div class="actions">
        <button class="edit">Bearbeiten</button>
        <button class="delete">Löschen</button>
      </div>
    </div>
  );
}

export default TaskItem;
