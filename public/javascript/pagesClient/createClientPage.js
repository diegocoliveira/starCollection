import myCollectionHtml from "./myCollection.js";
import client from "./client.js";
import UserAPI from "../api/user-api.mjs";
import CollectionAPI from "../api/collection-api.mjs";

const mainContent = document.getElementById("root");

async function createCollection() {
    const divAllFunkos = document.querySelector(".divCollectionFunkos");
    const api = CollectionAPI();

    try {
        const data = await api.list();
        divAllFunkos.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            divAllFunkos.innerHTML += myCollectionHtml().rowFunko(data[i]);
        }

        const imgCollectionFunko = document.querySelectorAll(".imgCollectionFunko");
        for (let i = 0; i < imgCollectionFunko.length; i++) {
            imgCollectionFunko[i].onclick = function (e) {
                if (e.target.id == "") {
                    create(e.target.dataset.funkoId, e.target.title);
                } else {
                    remove(e.target.id, e.target.title);
                }
            };
        }

        const btnExchange = document.querySelectorAll(".exchange");
        for (let i = 0; i < btnExchange.length; i++) {
            btnExchange[i].onclick = function (e) {
                exchange(e.target.id, e.target.dataset.funkoName, e.target.dataset.exchange);
            };
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

async function create(id, name) {
    if (confirm(`Deseja mesmo adicionar '${name}' à sua coleção ?`)) {
        const api = CollectionAPI();
        try {
            const funko = { funkoId: id, isExchange: false };
            await api.insert(funko);
            alert(`Funko '${name}' adicionado à sua coleção`);
            createCollection();
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }
}

async function exchange(id, name, isExchange) {
    if (confirm(`Deseja mesmo ${isExchange == "true" ? "retirar" : "adicionar"} '${name}' à lista de trocas ?`)) {
        const api = CollectionAPI();
        try {
            const item = { id: id, isExchange: isExchange == "true" ? false : true };
            await api.update(item);
            alert(`Funko '${name}' ${isExchange == "true" ? "retirado" : "adicionado"} à lista de trocas`);
            createCollection();
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }
}

async function remove(id, name) {
    if (confirm(`Deseja mesmo remover '${name}' da sua coleção ?`)) {
        const api = CollectionAPI();
        try {
            await api.remove(id);
            alert(`Funko '${name}' removido da sua coleção`);
            createCollection();
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
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
