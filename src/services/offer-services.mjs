import Pool from "../repository/pool.mjs";
import OfferRepository from "../repository/offer-repository.mjs";
import CollectionRepository from "../repository/collection-repository.mjs";
import { v4 as uuid, validate as uuidValidate } from "uuid";

export default class OfferServices {
    repository = new OfferRepository();

    async create(offer, userId) {
        const pool = await Pool.get();
        const collectionRepository = new CollectionRepository();
        let result = { data: [], error: null, status: 200 };
        const client = await pool.connect();
        try {
            if (!uuidValidate(offer.target)) {
                result.error = new Error("Invalid target");
                result.status = 400;
                return result;
            }

            if (!uuidValidate(offer.offered)) {
                result.error = new Error("Oferta inválida");
                result.status = 400;
                return result;
            }
            await client.query("BEGIN");
            const target = await collectionRepository.get(client, offer.target);

            if (target.error) {
                throw target.error;
            }
            result = await collectionRepository.getAll(client, userId);

            if (result.error) {
                throw result.error;
            }
            for (let i = 0; i < result.data.length; i++) {
                if (result.data[i].funko.id == target.data[0].funko.id) {
                    if (result.data[i].id != null) {
                        throw new Error("Você já possui esse Funko");
                    }
                    break;
                }
            }

            const offered = await collectionRepository.get(client, offer.offered);

            if (offered.error) {
                throw offered.error;
            }
            result = await collectionRepository.getAll(client, target.data[0].user.id);

            if (result.error) {
                throw result.error;
            }
            for (let i = 0; i < result.data.length; i++) {
                if (result.data[i].funko.id == offered.data[0].funko.id) {
                    if (result.data[i].id != null) {
                        throw new Error("O participante já possui esse Funko");
                    }
                    break;
                }
            }

            offer.id = uuid();
            result = await this.repository.insert(client, offer);
            await client.query("COMMIT");
        } catch (err) {
            result.error = err;
            result.status = 500;
            await client.query("ROLLBACK");
        } finally {
            client.release();
        }

        return result;
    }

    async listReceived(userId) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(userId)) {
                result.error = new Error("Invalid id User");
                result.status = 400;
                return result;
            }
            result = await this.repository.getReceived(pool, userId);
            
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async listSent(userId) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(userId)) {
                result.error = new Error("Invalid id User");
                result.status = 400;
                return result;
            }
            result = await this.repository.getSent(pool, userId);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async countOffer(){
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try{
            result = await this.repository.countOffer(pool);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }
}

