import client from "./client.js";
import offerAPI from "../api/offer-api.mjs";
import exchangeAPI from "../api/exchange-api.mjs";

const mainContent = document.getElementById("root");

function minhasOfertas(){
    return `<section id="clientConfPage">
                <div class="containTrocasDiv">

                    <div class="headerTrocaClient">
                        <div class="trocasPage">
                            <img id="gearClientImg" src="./images/tagsBlack.svg " alt="">
                            <p>minhas ofertas</p>
                        </div>
                    </div>

                    <div class="infosTrocaCliente">
                        <h2 class="fontTroca">Recebidas</h2>
                        <div class="barTroca"></div>
                        <div id="tableClientTrade"></div>
                    </div>

                    <div class="infosTrocaCliente">

                        <h2 class="fontTroca">Feitas</h2>

                        <div class="barTroca"></div>

                        <div id="tableClientSend"></div>
                    </div>
                </div>
                </div>
            </section>`;
}

function offerRecieved(received){
    return `<div class="emAndamento">
                <h4>${received.offered.funko.name} (${received.offered.user.name}) x ${received.target.funko.name} (${received.target.user.name})</h4>
                <div>
                    <label class="labelTroca">proposta feita em:</label>
                    <p>${received.createdAt}</p>
                </div>
                <input type="submit" class="btnTrocaAzul" value="Aceitar">
                <input type="submit" class="btnTrocaVermelho" value="Recusar">
            </div>
            <div class="barTrade"></div>`
}

function offerSend(send) {
    return `<div class="emAndamento">
                <h4>${send.offered.funko.name} (${send.offered.user.name}) x ${send.target.funko.name} (${send.target.user.name})</h4>
                <div>
                    <label class="labelTroca">proposta feita em:</label>
                    <p>${send.createdAt}</p>
                </div>
            </div>
            <div class="barTrade"></div>`
}

function btnActions(received, user) {
    const btnTrocaAzul = tableClientTrade.querySelectorAll(".btnTrocaAzul");
    const btnTrocaVermelho = tableClientTrade.querySelectorAll(".btnTrocaVermelho");
    for (let index = 0; index < btnTrocaAzul.length; index++) {
        btnTrocaAzul[index].addEventListener('click', async ()=>{
            if (confirm(`Deseja realmente trocar o Funko "${received[index].target.funko.name}" pelo "${received[index].offered.funko.name}"?`) == true) {
                const data = {};
                data.offerId = received[index].id;
                await exchangeAPI().create(data);
                createMyOffers(user);
            }
        })         
    }
    for (let index = 0; index < btnTrocaVermelho.length; index++) {
        btnTrocaVermelho[index].addEventListener('click', async ()=>{
            if (confirm(`Deseja cancelar a trocar do Funko "${received[index].target.funko.name}" pelo "${received[index].offered.funko.name}"?`) == true) {
                await offerAPI().refuseOffer(received[index].id);
                createMyOffers(user);
            }
        });            
    }
}
   
export default async function createMyOffers(user) { 
    mainContent.innerHTML = client(user);
    const clientLeft = document.querySelector("#clientLeft");
    const received = await offerAPI().getReceived();
    const send = await offerAPI().getSent();
    clientLeft.innerHTML = minhasOfertas();

    const tableClientTrade = document.querySelector("#tableClientTrade");
    for (let index = 0; index < received.length; index++) {
        tableClientTrade.innerHTML += offerRecieved(received[index]);
    }

    btnActions(received, user);

    const tableClientSend = document.querySelector("#tableClientSend");
    for (let index = 0; index < send.length; index++) {
        tableClientSend.innerHTML += offerSend(send[index]);
    }
};
