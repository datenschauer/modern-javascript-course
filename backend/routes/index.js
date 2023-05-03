"use strict";

import express from "express";
import path from "path";
import { __dirname } from "../dirname.js";

const indexRouter = express.Router();

indexRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

export { indexRouter };