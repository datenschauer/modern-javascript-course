"use strict";

import express from "express";
import { taskRouter } from "./routes/taskRoutes.js";
import { indexRouter } from "./routes/index.js";
import path from "path";
import * as dotenv from 'dotenv';
import { flaschenpost } from 'flaschenpost';
import { __dirname } from "./dirname.js";
import { JsonFileTaskRepository } from './db/JsonFileTaskRepository.js';
import { PostgresTaskRepository } from "./db/PostgresTaskRepository.js";

dotenv.config();
let taskRepo;
switch (process.env.DB) {
    case 'postgres':
        const host = process.env.PGHOST;
        const database = process.env.PGDATABASE;
        const user = process.env.PGUSER;
        const password = process.env.PGPASSWORD;
        const port = parseInt(process.env.PGPORT, 10);
        taskRepo = new PostgresTaskRepository(
            host, database, user, password, port
        );
        break;
    case 'json':
        taskRepo = new JsonFileTaskRepository('./db/tasks.json');
}

const app = express();

const logger = flaschenpost.getLogger();

// HIER definieren wir die Middleware, die wir verwenden wollen mit app.use()
// wir wollen JSON verarbeiten können
app.use(express.json());
// aber natürlich wollen wir auch urls und den body des requests parsen können
// wir setzen 'extended' auf false, weil wir die query-string Bibliothek und nicht die qs Bibliothek verwenden wollen
app.use(express.urlencoded({ extended: false }));
// hier geben wir noch das Verzeichnis für statische Dateien an (css, js, fonts...)
app.use(express.static(path.join(__dirname, "public")));
// der Router, den wir definieren soll ab dem root Teil der URL gültig sein
app.use("/api", taskRouter( taskRepo ));
app.use("/", indexRouter);

const port = 3030;

app.listen(port, () => {
    logger.info(`Server started on http://localhost:${port}`);
});

export default app;