import Pool from "../repository/pool.mjs";
import CollectionRepository from "../repository/collection-repository.mjs";
import OfferRepository from "../repository/offer-repository.mjs";
import ExchangeRepository from "../repository/exchange-repository.mjs";
import { v4 as uuid, validate as uuidValidate } from "uuid";

export default class CollectionServices {
    repository = new CollectionRepository();

    async insert(collection) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(collection.userId)) {
                result.error = new Error("Invalid  user id");
                result.status = 400;
                return result;
            }
            if (!uuidValidate(collection.funko.id)) {
                result.error = new Error("Invalid  funko id");
                result.status = 400;
                return result;
            }
            collection.id = uuid();

            result = await this.repository.insert(pool, collection);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async update(collection) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(collection.id)) {
                result.error = new Error("Invalid  collection id");
                result.status = 400;
                return result;
            }
            result = await this.repository.update(pool, collection);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async remove(id) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        const offerRepository = new OfferRepository();
        const exchangeRepository = new ExchangeRepository();
        const client = await pool.connect();
        try {
            if (!uuidValidate(id)) {
                result.error = new Error("Invalid id");
                result.status = 400;
                return result;
            }
            await client.query("BEGIN");
            result = await offerRepository.getByCollectionId(pool, id);
            if (result.error) {
                throw result.error;
            }
            if (result.data.length > 0) {
                result = await this.repository.deleteSoft(client, id);
            } else {
                result = await exchangeRepository.getByCollectionId(pool, id);
                if (result.error) {
                    throw result.error;
                }
                if (result.data.length > 0) {
                    result = await this.repository.deleteSoft(client, id);
                } else {
                    result = await this.repository.deleteHard(client, id);
                }
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

    async listTradeable(filter, value) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            const repository = new CollectionRepository();
            result = await repository.getTradeable(pool,filter, value);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async getExchangeble(id) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(id)) {
                result.error = new Error("Invalid id");
                result.status = 400;
                return result;
            }
            const repository = new CollectionRepository();
            result = await repository.getExchangeInfo(pool, id);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }
}
