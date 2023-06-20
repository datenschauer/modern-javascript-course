import crypto from "crypto";

export class User {
    constructor( email, password ) {
        this.id = crypto.randomUUID();
        this.email = email;
        this.hashed_password = password;
    }
}