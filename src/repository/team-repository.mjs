import { v4 as uuid } from "uuid";
import Team from "../model/team.mjs";

export default class TeamRepository {
    async insert(pool, team) {
        let data = [];
        let error = null;

        try {
            const query = "INSERT INTO starcollection.team (id, name) VALUES ($1, $2) RETURNING *";
            const values = [uuid(), team.name];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Team();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async update(pool, team) {
        let data = [];
        let error = null;

        try {
            const query = "UPDATE starcollection.team SET name = $1 WHERE id = $2 RETURNING *";
            const values = [team.name, team.id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Team();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async delete(pool, id) {
        let data = [];
        let error = null;

        try {
            const query = "DELETE FROM starcollection.team WHERE id = $1 RETURNING *";
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Team();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async get(pool, id) {
        let data = [];
        let error = null;

        try {
            const query = "SELECT * FROM starcollection.team WHERE id = $1";
            const values = [id];
            const result = await pool.query(query, values);

            if (result.rowCount > 0) {
                data = new Team();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async getAll(pool) {
        let data = [];
        let error = null;

        try {
            const query = "SELECT * FROM starcollection.team";
            const result = await pool.query(query);
            for (let i = 0; i < result.rows.length; i++) {
                let item = new Team();
                item.id = result.rows[i].id;
                item.name = result.rows[i].name;
                data.push(item);
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }
}
