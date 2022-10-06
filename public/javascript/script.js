import login from "./pagesLogin/login.mjs";
import forgot from "./pagesLogin/forgot.js";
import signup from "./pagesLogin/signup.js";
import index from "./pageHome/index.js";
import { createMenu } from "./admPages/createAdmPage.mjs";
import { createExchange } from "./exchangePage/createExchange.js";
// import clientPage from "./pagesClient/pageClient.js";

const mainContent = document.getElementById("root");
// const menu = document.getElementById('clientRight');
// const leftContent = document.getElementById('clientLeft');

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
        default:
            mainContent.innerHTML = index();
            break;
    }
}

window.addEventListener("hashchange", route);
