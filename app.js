"use strict";

import express from "express";
import { taskRouter } from "./routes/taskRoutes.js";
import { userRouter } from "./routes/userRoutes.js";
import { indexRouter } from "./routes/index.js";
import path from "path";
import * as dotenv from 'dotenv';
import { flaschenpost } from 'flaschenpost';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { __dirname } from "./dirname.js";
import { JsonFileTaskRepository } from './db/JsonFileTaskRepository.js';
import { PostgresTaskRepository } from "./db/PostgresTaskRepository.js";
import { PostgresUserRepository } from "./db/PostgresUserRepository.js";

const logger = flaschenpost.getLogger();

const pgOptions = {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    port: parseInt(process.env.PGPORT, 10),
}

dotenv.config();
let taskRepo;
switch (process.env.DB) {
    case 'postgres':
        const { host, database, user, password, port } = pgOptions;
        try {
            taskRepo = new PostgresTaskRepository(
                host, database, user, password, port
            );
        } catch (e) {
            logger.error(e);
        }
        break;
    case 'json':
        taskRepo = new JsonFileTaskRepository('./db/tasks.json');
}

let userRepo;
try {
    const { host, database, user, password, port } = pgOptions;
    userRepo = new PostgresUserRepository(
        host, database, user, password, port
    );
} catch (e) {
    logger.error(e);
}

const corsOptions = {
    credentials: true,
    origin: process.env.URL || 'http://localhost'
};

const app = express();

app.use(cors(corsOptions));
// HIER definieren wir die Middleware, die wir verwenden wollen mit app.use()
// wir wollen JSON verarbeiten können
app.use(express.json());
app.use(cookieParser());
// aber natürlich wollen wir auch urls und den body des requests parsen können
// wir setzen 'extended' auf false, weil wir die query-string Bibliothek und nicht die qs Bibliothek verwenden wollen
app.use(express.urlencoded({ extended: false }));
// hier geben wir noch das Verzeichnis für statische Dateien an (css, js, fonts...)
app.use(express.static(path.join(__dirname, "public")));
// der Router, den wir definieren soll ab dem root Teil der URL gültig sein
app.use("/api", taskRouter( taskRepo ));
app.use("/api", userRouter( userRepo ));
app.use("/", indexRouter);

const port = 3030;

app.listen(port, () => {
    logger.info(`Server started on http://localhost:${port}`);
});

export default app;