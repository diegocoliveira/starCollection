import dotenv from "dotenv";
import pg from "pg";

dotenv.config({ path: "./env/.env" });

export default class Pool {
    static #pool = null;
    static async #init() {
        const poolConfig = { max: process.env.PGMAX || 3 };
        const pool = new pg.Pool(poolConfig);
        const res = await pool.query("SELECT VERSION()");
        console.table(res.rows);
        return pool;
    }

    static async get() {
        if (this.#pool == null) {
            this.#pool = await this.#init();
        }
        return this.#pool;
    }
}
