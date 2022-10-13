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

    async delete(pool, id) {
        let data = [];
        let error = null;
        try {
            const query = `DELETE FROM starcollection.offer WHERE id = $1 RETURNING *`;
            const values = [id];
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

    async get(pool, id) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT * FROM starcollection.offer WHERE id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                const offer = new Offer();
                offer.id = result.rows[0].id;
                offer.target = result.rows[0].target;
                offer.offered = result.rows[0].offered;
                offer.createdAt = result.rows[0].created_at;
                data.push(offer);
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

    async countOffer(pool) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT COUNT(*) FROM starcollection.offer`;
            const result = await pool.query(query);
            data.push(result.rows[0].count);
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async getReceived(pool, userId) {
        return await this.#getByUser(pool, userId, true);
    }

    async getSent(pool, userId) {
        return await this.#getByUser(pool, userId, false);
    }

    async #getByUser(pool, userId, received) {
        let data = [];
        let error = null;
        let condition = "";
        if (received) {
            condition = " target_user.id = $1 ";
        } else {
            condition = " offered_user.id = $1 ";
        }
        try {
            const query = `SELECT offer.id, offer.created_at,
                                  target.id as target_id,
                                  target_funko.id as target_funko_id, target_funko.name as target_funko_name,
                                  target_user.id as target_user_id, target_user.name as target_user_name,
                                  offered.id as offered_id,
                                  offered_funko.id as offered_funko_id, offered_funko.name as offered_funko_name, 
                                  offered_user.id as offered_user_id, offered_user.name as offered_user_name
                             FROM starcollection.offer
                       INNER JOIN starcollection.collection target on offer.target = target.id
                              AND target.deleted_at IS NULL
                       INNER JOIN starcollection.funko as target_funko ON target_funko.id = target.funko_id
                              AND target_funko.deleted_at IS NULL
                       INNER JOIN starcollection.user as target_user ON target_user.id = target.user_id
                              AND target_user.deleted_at IS NULL
                       INNER JOIN starcollection.collection offered on offer.offered = offered.id
                              AND offered.deleted_at IS NULL
                       INNER JOIN starcollection.funko as offered_funko ON offered_funko.id = offered.funko_id
                              AND offered_funko.deleted_at IS NULL
                       INNER JOIN starcollection.user as offered_user ON offered_user.id = offered.user_id
                              AND offered_user.deleted_at IS NULL
                            WHERE ${condition}`;
            const values = [userId];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                for (let i = 0; i < result.rowCount; i++) {
                    const offer = new Offer();
                    offer.id = result.rows[i].id;
                    offer.createdAt = result.rows[i].created_at;
                    offer.target.id = result.rows[i].target_id;
                    offer.target.funko = {};
                    offer.target.funko.id = result.rows[i].target_funko_id;
                    offer.target.funko.name = result.rows[i].target_funko_name;
                    offer.target.user = {};
                    offer.target.user.id = result.rows[i].target_user_id;
                    offer.target.user.name = result.rows[i].target_user_name;
                    offer.offered.id = result.rows[i].offered_id;
                    offer.offered.funko = {};
                    offer.offered.funko.id = result.rows[i].offered_funko_id;
                    offer.offered.funko.name = result.rows[i].offered_funko_name;
                    offer.offered.user = {};
                    offer.offered.user.id = result.rows[i].offered_user_id;
                    offer.offered.user.name = result.rows[i].offered_user_name;
                    data.push(offer);
                }
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }
}
