import FunkoAPI from "../api/funko-api.mjs";
import myCollectionHtml from "./myCollection.js";
import client from "./client.js";
import UserAPI from "../api/user-api.mjs";

const mainContent = document.getElementById("root");

async function createCollection() {
    const divAllFunkos = document.querySelector(".divCollectionFunkos");
    const funkoAPI = FunkoAPI();

    try {
        const funkos = await funkoAPI.list();

        for (let i = 0; i < funkos.length; i++) {
            divAllFunkos.innerHTML += myCollectionHtml().rowFunko(funkos[i]);
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

export default function action(user) {
    mainContent.innerHTML = client(user);
    const clientLeft = document.querySelector("#clientLeft");
    clientLeft.innerHTML = myCollectionHtml().minhaColecao(user);
    createCollection();

    const btnLogout = document.querySelector("#btn-logout");
    btnLogout.onclick = logout;
}

function logout() {
    const userAPI = UserAPI();
    try {
        if (userAPI.logout()) {
            window.location.href = "/#";
        } else {
            alert("Erro ao fazer logout");
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}
