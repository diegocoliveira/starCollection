import login from "./pagesLogin/login.mjs";
import forgot from "./pagesLogin/forgot.js";
import signup from "./pagesLogin/signup.js";
import index from "./pageHome/index.js";
import { createMenu } from "./admPages/createAdmPage.mjs";
import { createExchange } from "./exchangePage/createExchange.js";
import createCollection from "./pagesClient/createClientPage.js";
import minhasOfertas from "./pagesClient/minhasOfertas.js";
import trocaPendente from "./pagesClient/trocaPendente.js";
import trocaConcluida from "./pagesClient/trocaConcluida.js";
import trocaRecusada from "./pagesClient/trocaRecusada.js";
import clientConfig from "./pagesClient/pageClient.js";


const mainContent = document.getElementById("root");


function route() {
    const hash = window.location.hash;
    mainContent.innerHTML = "";
    switch (hash) {
        case "#":
            mainContent.innerHTML = index();
            break;
        case "#login":
            login();
            break;
        case "#forgot":
            mainContent.innerHTML = forgot();
            break;
        case "#signup":
            mainContent.innerHTML = signup();
            break;
        case "#admPage":
            createMenu();
            break;
        case "#exchange":
            createExchange();
            break;
        case "#collection":
           createCollection();
            break;
        case "#ofertasRecebidas":
            minhasOfertas();
            break;
        case "#ofertasFeitas":
            minhasOfertas();
            break;
        case "#pendente":
            trocaPendente();
            break;
        case "#concluida":
            trocaConcluida();
            break;
        case "#recusada":
            trocaRecusada();
            break;
        case "#configuracao":
            clientConfig();
            break;
        default:
            mainContent.innerHTML = index();
            break;
    }
}

window.addEventListener("hashchange", route);
