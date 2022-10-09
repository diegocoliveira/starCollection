export default function colecaoHtml() {
    function minhaColecao(user) {
        return `
        <section id="myCollectionPage">

            <div class="containTrocas">

                    <div class="divCollectionClient">

                        <img id="gearClientImg" src="./images/personBlack.svg " alt="">
                        
                        <div class="divCollectionClientText">
                            <p class="clientName">${user.name}</p>
                            <p class="clientCity">${user.city} - ${user.state}</p>
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

    function rowFunko(item) {
        return `
            
                <div class="divFunko , ${item.funko.category} , ${item.id != null ? "my-item" : ""} , ${item.id}">
                    <img class="imgCollectionFunko" id="${item.id || ""}" data-funko-id="${item.funko.id}" 
                        src="/repository/images/${item.funko.id}.png" alt="${item.funko.name}" title="${item.funko.name}"></img>


                    <button class="exchange btnCollectionFunko ${item.isExchange ? 'btnChange' : 'btnNoChange'}" data-exchange="${item.isExchange}" data-funko-name="${item.funko.name}"  
                            style="${item.id != null ? "" : "display:none"}"  id="${item.id || ""}"">
                    </button>
                </div>

            `;
    }
    return { minhaColecao, rowFunko };
}
