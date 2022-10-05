import ExchangePage from "./exchangePage.js";

const exchangePage = new ExchangePage();
//const infos = {fkName: 'FUNKO NAME', img: "./images/rey.png", username: "USER NAME"}
export function createExchange() {
    const root = document.querySelector('#root');
    root.innerHTML = exchangePage.exchangeMain();
    //insertExnchanged();
}

function insertExnchanged(infos) {
    const offerDiv = document.querySelector("#offerDiv");
    offerDiv.innerHTML += exchangePage.funkoFigure(infos);
}