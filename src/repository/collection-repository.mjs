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
}
