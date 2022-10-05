import User from "../model/user.mjs";

export default class UserRepository{
    async insert(pool, user){
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `INSERT INTO starcollection.user (id, name, email, password, cidade, estado, description, user_type, created_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`;
            const values = [user.id, user.name, user.email, user.password, user.cidade, user.estado, user.description, user.user_type, now];
            const result =  await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.cidade = result.rows[0].cidade;
                data.estado = result.rows[0].estado;
                data.description = result.rows[0].description;
                data.user_type = result.rows[0].user_type;
                data.createdAt = result.rows[0].created_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async update(pool, user){
        let data = [];
        let error = null;
        const now = new Date();
        try {
            const query = `UPDATE starcollection.user SET name = $1, email = $2, password = $3, cidade = $4, estado = $5, 
                description = $6, updated_at = $7`;
            const values = [user.name, user.email, user.password, user.cidade, user.estado, user.description, now];
            const result =  await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.cidade = result.rows[0].cidade;
                data.estado = result.rows[0].estado;
                data.description = result.rows[0].description;
                data.user_type = result.rows[0].user_type;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
            }
        } catch (err) {
            error = err;
        }
        return { data, error };
    }

    async deleteSoft(pool, id){
        let data = [];
        let error = null;
        const now = new Date();
        try{
            const query = `UPDATE starcollection.user SET deleted_at = $1 WHERE id = $2 RETURNING *`;
            const values = [now, id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.cidade = result.rows[0].cidade;
                data.estado = result.rows[0].estado;
                data.description = result.rows[0].description;
                data.user_type = result.rows[0].user_type;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
                data.deletedAt = result.rows[0].deleted_at;
            }
        }catch (err) {
            error = err;
        }
        return { data, error };
    }

    async deleteHard(pool, id){
        let data = [];
        let error = null;
        try{
            const query = `DELETE FROM starcollection.user WHERE id = $1 RETURNING *`;
            const values = [id];
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                data = new User();
                data.id = result.rows[0].id;
                data.name = result.rows[0].name;
                data.email = result.rows[0].email;
                data.password = result.rows[0].password;
                data.cidade = result.rows[0].cidade;
                data.estado = result.rows[0].estado;
                data.description = result.rows[0].description;
                data.user_type = result.rows[0].user_type;
                data.createdAt = result.rows[0].created_at;
                data.updatedAt = result.rows[0].updated_at;
                data.deletedAt = result.rows[0].deleted_at;
            }
        }catch (err) {
            error = err;
        }
        return { data, error };
    }

    async getAll(pool){
        let data = [];
        let error = null;
        try{
            const query = `SELECT * FROM starcollection.user WHERE delete_at is null`;
            const result = pool.query(query);
            for (let index = 0; index < result.rows.length; index++) {
                const row = result.rows[index];
                const user = new User();
                user.id = row.id;
                user.name = row.name;
                user.email = row.email;
                user.password = row.password;
                user.cidade = row.cidade;
                user.estado = row.estado;
                user.description = row.description;
                user.user_type = row.user_type;
                user.createdAt = row.created_at;
                user.updatedAt = row.updated_at;
                data.push(user);
            }
        }catch (err) {
            error = err;
        }
        return { data, error };
    }

    async get(pool, id){
        let data = [];
        let error = null;
        try{
            const query = `SELECT * FROM starcollection.user  where deleted_at is null and id = $1`;
            const values = [id];
            const result = pool.query(query, values);
            if (result.rowCount > 0) {
                data = result.rows.map((row) => {
                    const user = new User();
                    user.id = row.id;
                    user.name = row.name;
                    user.email = row.email;
                    user.password = row.password;
                    user.cidade = row.cidade;
                    user.estado = row.estado;
                    user.description = row.description;
                    user.user_type = row.user_type;
                    user.createdAt = row.created_at;
                    user.updatedAt = row.updated_at;
                    return user;
                });
            }

        }catch (err) {
            error = err;
        }
        return { data, error };
    }
}