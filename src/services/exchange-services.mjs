import Pool from "../repository/pool.mjs";
import ExchangeRepository from "../repository/exchange-repository.mjs";

export default class ExchangeServices{
    repository = new ExchangeRepository();

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