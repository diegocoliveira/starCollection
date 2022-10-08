import Pool from "../repository/pool.mjs";
import CollectionRepository from "../repository/collection-repository.mjs";
import { v4 as uuid, validate as uuidValidate } from "uuid";

export default class CollectionServices {
    async list(userId) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(userId)) {
                result.error = new Error("Invalid  user id");
                result.status = 400;
                return result;
            }
            const repository = new CollectionRepository();
            result = await repository.getAll(pool, userId);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }
}
