import exchangeAPI from "../api/exchange-api.mjs";
import client from "./client.js";
import logout from "../logout.js";

const mainContent = document.getElementById("root");

const clientTrocaRecusada = `<section id="clientConfPage">
    <div class="containTrocasDiv">
    
        <div class="headerTrocaClient">
    
        <div class="trocasPage">
        <img id="gearClientImg" src="./images/repeatBlack.svg " alt="">
        <p>minhas trocas</p>
        </div>
    
        <div class="minhasTrocas">
        <button class="btnTrocasWhite"><a class="linkFormat" href="/#pendente">em andamento</a></button>
        <button class="btnTrocasWhite"><a class="linkFormat" href="/#concluida">concluídas</a></button>
        <button class="btnTrocas"><a class="linkFormatTrocas" href="/#recusada">recusadas</a></button>
        
        </div>
    
        </div>
    
        <div class="confInfosClientTroca">
            
            <h2 class="fontTroca">Trocas Recusadas</h2>
    
            <div class="statusTrocas">
            <div class="fonteFunko">Funko <img id="gearClientTrocaImg" src="./images/repeatBlack.svg " alt=""></div>
            <h3 class="fonteStatus">Status</h3>
            </div>
    
            <div class="barTroca"></div>
    
    
            <div id="tableClientTrade">
    
        </div>
        </div>
    </div>
    </section> `;


function infos(refused) {
    const timestamp = Date.parse(refused.updatedAt);
    const date = new Date(timestamp).toLocaleString();
    return `<div class="infoBetweenClientTrade">
                <h4>${refused.offered.funko.name} (${refused.offered.user.name}) x ${refused.target.funko.name} (${refused.target.user.name})</h4>
                <div>
                    <label class="labelTroca">troca recusada em:</label>
                    <p class="inputTroca">${date}</p>
                </div>
            </div>
            <div class="barTrade"></div>`;
}

export default async (user) => { 
    const refuseds = await exchangeAPI().listStatus('cancelada');
    mainContent.innerHTML = client(user);
    const clientLeft = document.querySelector("#clientLeft");
    clientLeft.innerHTML = clientTrocaRecusada;
    const tableClientTrade = document.querySelector("#tableClientTrade");
    for (let index = 0; index < refuseds.length; index++) {
        tableClientTrade.innerHTML += infos(refuseds[index]);
    }

    const btnLogout = document.querySelector("#btn-logout");
    btnLogout.onclick = logout;
};
