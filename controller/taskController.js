import { Task } from "../entities/task.js";

export function getTasks(taskRepo) {
    return async function (req, res) {
        try {
            const { userId } = req.params;
            const tasks = await taskRepo.getTasks(userId);
            res.json(tasks);
        } catch (e) {
           res.status(404).send(e);
        }
    }
}

export function addTask(taskRepo) {
    return async function (req, res) {
        const { userId } = req.params;
        const { text } = req.body;
        if (text && typeof text === 'string' && text.length <= 140) {
            const task = new Task(userId, text);
            await taskRepo.addTask(task);
            res.json(JSON.stringify(task));
        } else {
            throw new Error('Task konnte nicht angelegt werden.');
        }
    }
}

export function updateTask(taskRepo) {
    return async function (req, res) {
        try {
            const { userId, id } = req.params;
            const { text } = req.body;
            await taskRepo.updateTask(userId, id, text);
            res.send("done!");
        } catch (e) {
            res.status(404).send(e)
        }
    }
}

export function deleteTask(taskRepo) {
    return async function (req, res) {
        try {
            const { userId, id } = req.params;
            await taskRepo.deleteTask(userId, id);
            res.json(id);
        } catch (e) {
           res.status(404).send(e)
        }
    }
}