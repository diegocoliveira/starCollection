import client from "../pagesClient/client.js";
import CollectionAPI from "../api/collection-api.mjs";
import FunkoAPI from "../api/funko-api.mjs";
import offerAPI from "../api/offer-api.mjs";

//const mainContent = document.getElementById("root");
let id = null;
export default function clientTroca() {
    function clientTrocaFunko(info) {
        return `<section id="itemPage">
                    <div class="funkoInfo">
                        <img class="funkoImg" src="repository/images/${info.funko.id}.png">
                        <div class="ownerInfo">
                            <img class="ownerPhoto" src="images/person-circleWhite.png">
                            <string>
                                <h3 class="ownerName">${info.user.name}</h3>
                                <h4 class="ownerCity">${info.user.city} - ${info.user.state}</h4>
                            </string>
                        </div>
                    </div>
                    <div class="exchangeFunko">
                        <div id="titleBox">
                            <h3 id="productFunko">Funko</h4>
                            <h2 id="funkoName">${info.funko.name}</h2>
                            <h4>${info.funko.category}</h4>
                            <div class="barTroca"></div>
                        </div>
                        
                        <p>Itens disponíveis para troca:</p>
    
                        <select id="selectorFunko">
                            <option disabled selected>---</option>
                  
                            <!-- O funko escolhido será exibido na classe SelectedFunko-->
                        </select>
                        <div class="SelectedFunko">
                            <img class="SelectedFunkoImg">
                            <p class="FunkoName"></p>
                        </div> 
                        <button type="button" id="exchangeButton">Fazer Oferta</button>
                    </div>   
                </section>`;
    }

    async function pageFunkoExchange(user) {
        if (user.length == 0) {
            window.location.href = "#login";
        } else {
            const mainContent = document.querySelector("#root");
            mainContent.innerHTML = client(user);
            const clientLeft = document.querySelector("#clientLeft");
            const result = await CollectionAPI().get(id);
            const item = await CollectionAPI().listExchangeUser();
            clientLeft.innerHTML = clientTrocaFunko(result[0]);

            const selectorFunko = document.querySelector("#selectorFunko");
            const exchangeButton = document.querySelector("#exchangeButton");
            for (let index = 0; index < item.length; index++) {
                selectorFunko.innerHTML += `<option value="${item[index].id}">${item[index].funko.name}</option>`;
            }
            exchangeButton.addEventListener("click", async () => {
                try {
                    await createOffer(id, selectorFunko.value);
                    alert("Oferta enviada com sucesso!");
                    window.location.hash = "#exchange";
                } catch (error) {
                    alert(error.message);
                }
            });
        }
    }

    function getIdFunko(_id) {
        return (id = _id);
    }

    async function createOffer(target, offered) {
        const offer = {};
        offer.target = target;
        offer.offered = offered;
        await offerAPI().insert(offer);
    }

    return { pageFunkoExchange, getIdFunko };
}

{
    /* <div class="slideshow-container">
                            <div class="mySlides fade">
                                <img src="./images/jaja.svg">
                                <img src="./images/rey.svg">
                                <img src="./images/vader.svg">
                      </div> */
}
