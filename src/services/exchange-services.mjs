import Pool from "../repository/pool.mjs";
import ExchangeRepository from "../repository/exchange-repository.mjs";
import OfferRepository from "../repository/offer-repository.mjs";
import Exchange from "../model/exchange.mjs";
import { v4 as uuid, validate as uuidValidate } from "uuid";

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
