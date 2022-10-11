import Pool from "../repository/pool.mjs";
import OfferRepository from "../repository/offer-repository.mjs";
import { validate as uuidValidate } from "uuid";

export default class OfferServices{
    repository = new OfferRepository();

    async create(offer){
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(offer.offered)) {
                result.error = new Error("Invalid offered");
                result.status = 400;
                return result;
            }
            if (!uuidValidate(offer.target)) {
                result.error = new Error("Invalid target");
                result.status = 400;
                return result;
            }
            result = await this.repository.insert(pool, offer);
        } catch (err) {
            result.error = err;
            result.status = 500;
        }
        return result;
    }
}