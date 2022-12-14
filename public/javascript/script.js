import login from "./pagesLogin/login.mjs";
import forgot from "./pagesLogin/forgot.js";
import createSignup from "./pagesLogin/signup-script.js";
import index from "./pageHome/index.js";
import { createMenu } from "./admPages/createAdmPage.mjs";
import { createExchange } from "./exchangePage/createExchange.js";
import UserAPI from "./api/user-api.mjs";
import createCollection from "./pagesClient/createClientPage.js";
import minhasOfertas from "./pagesClient/minhasOfertas.js";
import trocaPendente from "./pagesClient/trocaPendente.js";
import trocaConcluida from "./pagesClient/trocaConcluida.js";
import trocaRecusada from "./pagesClient/trocaRecusada.js";
import clientConfig from "./pagesClient/pageClient.js";
import clientTroca from "./exchangePage/pageFunkoExchange.js";

const mainContent = document.getElementById("root");
const searchButton = document.querySelector("#searchButton");
searchButton.addEventListener("click", () => {
    createExchange();
});

async function route() {
    const hash = window.location.hash;
    const clientsAuthorized = [
        "#collection",
        "#ofertas",
        "#trocasPendentes",
        "#trocasConcluidas",
        "#trocasRecusadas",
        "#configuracoes",
        "#funkoExchange",
    ];
    const admAuthorized = ["#admPage"];
    const user = await UserAPI().authorization();
    if (clientsAuthorized.includes(hash) && !user) {
        window.location.hash = "#login";
    }
    if (admAuthorized.includes(hash) && user.type != "administrador") {
        window.location.hash = "#login";
    }
    mainContent.innerHTML = "";
    const search = document.querySelector("#search");
    search.value = "";

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
            createSignup();
            break;
        case "#admPage":
            createMenu(user);
            break;
        case "#exchange":
            createExchange();
            break;
        case "#collection":
            createCollection(user);
            break;
        case "#ofertas":
            minhasOfertas(user);
            break;
        case "#pendente":
            trocaPendente(user);
            break;
        case "#concluida":
            trocaConcluida(user);
            break;
        case "#recusada":
            trocaRecusada(user);
            break;
        case "#configuracao":
            clientConfig(user);
            break;
        case "#funkoExchange":
            clientTroca().pageFunkoExchange(user);
            break;
        default:
            mainContent.innerHTML = index();
            break;
    }
}

window.addEventListener("hashchange", route);
