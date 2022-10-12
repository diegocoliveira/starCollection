import Exchange from "../model/exchange.mjs";

export default class ExchangeRepository {
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
