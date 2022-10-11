import ExchangePage from "./exchangePage.js";
import clientTroca from "./pageFunkoExchange.js";
import CollectionAPI from "../api/collection-api.mjs";

const exchangePage = new ExchangePage();
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

    const funkoImg = offerDiv.querySelectorAll(".funkoImgChange");
    for (let index = 0; index < funkoImg.length; index++) {
        funkoImg[index].addEventListener('click', ()=>{
            clientTroca().getIdFunko(result[index].id);
            window.location.href = `#funkoExchange`;
        })
    }
}