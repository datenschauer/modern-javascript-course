import fs from 'fs'; // wir wollen mit Async-Await arbeiten!
import path from 'path';
import { TaskRepository } from '../interfaces/taskRepository.js';
import { flaschenpost } from "flaschenpost";

const logger = flaschenpost.getLogger();

export class JsonFileTaskRepository extends TaskRepository {
    constructor(filename) {
        super();
        this.filename = path.resolve(filename);
        this.data = null;
        this.load();
    }

    load() {
        try {
            const data = fs.readFileSync(this.filename, 'utf8'); // option utf8, sonst Buffer!
            this.data = JSON.parse(data) ?? [];
        } catch (e) {
            logger.warn(`${this.filename} konnte nicht gelesen werden! Grund: ${e}`);
        }
    };

    save() {
        try {
            fs.writeFileSync(this.filename, JSON.stringify(this.data));
        } catch (e) {
            logger.warn(`${this.filename} konnte nicht geschrieben werden! Grund: ${e}`);
        }
    };

    async getTasks() {
        return this.data;
    };

    async addTask( task ) {
        this.data.push(task);
        logger.info(`Task mit Id ${task.id} wurde angelegt`);
        this.save();
    };

    async updateTask(id, text) {
        const index = this.data.findIndex(t => t.id === id);
        if (index > -1) {
            this.data[index].text = text;
            this.save();
            logger.info(`Task mit Id ${id} upgedated.`)
        } else {
            throw new Error(`Task mit id ${id} konnte nicht gefunden werden.`);
        }
    };

    async deleteTask(id) {
        console.log(id);
        this.data = this.data.filter(t => t.id !== id);
        logger.info(`Task mit Id ${id} gelöscht.`)
        this.save();
    };
}