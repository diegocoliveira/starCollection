export class ConfAdmPage{

    confPage = `
    <section id="admConfPage">
        <div>
            <div class="headerConf">
                <h2>Configurações</h2>
            </div>
            <div class="confInfos , flex">
                <div id="infoDiv" class="flex">
                    <div class="greyDiv">
                        <img id="imgConf" src="./images/person3.svg" alt=""/>
                    </div>
                    <div class="info">
                        <h4>Name</h4>
                        <p class="low">tamanho minimo 100x100</p>
                        <button id="btRmFt">remover</button>
                    </div>
                </div>
                <input id="inputImgPerfil" type='file'/>
            </div>
            <div class="confInfos">
                <div>
                    <h3>Dados Pessoais</h3>
                </div>
                <div class="infoBetween">
                    <div class="flex">
                        <p class="font1 , bold , dataConfs">Name</p>
                        <p id="nameConf" class="dataConfs">NAME</p>
                    </div>
                    <button class="whiteBt">
                        <img id="editName" src="./images/edit.svg " alt="">
                    </button>
                </div>
                <div class="infoBetween">
                    <div class="flex">
                        <p class="font1 , bold , dataConfs">E-mail</p>
                        <p id="emailConf" class="dataConfs">EMAIL</p>
                    </div>
                    <button class="whiteBt">
                        <img id="editName" src="./images/edit.svg " alt="">
                    </button>
                </div>
                <div class="infoBetween">
                    <div class="flex">
                        <p class="font1 , bold , dataConfs">Senha</p>
                        <p id="passConf" class="dataConfs">*********</p>
                    </div>
                    <button class="whiteBt">
                        <img id="editName" src="./images/edit.svg " alt="">
                    </button>
                </div>
                <div class="infoBetween">
                    <div class="flex">
                        <p class="font1 , bold , dataConfs">Cidade - UF</p>
                        <p id="nameConf" class="dataConfs">CIDADE - UF</p>
                    </div>
                    <button class="whiteBt">
                        <img id="editName" src="./images/edit.svg " alt="">
                    </button>
                </div>
            </div>
        </div>
    </section>  `;


}