export class ConfAdmPage{

    confPage = `
    <section id="clientConfPage">
<div>

    <div class="headerConfClient">
    <img id="gearClientImg" src="./images/configuracao3.svg " alt="">
        <p>configurações</p>
    </div>

    <div class="confInfosClientTop">
        <div class="blueBar"></div>

        <div id="infoDivClient">

            <div class="greyDivClient">
                <img id="imgConfClient" src="./images/person3.svg" alt=""/>
            </div>

            <div class="infoClient">
                <h4>Name</h4>
                <p class="lowClient">tamanho minimo 100x100</p>
                <button id="btRmFtclient">remover</button>
            </div>
            <input id="inputImgPerfil" type='file'/>
        </div>

    </div>
    

    <div class="confInfosClient">

        <div class="blueBar">
         <p class="dataPerson">Dados Pessoais</p>
        </div>

        <div id="tableClient">

        <div class="infoBetweenClient">

                <p class="font1 , bold , dataConfsClient">Name</p>
                <p class="font1 , bold , dataConfsClient">E-mail</p>
                <p class="font1 , bold , dataConfsClient">Senha</p>
                <p class="font1 , bold , dataConfsClient">Cidade - UF</p>
                
        </div>

        <div class="infoBetweenClient">

                <p id="nameConf" class="dataConfsClient">Maria Sky</p>
                <p id="emailConf" class="dataConfsClient">maria.sky@gmail.com</p>
                <p id="passConf" class="dataConfsClient">*********</p>
                <p id="nameConf" class="dataConfsClient">Recife - PE</p>
    
                
        </div>


        <div class="infoBetweenClient">
            <button class="whiteBt">
                <img id="editName" src="./images/edit.svg " alt="">
            </button>
            <button class="whiteBt">
                <img id="editName" src="./images/edit.svg " alt="">
            </button>
            <button class="whiteBt">
                <img id="editName" src="./images/edit.svg " alt="">
            </button>
            <button class="whiteBt">
                <img id="editName" src="./images/edit.svg " alt="">
            </button>
        </div>

    </div>
    </div>
</div>
</section>  `;


}