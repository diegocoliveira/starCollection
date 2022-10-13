import User from "../model/user.mjs";

export default class UserRepository {
    async insert(pool, user) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `INSERT INTO starcollection.user (id, name, email, password, city, state, description, type, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
            const values = [user.id, user.name, user.email, user.password, user.city, user.state, user.description, user.type, now];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.city = result.rows[0].city;
                data.state = result.rows[0].state;
                data.description = result.rows[0].description;
                data.type = result.rows[0].type;
                data.createdAt = result.rows[0].created_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async updateName(pool, user) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.user SET name = $1, updated_at = $2 WHERE id = $3 RETURNING *`;
            const values = [user.name, now, user.id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.name = result.rows[0].name;
                data.updatedAt = result.rows[0].updated_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async updateEmail(pool, user) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.user SET email = $1, updated_at = $2 WHERE id = $3 RETURNING *`;
            const values = [user.email, now, user.id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.email = result.rows[0].email;
                data.updatedAt = result.rows[0].updated_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async updatePassword(pool, user) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.user SET password = $1, updated_at = $2 WHERE id = $3 RETURNING *`;
            const values = [user.password, now, user.id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.city = result.rows[0].city;
                data.state = result.rows[0].state;
                data.updatedAt = result.rows[0].updated_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async updateCity(pool, user) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.user SET city = $1, state = $2, updated_at = $3 WHERE id = $4 RETURNING *`;
            const values = [user.city, user.state, now, user.id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.city = result.rows[0].city;
                data.state = result.rows[0].state;
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
            const query = `UPDATE starcollection.user SET deleted_at = $1 WHERE id = $2 RETURNING *`;
            const values = [now, id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.city = result.rows[0].city;
                data.state = result.rows[0].state;
                data.description = result.rows[0].description;
                data.type = result.rows[0].type;
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
            const query = `DELETE FROM starcollection.user WHERE id = $1 RETURNING *`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.city = result.rows[0].city;
                data.state = result.rows[0].state;
                data.description = result.rows[0].description;
                data.type = result.rows[0].type;
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
            const query = `SELECT * FROM starcollection.user WHERE deleted_at is null`;
            const result = await pool.query(query);
            for (let index = 0; index < result.rows.length; index++) {
                const row = result.rows[index];
                const user = new User();
                user.id = row.id;
                user.name = row.name;
                user.email = row.email;
                user.password = row.password;
                user.city = row.city;
                user.state = row.state;
                user.description = row.description;
                user.type = row.type;
                user.createdAt = row.created_at;
                user.updatedAt = row.updated_at;
                data.push(user);
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
            const query = `SELECT * FROM starcollection.user  where deleted_at is null and id = $1`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = result.rows.map((row) => {
                    const user = new User();
                    user.id = row.id;
                    user.name = row.name;
                    user.email = row.email;
                    user.password = row.password;
                    user.city = row.city;
                    user.state = row.state;
                    user.description = row.description;
                    user.type = row.type;
                    user.createdAt = row.created_at;
                    user.updatedAt = row.updated_at;
                    return user;
                });
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async authenticate(pool, email, password) {
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.user SET last_login_at = $1
                            WHERE deleted_at IS NULL
                              AND email = $2 AND password = $3 RETURNING *`;

            const values = [now, email, password];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.city = result.rows[0].city;
                data.state = result.rows[0].state;
                data.avatar = result.rows[0].avatar;
                data.type = result.rows[0].type;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async totalOnline(pool) {
        let data = 0;
        let error = null;
        try {
            const query = `SELECT count(*) as online FROM starcollection.user
                            WHERE last_login_at > CURRENT_TIMESTAMP - INTERVAL '1 day'`;
            const result = await pool.query(query);
            if (result.rowCount > 0) {
                data = result.rows[0].online;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async countUser(pool) {
        let data = [];
        let error = null;
        try {
            const query = `SELECT COUNT(*) FROM starcollection.user WHERE deleted_at is null and type = 'cliente'`;
            const result = await pool.query(query);
            data.push(result.rows[0].count);
        } catch (err) {
            error = err;
        }
        return { data, error };
    }
}
