import Pool from "../repository/pool.mjs";
import { v4 as uuid, validate as uuidValidate } from "uuid";
import crypto from "crypto";
import UserRepository from "../repository/user-repository.mjs";

export default class UserServices {
    repository = new UserRepository();

    async list() {
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

    async create(user) {
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
            if (!user.city) {
                result.error = new Error("city if required");
                result.status = 400;
                return result;
            }
            if (!user.state) {
                result.error = new Error("state if required");
                result.status = 400;
                return result;
            }
            user.id = uuid();
            user.password = crypto.createHash("sha256").update(user.password).digest("hex");
            result = await this.repository.insert(pool, user);
        } catch (error) {
            console.log(error);
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async authenticate(email, password) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!email) {
                result.error = new Error("email if required");
                result.status = 400;
                return result;
            }
            if (!password || password.length < 8) {
                result.error = new Error("password must be at least 8 characters");
                result.status = 400;
                return result;
            }
            password = crypto.createHash("sha256").update(password).digest("hex");
            result = await this.repository.authenticate(pool, email, password);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }
}
