export class ConfAdmPage {

    confPage(user) {
        return `<section id="admConfPage">
        <div class="headerConfClient">
        <img id="gearClientImg" src="./images/configuracao3.svg " alt="">
            <p>configurações</p>
        </div>
               
                <div class="confInfos">
                <div class="blueBar">
                <p class="dataPerson">Dados Pessoais</p>
               </div>
                    
                    <div class="infoBetweenDois paddingInfoBetween">
                        <div class="flex">
                            <p class="font1 , bold , dataConfs">Nome</p>
                            <p id="name" class="dataConfs">${user.name}</p>
                        </div>
                        <button class="whiteBt">
                            <img src="./images/edit.svg " alt="">
                        </button>
                    </div>
                    <div class="infoBetweenDois paddingInfoBetween">
                        <div class="flex">
                            <p class="font1 , bold , dataConfs">E-mail</p>
                            <p id="email" class="dataConfs">${user.email}</p>
                        </div>
                        <button class="whiteBt">
                            <img src="./images/edit.svg " alt="">
                        </button>
                    </div>
                    <div class="infoBetweenDois paddingInfoBetween">
                        <div class="flex">
                            <p class="font1 , bold , dataConfs">Senha</p>
                            <p id="pass" class="dataConfs">*********</p>
                        </div>
                        <button class="whiteBt">
                            <img src="./images/edit.svg " alt="">
                        </button>
                    </div>
                    <div class="infoBetweenDois paddingInfoBetween">
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
