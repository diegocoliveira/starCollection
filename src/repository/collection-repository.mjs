import Collection from "../model/collection.mjs";

export default class CollectionRepository {
    async insert(pool, collection) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `INSERT INTO starcollection.collection (id, user_id, funko_id, is_exchange, created_at) 
                VALUES ($1, $2, $3, $4, $5) RETURNING *`;
            const values = [collection.id, collection.userId, collection.funko.id, collection.isExchange, now];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Collection();
                data.id = result.rows[0].id;
                data.user.id = result.rows[0].user_id;
                data.funko.id = result.rows[0].funko_id;
                data.isExchange = result.rows[0].is_exchange;
                data.createdAt = result.rows[0].created_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async update(pool, collection) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.collection
            SET is_exchange = $1, updated_at = $2 where id = $3 RETURNING *`;
            const values = [collection.isExchange, now, collection.id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Collection();
                data.id = result.rows[0].id;
                data.user.id = result.rows[0].user_id;
                data.funko.id = result.rows[0].funko_id;
                data.isExchange = result.rows[0].is_exchange;
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
            const query = `UPDATE starcollection.collection
            SET deleted_at = $1 where id = $2 RETURNING *`;
            const values = [now, id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Collection();
                data.id = result.rows[0].id;
                data.user.id = result.rows[0].user_id;
                data.funko.id = result.rows[0].funko_id;
                data.isExchange = result.rows[0].is_exchange;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
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
            const query = `DELETE FROM starcollection.collection WHERE id = $1 RETURNING *`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Collection();
                data.id = result.rows[0].id;
                data.user.id = result.rows[0].user_id;
                data.funko.id = result.rows[0].funko_id;
                data.isExchange = result.rows[0].is_exchange;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async getAll(pool, userId) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT collection.id, collection.is_exchange, funko.id as funko_id, funko.name, funko.category
                             FROM "starcollection".collection 
                       RIGHT JOIN "starcollection".funko on collection.funko_id = funko.id 
                              AND collection.user_id = $1
                            WHERE collection.deleted_at IS NULL
                              AND funko.deleted_at IS NULL
                        ORDER BY funko.name ASC;`;
            const values = [userId];
            const result = await pool.query(query, values);
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                const collection = new Collection();
                collection.id = row.id;
                collection.user.id = userId;
                collection.isExchange = row.is_exchange;
                collection.funko.id = row.funko_id;
                collection.funko.name = row.name;
                collection.funko.category = row.category;
                data.push(collection);
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async getByFunkoId(pool, funkoId) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT * FROM starcollection.collection WHERE funko_id = $1`;
            const values = [funkoId];
            const result = await pool.query(query, values);
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                const collection = new Collection();
                collection.id = row.id;
                collection.user.id = row.user_id;
                collection.funkoId = row.funko_id;
                collection.isExchange = row.is_exchange;
                collection.createdAt = row.created_at;
                collection.updatedAt = row.updated_at;
                collection.deletedAt = row.deleted_at;
                data.push(collection);
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async getTradeable(pool, filter, value) {
        let data = [];
        let error = null;
        let condition = "";
        const values = [];
        if (value != undefined && value != null && value.length > 0) {
            values.push(`%${value}%`);
            if (filter == "funko") {
                condition = " AND funko.name ILIKE $1 ";
            } else if (filter == "cidade") {
                condition = ` AND "user".city ILIKE $1 `;
            } else if (filter == "estado") {
                condition = ` AND "user".state ILIKE $1 `;
            }
        }
        try {
            const query = `SELECT collection.id, is_exchange, collection.created_at, collection.updated_at, collection.deleted_at,
                                  collection.funko_id, funko.name as funko_name, funko.category,
                                  collection.user_id, "user".name as user_name, "user".city, "user".state
                             FROM starcollection.collection 
                       INNER JOIN starcollection.funko ON funko.id = collection.funko_id
                              AND funko.deleted_at IS NULL
                       INNER JOIN starcollection."user" ON "user".id = collection.user_id 
                              AND "user".deleted_at IS NULL
                            WHERE collection.deleted_at is null AND collection.is_exchange = true
                                ${condition}
                         ORDER BY collection.updated_at DESC;`;
            const result = await pool.query(query, values);
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                const collection = new Collection();
                collection.id = row.id;
                collection.funko.id = row.funko_id;
                collection.funko.name = row.funko_name;
                collection.funko.category = row.category;
                collection.user.id = row.user_id;
                collection.user.name = row.user_name;
                collection.user.city = row.city;
                collection.user.state = row.state;
                collection.isExchange = row.is_exchange;
                collection.createdAt = row.created_at;
                collection.updatedAt = row.updated_at;
                collection.deletedAt = row.deleted_at;
                data.push(collection);
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
            const query = `SELECT collection.id,
                                  collection.funko_id, funko.name, funko.category,
                                  collection.user_id, "user".name, "user".city, "user".state
                             FROM starcollection.collection 
                       INNER JOIN starcollection.funko ON funko.id = collection.funko_id
                              AND funko.deleted_at IS NULL
                       INNER JOIN starcollection."user" ON "user".id = collection.user_id 
                              AND "user".deleted_at IS NULL
                            WHERE collection.id = $1 AND collection.deleted_at is null`;
            const values = [collectionId];
            const result = await pool.query(query, values);
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                data.push(row);
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }
}
