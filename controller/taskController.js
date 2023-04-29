import { Task } from "../entities/task.js";

export function getTasks(taskRepo) {
    return async function (req, res) {
        const tasks = await taskRepo.getTasks();
        res.json(tasks);
    }
}

export function addTask(taskRepo) {
    return async function (req, res) {
        const { text } = req.body;
        if (text && typeof text === 'string' && text.length <= 140) {
            const task = new Task(text);
            await taskRepo.addTask(task);
            res.json(task.id);
        } else {
            throw new Error('Task konnte nicht angelegt werden.');
        }
    }
}

export function updateTask(taskRepo) {
    return async function (req, res) {
        const { id } = req.params;
        const { text } = req.body;
        const task = new Task(text);
        task.id = id;
        await taskRepo.updateTask(task);
        res.json(id);
    }
}

export function deleteTask(taskRepo) {
    return async function (req, res) {
        const { id } = req.params;
        await taskRepo.deleteTask(id);
        res.json(id);
    }
}