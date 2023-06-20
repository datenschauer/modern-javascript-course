import crypto from "crypto";

export class Task {
    constructor( userId, text ) {
        this.id = crypto.randomUUID();
        this.text = text;
        this.userId = userId;
    }
}