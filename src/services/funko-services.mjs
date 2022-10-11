import Pool from "../repository/pool.mjs";
import FunkoRepository from "../repository/funko-repository.mjs";
import CollectionRepository from "../repository/collection-repository.mjs";
import { validate as uuidValidate } from "uuid";
import fs from "fs/promises";

export default class FunkoServices {
    repository = new FunkoRepository();

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
    
    async getUserFunko(id){
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(id)) {
                result.error = new Error("Invalid id");
                result.status = 400;
                return result;
            }
            result = await this.repository.getUserFunko(pool, id);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async create(funko, file) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!funko.name || funko.name.length < 4) {
                result.error = new Error("name must be at least 4 characters");
                result.status = 400;
                return result;
            }
            if (!funko.category || !["comum", "raro", "lendário"].includes(funko.category)) {
                result.error = new Error("Category must be comum, raro or lendário");
                result.status = 400;
                return result;
            }

            if (!file) {
                result.error = new Error("Image is required");
                result.status = 400;
                return result;
            }

            funko.id = file.filename.split(".")[0];
            funko.image = file.path;
            result = await this.repository.insert(pool, funko);
        } catch (error) {
            console.log(error);
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async update(funko) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!funko.name || funko.name.length < 4) {
                console.log(funko.name.length)
                result.error = new Error("name must be at least 4 characters");
                result.status = 400;
                return result;
            }
            if (!funko.category || !["comum", "raro", "lendário"].includes(funko.category)) {
                result.error = new Error("Category must be comum, raro or lendário");
                result.status = 400;
                return result;
            }
            if (!uuidValidate(funko.id)) {
                result.error = new Error("Invalid id");
                result.status = 400;
                return result;
            }
            result = await this.repository.update(pool, funko);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async remove(id) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        const collectionRepository = new CollectionRepository();
        const client = await pool.connect();
        try {
            if (!uuidValidate(id)) {
                result.error = new Error("Invalid id");
                result.status = 400;
                return result;
            }
            await client.query("BEGIN");
            result = await collectionRepository.getByFunkoId(client, id);

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
        } catch (error) {
            result.error = error;
            result.status = 500;
            await client.query("ROLLBACK");
        } finally {
            client.release();
        }
        return result;
    }
}
