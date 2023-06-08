"use strict";

import express from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../controller/taskController.js';

export function taskRouter ( taskRepo ) {

    const router = express.Router();

    router.get('/tasks', getTasks(taskRepo));

    router.post('/tasks', addTask(taskRepo));

    router.put('/task(s)?/:id', updateTask(taskRepo));

    router.delete('/task(s)?/:id', deleteTask(taskRepo));

    return router;
}
