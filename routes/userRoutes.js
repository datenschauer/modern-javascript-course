"use strict";

import express from 'express';
import { getUserById, getUserByEmail, createUser, getAllUsers } from '../controller/userController.js';

export function userRouter ( userRepo ) {

    const router = express.Router();

    router.get('/userById', getUserById( userRepo ));

    router.get('/userByEmail', getUserByEmail( userRepo ));

    router.get('/user(s)?', getAllUsers( userRepo ));

    router.post('/user', createUser( userRepo ));

    return router;
}
