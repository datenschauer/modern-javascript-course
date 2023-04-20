"use strict";

import express from "express";
import { router as indexRouter } from "./routes/user.js";
import { router as adminRouter } from "./routes/admin.js";
import path from "path";
import { __dirname } from "./dirname.js";

const app = express();

// HIER definieren wir die Middleware, die wir verwenden wollen mit app.use()
// wir wollen JSON verarbeiten können
app.use(express.json());
// aber natürlich wollen wir auch urls parsen können
app.use(express.urlencoded({ extended: false }));
// hier geben wir noch das Verzeichnis für statische Dateien an (css, js, fonts...)
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);

const port = 3030;

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});