import Pool from "../repository/pool.mjs";
import ExchangeRepository from "../repository/exchange-repository.mjs";
import { validate as uuidValidate } from "uuid";

export default class ExchangeServices{
    repository = new ExchangeRepository();

    async list(userId){
        if (!uuidValidate(userId)) {
            result.error = new Error("Invalid  user id");
            result.status = 400;
            return result;
        }
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try{
            result = await this.repository.list(pool);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

    async countExchange(){
        const pool = await Pool.get();
        let result = { data: [], error: null, status: 200 };
        try{
            result = await this.repository.countExchange(pool);
        } catch (error) {
            result.error = error;
            result.status = 500;
        }
        return result;
    }

}