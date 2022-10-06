import Funko from "../model/funko.mjs";

export default class FunkoRepository {
    async insert(pool, funko) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `INSERT INTO starcollection.funko (id, name, category, description, created_at) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [funko.id, funko.name, funko.category, funko.description, now];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Funko();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.category = result.rows[0].category;
                data.description = result.rows[0].description;
                data.createdAt = result.rows[0].created_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async update(pool, funko) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.funko 
            SET name = $1, category = $2, description = $3, updated_at = $4 where id = $5 RETURNING *`;
            const values = [funko.name, funko.category, funko.description, now, funko.id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Funko();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.category = result.rows[0].category;
                data.description = result.rows[0].description;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async deleteSoft(pool, id) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.funko 
            SET deleted_at = $1 where id = $2 RETURNING *`;
            const values = [now, id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Funko();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.category = result.rows[0].category;
                data.description = result.rows[0].description;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
                data.deletedAt = result.rows[0].deleted_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async deleteHard(pool, id) {
        let data = [];
        let error = null;
        try {
            const query = "DELETE FROM starcollection.funko where id = $1 RETURNING *";
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Funko();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.category = result.rows[0].category;
                data.description = result.rows[0].description;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
                data.deletedAt = result.rows[0].deleted_at;
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
            const query = "SELECT * FROM starcollection.funko where deleted_at is null order by name";
            const result = await pool.query(query);
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                const funko = new Funko();
                funko.id = row.id;
                funko.name = row.name;
                funko.category = row.category;
                funko.description = row.description;
                funko.createdAt = row.created_at;
                funko.updatedAt = row.updated_at;
                data.push(funko);
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
            const query = "SELECT * FROM starcollection.funko where deleted_at is null and id = $1";
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = result.rows.map((row) => {
                    let funko = new Funko();
                    funko.id = row.id;
                    funko.name = row.name;
                    funko.category = row.category;
                    funko.description = row.description;
                    funko.createdAt = row.created_at;
                    funko.updatedAt = row.updated_at;
                    return funko;
                });
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }
}
