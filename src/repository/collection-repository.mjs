import Collection from "../model/collection.mjs";

export default class CollectionRepository {
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
                collection.userId = row.user_id;
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
                collection.userId = userId;
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
}
