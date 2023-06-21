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

        this.pool = new pg.Pool({
            host: this.host,
            port: this.dbPort,
            database: this.database,
            user: this.dbUser,
            password: this.dbPass,
            max: 20,
            idleTimeoutMillis: 30_000,
            connectionTimeoutMillis: 2_000,
        })

        this.errorMsg = "Could not connect to db: ";

        this.initialize();
    }

    async query( qstring ) {
        const client = await this.pool.connect();
        const result = await client.query(qstring);
        client.release();
        return result;
    }

    async initialize() {
        try {
            await this.query(`
                CREATE TABLE IF NOT EXISTS tasks (
                    id uuid primary key ,
                    text text,
                    userId uuid
                );
            `)
        } catch (e) {
            console.error(e);
        }
    }

    async getTasks(userId) {
        let tasks;
        try {
            tasks = await this.query(`
                SELECT * FROM tasks WHERE userid = '${userId}';
            `);
        } catch (e) {
            console.error(e);
        }
        return tasks.rows;
    }

    async addTask( task ) {
        try {
            await this.query(`
                INSERT INTO tasks ( id, text, userid )
                VALUES ('${task.id}', '${task.text}', '${task.userId}')
            `)
        } catch (e) {
            console.error(e);
        }
    }

    async updateTask( userId, id, text ) {
        try {
            await this.query(`
                UPDATE tasks
                SET text = '${text}'
                WHERE id = '${id}' AND userid = '${userId}';
            `)
        } catch (e) {
            console.error(e);
        }
    }

    async deleteTask( userId, id ) {
        try {
            await this.query(`
                DELETE FROM tasks
                WHERE id = '${id}' AND userid = '${userId}';
            `)
        } catch (e) {
           console.error(e);
        }
    }
}