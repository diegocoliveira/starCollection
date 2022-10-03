import { v4 as uuid, validate as uuidValidate } from "uuid";

export default class FunkoServices {
    async create(funko, file) {
        // const pool = await Pool.get();
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

            funko.id = file.filename;
            result.data = funko;
            //result = await this.repository.insert(pool, funko);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }
}
