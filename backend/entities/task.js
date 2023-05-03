import crypto from "crypto";

export class Task {
    constructor( text ) {
        this.id = crypto.randomUUID();
        this.text = text;
    }
}