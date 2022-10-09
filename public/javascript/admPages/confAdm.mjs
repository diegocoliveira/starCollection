export class ConfAdmPage{

    confPage(user){
        return `<section id="admConfPage">
                <div class="headerAdm">
                    <h2 class="fontStarWarsBlack">Configuracoes</h2>
                </div>
                <div class="line2"></div>
                <div class="confInfos , flex">
                    <div id="infoDiv" class="flex">
                        <div class="greyDiv">
                            <img id="imgConf" src="./images/person3.svg" alt=""/>
                        </div>
                        <div class="info">
                            <h4>Foto</h4>
                            <p class="low">tamanho minimo 100x100</p>
                            <button id="btRmFt">remover</button>
                        </div>
                    </div>
                    <input id="inputImgPerfil" type='file'/>
                </div>
                <div class="confInfos">
                    <div class="fontStarWarsBlack">
                        <h3>Dados Pessoais</h3>
                    </div>
                    <div class="line2"></div>
                    <div class="infoBetween">
                        <div class="flex">
                            <p class="font1 , bold , dataConfs">Nome</p>
                            <p id="name" class="dataConfs">${user.name}</p>
                        </div>
                        <button class="whiteBt">
                            <img src="./images/edit.svg " alt="">
                        </button>
                    </div>
                    <div class="infoBetween">
                        <div class="flex">
                            <p class="font1 , bold , dataConfs">E-mail</p>
                            <p id="email" class="dataConfs">${user.email}</p>
                        </div>
                        <button class="whiteBt">
                            <img src="./images/edit.svg " alt="">
                        </button>
                    </div>
                    <div class="infoBetween">
                        <div class="flex">
                            <p class="font1 , bold , dataConfs">Senha</p>
                            <p id="pass" class="dataConfs">*********</p>
                        </div>
                        <button class="whiteBt">
                            <img src="./images/edit.svg " alt="">
                        </button>
                    </div>
                    <div class="infoBetween">
                        <div class="flex">
                            <p class="font1 , bold , dataConfs">UF - Cidade</p>
                            <p id="endress" class="dataConfs">${user.state} - ${user.city}</p>
                        </div>
                        <button class="whiteBt">
                            <img src="./images/edit.svg " alt="">
                        </button>
                    </div>
                </div>
        </section>  `;
    }
}