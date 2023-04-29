export class TaskRepository {
    async getTasks() {}; // hole alle Tasks
    async addTask(task) {}; // füge einen Task hinzu
    async updateTask(id) {}; // aktualisiere einen Task
    async deleteTask(id) {}; // lösche einen Task

    // weitere mögliche Operationen wären deleteAllTasks, filterTasks o.ä.
}