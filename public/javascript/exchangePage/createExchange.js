import ExchangePage from "./exchangePage.js";
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

    const funkoImg = offerDiv.querySelectorAll(".funkoImg");
    for (let index = 0; index < funkoImg.length; index++) {
        funkoImg[index].addEventListener('click', ()=>{
            window.location.href = '#funkoExchange';
        })
    }
}