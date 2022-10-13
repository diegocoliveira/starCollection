import client from "./client.js";
import exchangeAPI from "../api/exchange-api.mjs";
import logout from "../logout.js";

const mainContent = document.getElementById("root");

const clientTrocaConcl = `
<section id="clientConfPage">
<div class="containTrocasDiv">

    <div class="headerTrocaClient">

    <div class="trocasPage">
    <img id="gearClientImg" src="./images/repeatBlack.svg " alt="">
    <p>minhas trocas</p>
    </div>

    <div class="minhasTrocas">
    <button class="btnTrocasWhite"><a class="linkFormat" href="/#pendente">em andamento</a></button>
    <button class="btnTrocas"><a class="linkFormatTrocas" href="/#concluida">concluídas</a></button>
    <button class="btnTrocasWhite"><a class="linkFormat" href="/#recusada">recusadas</a></button>
    </div>

    </div>

    <div class="confInfosClientTroca">
        
        <h2 class="fontTroca">Trocas Concluídas</h2>

        <div class="statusTrocas">
        <div class="fonteFunko">Funko <img id="gearClientTrocaImg" src="./images/repeatBlack.svg " alt=""></div>
        <h3 class="fonteStatus">Status</h3>
        </div>

        <div class="barTroca"></div>


        <div id="tableClientTrade"></div>
    </div>
</div>
</section>`;

function infos(finished) {
    const timestamp = Date.parse(finished.updatedAt);
    const date = new Date(timestamp).toLocaleString();
    return `<div class="infoBetweenClientTrade">
                <h4>${finished.offered.funko.name} (${finished.offered.user.name}) x ${finished.target.funko.name} (${finished.target.user.name})</h4>
                <div>
                    <label class="labelTroca">troca concluída em:</label>
                    <p class="inputTroca">${date}</p>
                </div>
            </div>
            <div class="barTrade"></div>`;
}

export default async(user) => { 
    const finisheds = await exchangeAPI().listStatus('concluída');
    mainContent.innerHTML = client(user);
    const clientLeft = document.querySelector("#clientLeft");
    clientLeft.innerHTML = clientTrocaConcl;

    const tableClientTrade = document.querySelector("#tableClientTrade");
    for (let index = 0; index < finisheds.length; index++) {
        tableClientTrade.innerHTML += infos(finisheds[index]);
    }

    const btnLogout = document.querySelector("#btn-logout");
    btnLogout.onclick = logout;
};