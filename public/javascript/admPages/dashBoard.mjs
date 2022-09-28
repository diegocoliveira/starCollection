export class Dashboard{

    infos = `
            <div id="divInfos">
                <div class="infoDashboard">
                    <div class="iconAdm">
                        <img src="./images/person2.svg" alt="person icon 2">
                    </div>
                    <div class="info">
                        <p id="quantUsers" class="font1">0</p>
                        <p class="font3">usuários</p>
                    </div>
                    </div>
                    <div class="infoDashboard">
                        <div class="iconAdm">
                            <img src="./images/hammer.svg" alt="hammer icon">
                        </div>
                        <div class="info">
                            <p id="quantOffer" class="font1">0</p>
                            <p class="font3">ofertas</p>
                        </div>
                    </div>
                    <div class="infoDashboard">
                        <div class="iconAdm">
                            <img src="./images/repeat.svg" alt="repeat icon">
                        </div>
                        <div class="info">
                            <p id="quantTrades" class="font1">0</p>
                            <p class="font3">trocas</p>
                        </div>
                    </div>
                    <div class="infoDashboard">
                        <div class="iconAdm">
                            <img src="./images/view.svg" alt="view icon">
                        </div>
                        <div class="info">
                            <p id="quantView" class="font1">0</p>
                            <p class="font3">visualizações diárias</p>
                        </div>
                </div>
            </div>`;

    recentTrades = `
        <section id="recentTrades">
            <h1 class="font1">Trocas Recentes</h1>
            <div class="infoBetween">
                <div id="infoTrades">
                    <h3 class="font1">Funko</h3>
                    <div class="iconAdm">
                        <img src="./images/repeat.svg" alt="repeat icon">
                    </div>
                </div>
                <div>
                    <h3>Status</h3>
                </div>
            </div>
        </section>`;

     tradeInfo = `
        <div class="infoBetween">
            <h4 class="trades , font1">INFO TRADE</h4>
            <div class="divStatus">
                <p class="status , font1"></p>
            </div>
        </div>`;

    finished = '<img class="iconAdm" src="./images/statusFinished.svg" alt="finished icon"/>';
    pending = '<img class="iconAdm" src="./images/statusPending.svg" alt="pending icon"/>';
    refused = '<img class="iconAdm" src="./images/statusRefused.svg" alt="refused icon"/>';
}