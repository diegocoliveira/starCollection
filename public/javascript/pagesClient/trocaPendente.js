import client from "./client.js";
import exchangeAPI from "../api/exchange-api.mjs";
import logout from "../logout.js";

const mainContent = document.getElementById("root");

const clientTrocaPendente = `
<section id="clientConfPage">
<div class="containTrocasDiv">

    <div class="headerTrocaClient">

    <div class="trocasPage">
    <img id="gearClientImg" src="./images/repeatBlack.svg " alt="">
    <p>minhas trocas</p>
    </div>

    <div class="minhasTrocas">
    <button class="btnTrocas"><a class="linkFormatTrocas" href="/#pendente">em andamento</a></button>
    <button class="btnTrocasWhite"><a class="linkFormat" href="/#concluida">concluídas</a></button>
    <button class="btnTrocasWhite"><a class="linkFormat" href="/#recusada">recusadas</a></button>
    </div>

    </div>

    <div class="confInfosClientTroca">
        
        <h2 class="fontTroca">Trocas Em Andamento</h2>

        <div class="statusTrocas">
        <div class="fonteFunko">Funko <img id="gearClientTrocaImg" src="./images/repeatBlack.svg " alt=""></div>
        </div>

        <div class="barTroca"></div>


        <div id="tableClientTrade">
    </div>
    </div>
</div>
</section>`;

function infos(pending){
    const timestamp = Date.parse(pending.createdAt);
    const date = new Date(timestamp).toLocaleString();
    return `<div class="emAndamento">
                <div class="dataPedidoTroca">
                    <h4>${pending.offered.funko.name} (${pending.offered.user.name}) x ${pending.target.funko.name} (${pending.target.user.name})</h4>
                    <div class="labelTroca">
                        <label class="labelTroca">proposta feita em:</label>
                        <p class="inputTroca">${date}</p>
                    </div>
                </div>
                <input type="submit" class="btnTrocaAzul" value="Concluir">
                <input type="submit" class="btnTrocaVermelho" value="Cancelar">
            </div>
            <div class="barTrade"></div>`
}

function btnActions(pending, user){
    const btnTrocaAzul = document.querySelectorAll(".btnTrocaAzul");
    const btnTrocaVermelho = document.querySelectorAll(".btnTrocaVermelho");
    for (let index = 0; index < btnTrocaAzul.length; index++) {
        btnTrocaAzul[index].addEventListener('click', async ()=>{
            if (confirm(`Deseja realmente trocar o Funko "${pending[index].target.funko.name}" pelo "${pending[index].offered.funko.name}"?`) == true) {
                await exchangeAPI().accepted(pending[index].id);
                createPending(user);
            }
        });
    }
    for (let index = 0; index < btnTrocaVermelho.length; index++) {
        btnTrocaVermelho[index].addEventListener('click', async ()=>{
            if (confirm(`Deseja cancelar a trocar do Funko "${pending[index].target.funko.name}" pelo "${pending[index].offered.funko.name}"?`) == true) {
                await exchangeAPI().canceled(pending[index].id);
                createPending(user);
            }
        });
    }
}
    
export default async function createPending(user) { 
    const pending = await exchangeAPI().listStatus('em andamento');
    mainContent.innerHTML = client(user);
    const clientLeft = document.querySelector("#clientLeft");
    clientLeft.innerHTML = clientTrocaPendente;

    const tableClientTrade = document.querySelector("#tableClientTrade");
    for (let index = 0; index < pending.length; index++) {
        tableClientTrade.innerHTML += infos(pending[index]);
    }
    btnActions(pending, user)

    const btnLogout = document.querySelector("#btn-logout");
    btnLogout.onclick = logout;
};