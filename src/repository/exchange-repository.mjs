import Exchange from "../model/exchange.mjs";

export default class ExchangeRepository {
    async insert(pool, exchange) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `INSERT INTO starcollection.exchange (id, target, offered, ok_user_target, ok_user_offered, 
                            status, created_at) 
            VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
            const values = [exchange.id, exchange.target, exchange.offered, exchange.okUserTarget, exchange.okUserOffered, exchange.status, now];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Exchange();
                data.id = result.rows[0].id;
                data.target = result.rows[0].target;
                data.offered = result.rows[0].offered;
                data.okUserTarget = result.rows[0].ok_user_target;
                data.okUserOffered = result.rows[0].ok_user_offered;
                data.createdAt = result.rows[0].created_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async update(pool, exchange) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.exchange SET status = $1, updated_at = $2  WHERE id = $3 RETURNING *`;
            const values = [exchange.status, now, exchange.id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Exchange();
                data.id = result.rows[0].id;
                data.target = result.rows[0].target;
                data.offered = result.rows[0].offered;
                data.status = result.rows[0].status;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
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
            const query = `SELECT * FROM starcollection.exchange WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Exchange();
                data.id = result.rows[0].id;
                data.target = result.rows[0].target;
                data.offered = result.rows[0].offered;
                data.okUserTarget = result.rows[0].ok_user_target;
                data.okUserOffered = result.rows[0].ok_user_offered;
                data.createdAt = result.rows[0].created_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async getByCollectionId(pool, collectionId) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT * FROM starcollection.exchange WHERE target = $1 OR offered = $1`;
            const values = [collectionId];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                for (let i = 0; i < result.rowCount; i++) {
                    const exchange = new Exchange();
                    exchange.id = result.rows[i].id;
                    exchange.target = result.rows[i].target;
                    exchange.offered = result.rows[i].offered;
                    exchange.okUserTarget = result.rows[i].ok_user_target;
                    exchange.okUserOffered = result.rows[i].ok_user_offered;
                    exchange.createdAt = result.rows[i].created_at;
                    data.push(exchange);
                }
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async getByStatus(pool, status, userId) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT exchange.id, exchange.status,
                                  target.id as target_id, offered.id as offered_id,
                                  target_user.id as target_user_id, target_user.name as target_user_name,
                                  target_funko.id as target_funko_id, target_funko.name as target_funko_name,
                                  offered_user.id as offered_user_id, offered_user.name as offered_user_name,
                                  offered_funko.id as offered_funko_id, offered_funko.name as offered_funko_name
                             FROM starcollection.exchange
                       INNER JOIN starcollection.collection as target ON target.id = exchange.target
                       INNER JOIN starcollection.user as target_user ON target_user.id = target.user_id
                       INNER JOIN starcollection.funko as target_funko ON target_funko.id = target.funko_id
                       INNER JOIN starcollection.collection as offered ON offered.id = exchange.offered
                       INNER JOIN starcollection.user as offered_user ON offered_user.id = offered.user_id
                       INNER JOIN starcollection.funko as offered_funko ON offered_funko.id = offered.funko_id
                            WHERE (target_user.id = $1 or offered_user.id = $1)
                              AND exchange.status = $2
                         ORDER BY exchange.created_at DESC`;
            const values = [userId, status];
            const result = await pool.query(query, values);
            for (let i = 0; i < result.rows.length; i++) {
                const row = result.rows[i];
                const exchange = new Exchange();
                exchange.id = row.id;
                exchange.status = row.status;
                exchange.target = {};
                exchange.target.id = row.target_id;
                exchange.target.user = {};
                exchange.target.user.id = row.target_user_id;
                exchange.target.user.name = row.target_user_name;
                exchange.target.funko = {};
                exchange.target.funko.id = row.target_funko_id;
                exchange.target.funko.name = row.target_funko_name;
                exchange.offered = {};
                exchange.offered.id = row.offered_id;
                exchange.offered.user = {};
                exchange.offered.user.id = row.offered_user_id;
                exchange.offered.user.name = row.offered_user_name;
                exchange.offered.funko = {};
                exchange.offered.funko.id = row.offered_funko_id;
                exchange.offered.funko.name = row.offered_funko_name;
                data.push(exchange);
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async list(pool) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT "user".name as user_target, funko.name as funko_target, "user2".name as user_offered, 
            funko2.name as funko_offered, exchange.status, exchange.created_at 
            FROM starcollection.exchange
            INNER JOIN starcollection.collection ON collection.id = exchange.target
            INNER JOIN starcollection."user" ON "user".id = collection.user_id
            INNER JOIN starcollection.funko ON funko.id = collection.funko_id
            INNER JOIN starcollection.collection collection2 ON collection2.id = exchange.offered
            INNER JOIN starcollection."user" as "user2" ON "user2".id = collection2.user_id
            INNER JOIN starcollection.funko as funko2 ON funko2.id = collection2.funko_id
            ORDER BY exchange.created_at DESC`;
            const result = await pool.query(query);
            for (let index = 0; index < result.rows.length; index++) {
                const row = result.rows[index];
                data.push(row);
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async countExchange(pool) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT COUNT(*) FROM starcollection.exchange`;
            const result = await pool.query(query);
            data.push(result.rows[0].count);
        } catch (err) {
            error = err;
        }
        return { data, error };
    }
}
