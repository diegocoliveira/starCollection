import ExchangePage from "./exchangePage.js";
import CollectionAPI from "../api/collection-api.mjs";

const exchangePage = new ExchangePage();
//const infos = {fkName: 'FUNKO NAME', img: "./images/rey.png", username: "USER NAME"}
export function createExchange() {
    const root = document.querySelector('#root');
    root.innerHTML = exchangePage.exchangeMain();
    insertExnchanged();
}

async function insertExnchanged() {
    const collectionApi = new CollectionAPI;
    const result = await collectionApi.listExchange();
    const offerDiv = document.querySelector("#offerDiv");

    for (let index = 0; index < result.length; index++) {
        offerDiv.innerHTML += exchangePage.funkoFigure(result[index]);
    }
    
}