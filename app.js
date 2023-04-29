"use strict";

import express from "express";
import { taskRouter } from "./routes/taskRoutes.js";
import { indexRouter } from "./routes/index.js";
import path from "path";
import { __dirname } from "./dirname.js";
import { JsonFileTaskRepository } from './db/JsonFileTaskRepository.js';

const taskRepo = new JsonFileTaskRepository('./db/tasks.json');

const app = express();

// HIER definieren wir die Middleware, die wir verwenden wollen mit app.use()
// wir wollen JSON verarbeiten können
app.use(express.json());
// aber natürlich wollen wir auch urls und den body des requests parsen können
app.use(express.urlencoded({ extended: false }));
// hier geben wir noch das Verzeichnis für statische Dateien an (css, js, fonts...)
app.use(express.static(path.join(__dirname, "public")));
// der Router, den wir definieren soll ab dem root Teil der URL gültig sein
app.use("/", indexRouter);
app.use("/", taskRouter( taskRepo ));

const port = 3030;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});