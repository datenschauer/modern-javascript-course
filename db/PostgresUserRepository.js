import {UserRepository} from "../interfaces/userRepository.js";
import pg from 'pg';

export class PostgresUserRepository extends UserRepository {
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
                CREATE TABLE IF NOT EXISTS users (
                    id uuid primary key ,
                    email varchar(255) ,
                    hashed_password varchar(255)
                );
            `)
        } catch (e) {
            console.error(e);
        }
    }

    async createUser(user) {
        try {
            await this.query(`
                INSERT INTO users (id, email, hashed_password)
                VALUES ('${user.id}', '${user.email}', '${user.hashed_password}');
            `);
        } catch (e) {
            throw new Error(`${this.errorMsg}${e}`);
        }
    }

    async getUserById( id ) {
        let user;
        try {
            user = await this.query(`
                SELECT * FROM users
                WHERE id = ${id};
            `)
        } catch (e) {
            throw new Error(`${this.errorMsg}${e}`);
        }
        return user.rows;
    }

    async getUserByEmail( email ) {
        let user;
        try {
            user = await this.query(`
                SELECT * FROM users
                WHERE email =${email};
            `)
        } catch (e) {
            throw new Error(`${this.errorMsg}${e}`);
        }
        return user.rows;
    }
}