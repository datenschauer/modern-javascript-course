import fs from 'fs'; // wir wollen mit Async-Await arbeiten!
import path from 'path';
import {TaskRepository} from '../interfaces/taskRepository.js';

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

    getLatestId() {
        const latest = Math.max(...this.data.map(t => t.id));
        return latest > 0 ? latest : 0;
    };

    getTasks() {
        return this.data;
    };

    getTaskById(id) {
        const task = this.data.filter(t => t.id === id);
        if (task.length > 0) {
            return task;
        } else {
            console.log(`Task mit Id ${id} konnte nicht gefunden werden.`);
        }
    };

    addTask(task) {
        task.id = this.getLatestId() + 1;
        this.data.push(task);
        console.log(`Task mit Id ${task.id} wurde angelegt`);
        this.save();
    };

    updateTask(id, task) {
        const index = this.data.findIndex(t => t.id === id);
        if (index > 0) {
            this.data[index] = task;
            this.save();
        } else {
            throw new Error(`Task mit id ${id} konnte nicht gefunden werden.`);
        }
    };

    deleteTask(id) {
        this.data = this.data.filter(t => t.id !== id);
        this.save();
    };
}