export class AdmMenu{

    menu = `<aside id="admMenu">
    <div>
    <div id="perfil">
        <img src="./images/person3.svg" class="avatar" alt="user icon">
        <h2 class="font2">NAME</h2>
    </div>
    <nav>
    <div id="subMenu">
    <button id="dashBt" class="options , font2">
        <div class="iconAdm">
            <img src="./images/home.svg" alt="home icon">
        </div>
        Dashboard
    </button>
    <button id="registBt" class="options , font2">
        <div class="iconAdm">
            <img src="./images/log.svg" alt="log icon">
        </div>
        Cadastro
    </button>
    <button id="userBt" class="options , font2">
        <div class="iconAdm">
            <img src="./images/person.svg" alt="user icon">
        </div>
        Usuário
    </button>
    <button id="confBt" class="options , font2">
        <div class="iconAdm">
            <img src="./images/gear.svg" alt="gear icon">
        </div>
        Configurações
    </button>
    </div>
    </nav>
    </div>
    <a id="outBt" class="options , font2" href="#">
        <div id="signOut">
            <img src="./images/signOut.svg" alt="sign out icon">
            <p>Sign Out</p>
        </div>
    </a>
    </aside>`;

    admMain = `<section id="admMain"></section>`;

}