"use strict";

import express from "express";
import path from "path";
import { __dirname } from "../dirname.js";
import { login } from "../controller/authController.js";

const indexRouter = express.Router();

indexRouter.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/login.html"));
})

indexRouter.post("/login", login());

indexRouter.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

export { indexRouter };