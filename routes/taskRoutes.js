"use strict";

import express from 'express';
import { getTasks, addTask, updateTask, deleteTask } from '../controller/taskController.js';

export function taskRouter ( taskRepo ) {

    const router = express.Router();

    router.get('/tasks/:userId', getTasks(taskRepo));

    router.post('/task(s)?/:userId', addTask(taskRepo));

    router.put('/task(s)?/:userId/:id', updateTask(taskRepo));

    router.delete('/task(s)?/:userId/:id', deleteTask(taskRepo));

    return router;
}
