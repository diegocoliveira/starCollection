import client from "../pagesClient/client.js";

const mainContent = document.getElementById("root");

function clientTrocaFunko(user){
    return `<section id="itemPage">
                <div class="funkoInfo">
                    <img class="funkoImg" src="images/vader.png">
                    <div class="ownerInfo">
                        <img class="ownerPhoto" src="images/person-circleWhite.png">
                        <string>
                            <h3 class="ownerName">${user.name}</h3>
                            <h4 class="ownerCity">${user.city} - ${user.state}</h4>
                        </string>
                    </div>
                </div>
                <div class="exchangeFunko">
                    <div id="titleBox">
                        <h3 id="productFunko">Funko</h4>
                        <h2 id="funkoName">Vader</h2>
                        <div class="barTroca"></div>
                    </div>
                    
                    <p>Itens disponíveis para troca:</p>

                    <select id="selectorFunko">
                        <option disabled selected>---</option>
                        <option>Rey</option>
                        <option>Anakin</option>
                        <option>R2D2</option>
                        <option>Stormtrooper</option>
                        <option>Obi Wan Kenobi</option>
                        <option>Vader</option>
                        <option>Carbonite Han</option>
                        <!-- O funko escolhido será exibido na classe SelectedFunko-->
                    </select>
                    <div class="SelectedFunko">
                        <img class="SelectedFunkoImg">
                        <p class="FunkoName"></p>
                    </div> 
                    <input type="submit" value="Fazer Oferta" id="exchangeButton">
                </div>   
            </section>`;
} 

export default (user) => { 
    if (user.length == 0) {
        window.location.href = '#login';
    } else{
        mainContent.innerHTML = client(user);
        const clientLeft = document.querySelector("#clientLeft");
        clientLeft.innerHTML = clientTrocaFunko(user);
    }
};

{/* <div class="slideshow-container">
                            <div class="mySlides fade">
                                <img src="./images/jaja.svg">
                                <img src="./images/rey.svg">
                                <img src="./images/vader.svg">
                      </div> */}