const mainContent = document.getElementById('clientLeft');

const clientTrocaConcl = `
<section id="clientConfPage">
<div class="containTrocas">

    <div class="headerTrocaClient">

    <div class="trocasPage">
    <img id="gearClientImg" src="./images/repeatBlack.svg " alt="">
    <p>Minhas Trocas</p>
    </div>

    <div class="minhasTrocas">
    <button class="btnTrocasWhite">em andamento</button>
    <button class="btnTrocas">concluídas</button>
    <button class="btnTrocasWhite">recusadas</button>
    </div>

    </div>

    <div class="confInfosClientTroca">
        
        <h2 class="fontTroca">Trocas Concluídas</h2>

        <div class="statusTrocas">
        <div class="fonteFunko">Funko <img id="gearClientTrocaImg" src="./images/repeatBlack.svg " alt=""></div>
        <h3 class="fonteStatus">Status</h3>
        </div>

        <div class="barTroca"></div>


        <div id="tableClientTrade">

        <div class="infoBetweenClientTrade">
                <h4>Darth Vader (usuário R) x Stormtrooper (usuário A)</h4>
                <div>
                <label class="labelTroca">troca concluída em:</label>
                <input type="date" class="inputTroca" value="2021-08-01">
                </div>
        </div>
        <div class="barTrade"></div>

    </div>
    </div>
</div>
</section>

`;

mainContent.innerHTML = clientTrocaConcl;

export default () => {
    return clientTrocaConcl;
};
