export class TaskRepository {
    async getTasks(userId) {}; // hole alle Tasks eines Users
    async addTask(taskObject) {}; // füge einen Task hinzu
    async updateTask(userId, taskId, text) {}; // aktualisiere einen Task
    async deleteTask(userId, taskId) {}; // lösche einen Task

    // weitere mögliche Operationen wären deleteAllTasks, filterTasks o.ä.
}