import Offer from "../model/offer.mjs";

export default class OfferRepository {
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
