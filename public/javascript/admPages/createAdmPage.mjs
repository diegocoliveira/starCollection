import admMenu from "./adm-menu-html.mjs";
import { Dashboard } from "./dashBoard.mjs";
import FunkoCreate from "./funko-create-html.mjs";
import FunkoList from "./funko-list-html.mjs";
import { Line } from "../line.mjs";
import { readURL } from "../preview.js";
import { Clear } from "../clearPages.js";

import { UserListPage } from "./userList.mjs";
import { ConfAdmPage } from "./confAdm.mjs";

import FunkoAPI from "../api/funko-api.mjs";
import UserAPI from "../api/user-api.mjs";

const clear = new Clear();
const dashBoard = new Dashboard();
const funkoCreate = new FunkoCreate();
const line = new Line();
const userListPage = new UserListPage();
const confAdmPage = new ConfAdmPage();

let user;

export function createMenu(_user) {
    user = _user;
    clear.rootClear();
    root.innerHTML = admMenu(user);

    const dashBt = document.querySelector("#dashBt");
    const registBt = document.querySelector("#registBt");
    const userBt = document.querySelector("#userBt");
    const confBt = document.querySelector("#confBt");
    const btnLogout = document.querySelector("#btn-logout");

    dashBt.addEventListener("click", dashBoardCreate);
    registBt.addEventListener("click", register);
    userBt.addEventListener("click", userListCreate);
    confBt.addEventListener("click", confCreate);
    btnLogout.onclick = logout;

    dashBoardCreate();
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

function dashBoardCreate() {
    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML += dashBoard.infos;
    main.innerHTML += dashBoard.recentTrades;
    listInfo();
}

function listInfo() {
    const infos = document.querySelector("#recentTrades");
    infos.innerHTML += line.line1;
    infos.innerHTML += dashBoard.tradeInfo + line.line2;
    infos.innerHTML += dashBoard.tradeInfo + line.line2;
    infos.innerHTML += dashBoard.tradeInfo + line.line2;
    const status = document.querySelectorAll(".status");

    for (let index = 0; index < status.length; index++) {
        if (index == 0) {
            status[index].innerHTML = "troca concluida";
        } else if (index == 1) {
            status[index].innerHTML = "troca em andamento";
        } else if (index == 2) {
            status[index].innerHTML = "troca recusada";
        }
    }
    statusList();
}

function statusList() {
    const divStatus = document.querySelectorAll(".divStatus");
    const status = document.querySelectorAll(".status");

    for (let index = 0; index < status.length; index++) {
        if (status[index].innerHTML == "troca concluida") {
            divStatus[index].innerHTML += dashBoard.finished;
        } else if (status[index].innerHTML == "troca em andamento") {
            divStatus[index].innerHTML += dashBoard.pending;
        } else if (status[index].innerHTML == "troca recusada") {
            divStatus[index].innerHTML += dashBoard.refused;
        }
    }
}

function register() {
    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML += funkoCreate.html;

    const file = document.querySelector("#input-file");
    const btListProd = document.querySelector("#btListProds");
    const resultFile = document.querySelector("#result-file");
    const btnAdd = document.querySelector("#btn-add");

    btnAdd.onclick = create;
    btListProd.addEventListener("click", list);

    file.addEventListener("change", function () {
        readURL(this, "fk");
        const size = this.files[0].size;
        if (size > 5 * 1024 * 1024) {
            resultFile.innerHTML = `A Imagem ultrapassou o tamanho maximo de 5 MB`;
        }
    });

    async function create() {
        const inputFile = document.querySelector("#input-file");
        const preview = document.querySelector("#fk");
        const txtName = document.querySelector("#txt-name");
        const txtDescription = document.querySelector("#txt-description");
        const category = document.querySelector("#select-category");
        const result = document.querySelector("#result");
        result.innerHTML = "";
        const formData = new FormData();
        const funkoAPI = FunkoAPI();
        try {
            if (inputFile.files[0] == undefined) {
                result.innerHTML = "Selecione uma imagem";
                return;
            }
            if (inputFile.files[0].size > 5 * 1024 * 1024) {
                result.innerHTML = "A imagem ultrapassou o tamanho maximo de 5 MB";
                return;
            }
            if (txtName.value == "" && txtName.value.length < 3) {
                result.innerHTML = "O nome do Funko deve conter no minimo 3 caracteres";
                return;
            }
            formData.append("file", inputFile.files[0]);
            formData.append("name", txtName.value);
            formData.append("description", txtDescription.value);
            formData.append("category", category.value);
            await funkoAPI.create(formData);
            inputFile.value = "";
            txtName.value = "";
            txtDescription.value = "";
            category.value = "comum";
            result.innerHTML = "Funko cadastrado com sucesso";
            preview.src = "./images/cam.svg";
        } catch (error) {
            result.innerHTML = error.message;
            console.log(error);
        }
    }
}

//todo: criar alert de confirmação de exclusão
//todo: criar modal de edição
async function list() {
    const main = document.querySelector("#admMain");
    const funkoList = FunkoList();
    const funkoAPI = FunkoAPI();
    clear.mainClear();
    main.innerHTML += funkoList.header();
    const prodList = document.querySelector("#prodList");
    prodList.innerHTML += line.line1;
    try {
        const list = await funkoAPI.list();
        for (let index = 0; index < list.length; index++) {
            prodList.innerHTML += funkoList.row(list[index]);
            prodList.innerHTML += line.line2;
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }

    //const funko = { id: "b6f2dcc0-2570-42f2-8cac-ab69da8edeb4", name: "Ahsoka", category: "comum" };
    //prodList.innerHTML += funkoList.row(funko) + line.line2;

    const buttons = document.querySelectorAll(".button-delete");
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener("click", remove);
    }
    const backBt = document.querySelector("#backBt");
    backBt.addEventListener("click", register);

    async function remove(e) {
        const id = e.target.id;
        const name = e.target.name;
        try {
            if (confirm(`Deseja realmente excluir o Funko "${name}"?`) == true) {
                await funkoAPI.remove(id);
                alert("Funko excluído com sucesso");
                list();
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }
}

function userListCreate() {
    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML += userListPage.userHeader;

    const divListUser = document.querySelector("#divListUser");
    divListUser.innerHTML += line.line1;
    divListUser.innerHTML += userListPage.userView + line.line2;

    const userList = document.querySelector("#userListPage");
    userList.innerHTML += userListPage.newUserDiv;

    const divNewUser = document.querySelector("#divNewUser");
    divNewUser.innerHTML += userListPage.newUserView;
}

function confCreate() {
    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML = confAdmPage.confPage;

    const inputImgPerfil = document.querySelector("#inputImgPerfil");
    inputImgPerfil.addEventListener("change", function () {
        readURL(this, "imgConf");
    });

    const btRmFt = document.querySelector("#btRmFt");
    btRmFt.addEventListener("click", () => {
        const imgConf = document.querySelector("#imgConf");
        imgConf.src = "./images/person3.svg";
    });
}
