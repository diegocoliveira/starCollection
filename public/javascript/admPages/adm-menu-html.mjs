export default function admMenu(user) {
    return `<aside id="admMenu">
    <div>
    <div id="perfil">
        <img src="./images/person-circleWhite.png" class="avatar" alt="user icon">
        <h2 class="fontStarWars">${user.name}</h2>
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
    <a id="btn-logout" class="options , font2" href="#">
        <div id="signOut">
            <img src="./images/signOut.svg" alt="sign out icon">
            <p>Sign Out</p>
        </div>
    </a>
    </aside>
    <section id="admMain"></section>`;
}
