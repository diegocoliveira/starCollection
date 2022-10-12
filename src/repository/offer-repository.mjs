import Offer from "../model/offer.mjs";

export default class OfferRepository {
    async insert(pool, offer) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `INSERT INTO starcollection.offer (id, target, offered, created_at) 
            VALUES ($1, $2, $3, $4) RETURNING *`;
            const values = [offer.id, offer.target, offer.offered, now];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new Offer();
                data.id = result.rows[0].id;
                data.target = result.rows[0].target;
                data.offered = result.rows[0].offered;
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
            const query = `SELECT * FROM starcollection.offer WHERE target = $1 OR offered = $1`;
            const values = [collectionId];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                for (let i = 0; i < result.rowCount; i++) {
                    const offer = new Offer();
                    offer.id = result.rows[i].id;
                    offer.target = result.rows[i].target;
                    offer.offered = result.rows[i].offered;
                    offer.createdAt = result.rows[i].created_at;
                    data.push(offer);
                }
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }
}
