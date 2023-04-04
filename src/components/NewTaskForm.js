function NewTaskForm() {
  return (
    <form id="new-task-form">
      <input type="text" id="new-task-input" placeholder="Was hast du geplant?" />
      <input type="submit" id="new-task-submit" value="Task hinzufügen" />
    </form>
  );
}

export default NewTaskForm;
