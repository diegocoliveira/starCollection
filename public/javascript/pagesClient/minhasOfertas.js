import client from "./client.js";

const mainContent = document.getElementById("root");

const minhasOfertas = `
<section id="clientConfPage">
<div class="containTrocasDiv">

    <div class="headerTrocaClient">

    <div class="trocasPage">
    <img id="gearClientImg" src="./images/hammer.svg " alt="">
    <p>minhas ofertas</p>
    </div>

    </div>

    <div class="infosTrocaCliente">
        
        <h2 class="fontTroca">Recebidas</h2>

        <div class="barTroca"></div>


        <div id="tableClientTrade">

        <div class="emAndamento">
                <h4>Darth Vader (usuário P) x Stormtrooper (eu)</h4>
                <div>
                <label class="labelTroca">proposta feita em:</label>
                <input type="date" class="inputTroca" value="2021-08-01">
                </div>
                <input type="submit" class="btnTrocaAzul" value="Aceitar">
                <input type="submit" class="btnTrocaVermelho" value="Recusar">
        </div>
        <div class="barTrade"></div>

    </div>
    </div>

    <div class="infosTrocaCliente">

    <h2 class="fontTroca">Feitas</h2>

    <div class="barTroca"></div>

    <div id="tableClientTrade">

    <div class="emAndamento">
            <h4>Yoda (usuário D) x Rey (eu)</h4>
            <div>
            <label class="labelTroca">proposta feita em:</label>
            <input type="date" class="inputTroca" value="2021-08-01">
            </div>
    </div>
    <div class="barTrade"></div>

</div>
</div>
</div>

</div>
</section>
`;
   

export default (user) => { 
    mainContent.innerHTML = client(user);
    const clientLeft = document.querySelector("#clientLeft");
    clientLeft.innerHTML = minhasOfertas;
};
