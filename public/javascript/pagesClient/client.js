export default function menuLateralClient(user) {
    return `<aside id="clientRight">
                <div class="divContainerMenuLateral">

                    <div id="perfilClient">
                        <img src="./images/person-circleWhite.png" class="avatar" alt="user icon">
                        <h2 class="fontStarWars">${user.name}</h2>
                     
                        <button id="collectionButton"><a class="linkFormat linkAmyCollection" href="/#collection">Minha Coleção</a></button>
                    </div>

                    <div class="barClient"></div>

                    <nav class="navMenuClient">

                        <div id="subMenuClient">
                            <button id="dashBt" class="optionsPrincipal , font2">
                                <div class="iconClient">
                                    <img src="./images/trocas.svg" alt="home icon" id="trocas">
                                </div>
                                Minhas Trocas
                            </button>

                            <div class="divOptionsTrocas">
                            <button class="optionsClient"><a class="linkFormatTrocas" href="/#pendente">em andamento</a></button>
                            <button class="optionsClient"><a class="linkFormatTrocas" href="/#concluida">concluídas</a></button>
                            <button class="optionsClient"><a class="linkFormatTrocas" href="/#recusada">recusadas</a></button>
                            </div>

                    

                            <a class="optionsPrincipal , font2" id="btnOfertas" href="/#ofertas">

                                <div class="iconClient">
                                    <img src="./images/tags.svg" alt="log icon" id="oferta">
                                </div>

                                Minhas Ofertas

                                </a>
                        


                            <a class="optionsPrincipal , font2" id="btnConfig" href="/#configuracao">

                            <div class="iconClient">
                              <img src="./images/gear.svg" alt="gear icon">
                            </div>

                                Configurações

                            </a>


                        </div>
                    </nav>
                </div>
                <a id="btn-logout" class="options , font2" >
                     <div id="signOut">
                        <img src="./images/signOut.svg" alt="sign out icon">
                        <p>Sair</p>
                    </div>
                </a>
                
                </section>
            </aside>

            <section id="clientLeft"></section>`;
}
