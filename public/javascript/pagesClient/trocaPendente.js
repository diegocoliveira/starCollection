import client from "./client.js";

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

        <div class="emAndamento">
                <div class="dataPedidoTroca">
                <h4>Darth Vader (usuário R) x Stormtrooper (usuário A)</h4>
                <div class="labelTroca">
                <label class="labelTroca">proposta feita em:</label>
                <input type="date" class="inputTroca" value="2021-08-01">
                </div>
                </div>
                
                <input type="submit" class="btnTrocaAzul" value="Concluir">
                <input type="submit" class="btnTrocaVermelho" value="Cancelar">
        </div>
        <div class="barTrade"></div>

    </div>
    </div>
</div>
</section>
`;
    
export default (user) => { 
    mainContent.innerHTML = client(user);
    const clientLeft = document.querySelector("#clientLeft");
    clientLeft.innerHTML = clientTrocaPendente;
};