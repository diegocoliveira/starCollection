export default function colecaoHtml() {

    function minhaColecao() {
        return `
        <section id="myCollectionPage">

            <div class="containTrocas">

                    <div class="divCollectionClient">

                        <img id="gearClientImg" src="./images/personBlack.svg " alt="">
                        
                        <div class="divCollectionClientText">
                            <p class="clientName">Maria Sky</p>
                            <p class="clientCity">Recife - PE</p>
                        </div>
                        
                    </div>

            </div>

            <div class="divCollectionTop">

                <div class="barTrade"></div>

                <h2 class="fontCollectionFunko">Minha Coleção</h2>

                <div class="barTrade"></div>
            </div>

            <div class="divCollectionFunkos">
           
            </div>
        </section>
        `;
            }

            function rowFunko(funko) {
                return `
                <div class="divFunko">
                
                <img class="imgCollectionFunko passarMouse" src="/repository/images/${funko.id}.png" alt="${funko.name}" title="${funko.name}"></img>
                </div>

            `;
            }
            return { minhaColecao, rowFunko };
};