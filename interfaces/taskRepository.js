export class TaskRepository {
    getTasks() {}; // hole alle Tasks
    getTaskById(id) {}; // hole genau einen Task über die ID
    addTask(task) {}; // füge einen Task hinzu
    updateTask(id) {}; // aktualisiere einen Task
    deleteTask(id) {}; // lösche einen Task

    // weitere mögliche Operationen wären deleteAllTasks, filterTasks o.ä.
}