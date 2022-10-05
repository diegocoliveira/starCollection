const mainContent = document.getElementById('clientLeft');

const minhaColecao = `
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

        <div class="divCollectionFunkos">

            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>

            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>

            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>

            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>

            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>
            <div class="divFunko"></div>

        </div>
    </div>
   
</section>
`;

mainContent.innerHTML = minhaColecao;

export default () => {
    return minhaColecao;
};
