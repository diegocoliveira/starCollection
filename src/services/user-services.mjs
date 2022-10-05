import Pool from "../repository/pool.mjs";
import { validate as uuidValidate } from "uuid";
import UserRepository from "../repository/user-repository.mjs";

export default class UserServices{
    repository = new UserRepository();

    async list(){
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            result = await this.repository.getAll(pool);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async get(id) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(id)) {
                result.error = new Error("Invalid id");
                result.status = 400;
                return result;
            }
            result = await this.repository.get(pool, id);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async create(user, file){
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!user.name || user.name.length < 4) {
                result.error = new Error("name must be at least 4 characters");
                result.status = 400;
                return result;
            }
            if (!user.email) {
                result.error = new Error("email if required");
                result.status = 400;
                return result;
            }
            if (!user.password || user.password.length < 8) {
                result.error = new Error("password must be at least 8 characters");
                result.status = 400;
                return result;
            }
            if (!user.cidade) {
                result.error = new Error("city if required");
                result.status = 400;
                return result;
            }
            if(!user.estado){
                result.error = new Error("state if required");
                result.status = 400;
                return result;
            }
            user.id = file.filename.split(".")[0];
            user.image = file.path;
            result = await this.repository.insert(pool, user);
        } catch (error) {
            console.log(error);
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async remove(id){
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        const client = await pool.connect();
        try {
            if (!uuidValidate(id)) {
                result.error = new Error("Invalid id");
                result.status = 400;
                return result;
            }
            await client.query("BEGIN");
            result = await this.repository.get(client, id);
            if (result.error) {
                throw result.error;
            }
            if (result.data.length > 0) {
                result = await this.repository.deleteSoft(client, id);
            } else {
                result = await this.repository.deleteHard(client, id);
                await fs.unlink(`repository/images/${id}.png`);
            }
            await client.query("COMMIT");
        }catch (error) {
            result.error = error;
            result.status = 500;
            await client.query("ROLLBACK");
        } finally {
            client.release();
        }
        return result;
    }
}