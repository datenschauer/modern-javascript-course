import { User } from "../entities/user.js";
import crypto from "crypto";

export function getUserById( userRepo ) {
    return async function (req, res) {
        try {
            const { userId } = req.body;
            const user = await userRepo.getUserById(userId);
            res.json(user);
        } catch (e) {
           res.status(404).send(e);
        }
    }
}

export function getUserByEmail( userRepo ) {
    return async function (req, res) {
        try {
            const { email } = req.body;
            const user = await userRepo.getUserByEmail(email);
            res.json(user);
        } catch (e) {
            res.status(404).send(e);
        }
    }
}

export function createUser( userRepo ) {

    const hash = function (password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const iterations = 10_000;
        const keyLength = 64;
        const hashAlgorithm = 'sha512';

        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, iterations, keyLength, hashAlgorithm, (err, derivedKey) => {
                if (err) {
                } else {
                    const hashedPassword = derivedKey.toString('hex');
                    resolve(hashedPassword);
                }
            });
        })
    }

    return async function (req, res) {
        try {
            const { email, password } = req.body;
            const hashed_password = await hash(password);
            const user = new User(email, hashed_password);
            await userRepo.createUser( user );
            res.json(user.id);
        } catch (e) {
            res.status(404).send(e);
        }
    }
}
