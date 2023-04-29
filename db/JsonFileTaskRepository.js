import fs from 'fs'; // wir wollen mit Async-Await arbeiten!
import path from 'path';
import { TaskRepository } from '../interfaces/taskRepository.js';

export class JsonFileTaskRepository extends TaskRepository {
    constructor(filename) {
        super();
        this.filename = path.resolve(filename);
        this.data = [];
        this.load();
    }

    load() {
        try {
            const data = fs.readFileSync(this.filename, 'utf8'); // option utf8, sonst Buffer!
            this.data = JSON.parse(data) ?? [];
        } catch (e) {
            console.log(`${this.filename} konnte nicht gelesen werden! Grund: ${e}`);
        }
    };

    save() {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.data));
        } catch (e) {
            console.log(`${this.filename} konnte nicht geschrieben werden! Grund: ${e}`);
        }
    };

    async getTasks() {
        return this.data;
    };

    async addTask( task ) {
        this.data.push(task);
        console.log(`Task mit Id ${task.id} wurde angelegt`);
        this.save();
    };

    async updateTask(task) {
        const index = this.data.findIndex(t => t.id === task.id);
        if (index > 0) {
            this.data[index] = task;
            this.save();
        } else {
            throw new Error(`Task mit id ${task.id} konnte nicht gefunden werden.`);
        }
    };

    async deleteTask(id) {
        this.data = this.data.filter(t => t.id !== id);
        this.save();
    };
}