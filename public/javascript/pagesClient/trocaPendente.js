const mainContent = document.getElementById('clientLeft');

const clientTrocaPendente = `
<section id="clientConfPage">
<div class="containTrocas">

    <div class="headerTrocaClient">

    <div class="trocasPage">
    <img id="gearClientImg" src="./images/repeatBlack.svg " alt="">
    <p>Minhas Trocas</p>
    </div>

    <div class="minhasTrocas">
    <button class="btnTrocas">em andamento</button>
    <button class="btnTrocasWhite">concluídas</button>
    <button class="btnTrocasWhite">recusadas</button>
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
                <h4>Darth Vader (usuário R) x Stormtrooper (usuário A)</h4>
                <div>
                <label class="labelTroca">proposta feita em:</label>
                <input type="date" class="inputTroca" value="2021-08-01">
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

mainContent.innerHTML = clientTrocaPendente;

export default () => {
    return clientTrocaPendente;
};
