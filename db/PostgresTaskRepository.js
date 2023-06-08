import {TaskRepository} from "../interfaces/taskRepository.js";
import pg from 'pg';

export class PostgresTaskRepository extends TaskRepository {
    constructor(host, database, user, password, port=5334) {
        super();
        this.host = host;
        this.database = database;
        this.dbUser = user;
        this.dbPass = password;
        this.dbPort = port;

        this.client = new pg.Client({
            host: this.host,
            port: this.dbPort,
            database: this.database,
            user: this.dbUser,
            password: this.dbPass,
        })

        this.errorMsg = "Could not connect to db: ";

        this.initialize();
    }

    async connect() {
        await this.client.connect();
    }

    async query( qstring ) {
        return await this.client.query(qstring);
    }

    async initialize() {
        try {
            await this.connect();
            await this.query(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id uuid primary key ,
                    text text
                );
            `)
        } catch (e) {
            throw new Error(`${this.errorMsg}${e}`);
        }
    }

    async getTasks() {
        let tasks;
        try {
            tasks = await this.query(`
                SELECT * FROM tasks;
            `);
        } catch (e) {
            throw new Error(`${this.errorMsg}${e}`);
        }
        return tasks.rows;
    }

    async addTask( task ) {
        try {
            await this.query(`
                INSERT INTO tasks ( id, text )
                VALUES ('${task.id}', '${task.text}')
            `)
        } catch (e) {
            throw new Error(`${this.errorMsg}${e}`);
        }
    }

    async updateTask( id, text ) {
        try {
            await this.query(`
                UPDATE tasks
                SET text = '${text}'
                WHERE id = '${id}';
            `)
        } catch (e) {
            throw new Error(`${this.errorMsg}${e}`);
        }
    }

    async deleteTask( id ) {
        try {
            await this.query(`
                DELETE FROM tasks
                WHERE id = '${id}';
            `)
        } catch (e) {
           throw new Error(`${this.errorMsg}${e}`);
        }
    }
}