import Pool from "../repository/pool.mjs";
import ExchangeRepository from "../repository/exchange-repository.mjs";
import OfferRepository from "../repository/offer-repository.mjs";
import CollectionRepository from "../repository/collection-repository.mjs";
import Exchange from "../model/exchange.mjs";
import { v4 as uuid, validate as uuidValidate } from "uuid";
import Collection from "../model/collection.mjs";

export default class ExchangeServices {
    repository = new ExchangeRepository();

    async create(offerId) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        const offerRepository = new OfferRepository();
        const client = await pool.connect();
        try {
            await client.query("BEGIN");
            result = await offerRepository.delete(client, offerId);
            if (result.error) {
                throw result.error;
            }
            console.log(result.data[0]);
            const offer = result.data;
            console.log(offer);
            const exchange = new Exchange();
            exchange.id = uuid();
            exchange.target = offer.target;
            exchange.offered = offer.offered;

            result = await this.repository.insert(client, exchange);
            if (result.error) {
                throw result.error;
            }

            await client.query("COMMIT");
        } catch (error) {
            await client.query("ROLLBACK");
            result.error = error;
            result.status = 500;
        } finally {
            client.release();
        }
        return result;
    }

    async list() {
        let result = { data: [], error: null, status: 200 };
        try {
            const pool = await Pool.get();
            result = await this.repository.list(pool);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async canceled(id) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            if (!uuidValidate(id)) {
                result.error = new Error("Invalid exchange id");
                result.status = 400;
                return result;
            }
            const exchange = new Exchange();
            exchange.id = id;
            exchange.status = "cancelada";
            result = await this.repository.update(pool, exchange);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async accepted(id) {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        const collectionRepository = new CollectionRepository();
        const client = await pool.connect();
        try {
            if (!uuidValidate(id)) {
                result.error = new Error("Invalid exchange id");
                result.status = 400;
                return result;
            }
            await client.query("BEGIN");
            result = await this.repository.get(client, id);
            if (result.error) {
                throw result.error;
            }
            const exchange = result.data;
            const target = new Collection();
            target.id = uuid();
            target.user = {};
            target.funko = {};
            const offered = new Collection();
            offered.id = uuid();
            offered.user = {};
            offered.funko = {};

            result = await collectionRepository.deleteSoft(client, exchange.target);
            if (result.error) {
                throw result.error;
            }
            
            target.user.id = result.data.user.id;
            target.userId = result.data.user.id;
            offered.funko.id = result.data.funko.id;

            result = await collectionRepository.deleteSoft(client, exchange.offered);
            if (result.error) {
                throw result.error;
            }
            
            offered.user.id = result.data.user.id;
            offered.userId = result.data.user.id;
            target.funko.id = result.data.funko.id;

            result = await collectionRepository.insert(client, target);
            if (result.error) {
                throw result.error;
            }

            result = await collectionRepository.insert(client, offered);
            if (result.error) {
                throw result.error;
            }

            exchange.status = "concluída";
            result = await this.repository.update(client, exchange);
            if (result.error) {
                throw result.error;
            }
            
            await client.query("COMMIT");

        } catch (error) {
            await client.query("ROLLBACK");
            result.error = error;
            result.status = 500;
        } finally {
            client.release();
        }
        return result;
    }

    async listByStatus(status, userId) {
        let result = { data: [], error: null, status: 200 };
        try {
            if (!["em andamento", "concluída", "cancelada"].includes(status)) {
                result.error = new Error("Invalid status");
                result.status = 400;
                return result;
            }

            if (!uuidValidate(userId)) {
                result.error = new Error("Invalid  user id");
                result.status = 400;
                return result;
            }
            const pool = await Pool.get();
            result = await this.repository.getByStatus(pool, status, userId);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async countExchange() {
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try {
            result = await this.repository.countExchange(pool);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }
}
