"use strict";

import express from 'express';
import { getUserById, getUserByEmail, createUser } from '../controller/userController.js';

export function userRouter ( userRepo ) {

    const router = express.Router();

    router.get('/userById', getUserById( userRepo ))

    router.get('/userByEmail', getUserByEmail( userRepo ))

    router.post('/user', createUser( userRepo ));

    return router;
}
