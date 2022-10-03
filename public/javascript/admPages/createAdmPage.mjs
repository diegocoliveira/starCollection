import { AdmMenu } from "./admMenu.mjs";
import { Dashboard } from "./dashBoard.mjs";
import FunkoCreate from "./funko-create-html.mjs";
import { Line } from "../line.mjs";
import { readURL } from "../preview.js";
import { Clear } from "../clearPages.js";
import { ProdList } from "./prodList.mjs";
import { UserListPage } from "./userList.mjs";
import { ConfAdmPage } from "./confAdm.mjs";

const clear = new Clear();
const dashBoard = new Dashboard();
const funkoCreate = new FunkoCreate();
const line = new Line();
const admMenu = new AdmMenu();
const prodListPage = new ProdList();
const userListPage = new UserListPage();
const confAdmPage = new ConfAdmPage();

export function createMenu() {
    clear.rootClear();
    root.innerHTML = admMenu.menu + admMenu.admMain;

    const dashBt = document.querySelector("#dashBt");
    const registBt = document.querySelector("#registBt");
    const userBt = document.querySelector("#userBt");
    const confBt = document.querySelector("#confBt");

    dashBt.addEventListener("click", dashBoardCreate);
    registBt.addEventListener("click", register);
    userBt.addEventListener("click", userListCreate);
    confBt.addEventListener("click", confCreate);
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
    //const btnAdd = document.querySelector("#btn-add");

    //btnAdd.onclick = create;
    btListProd.addEventListener("click", listProdCreate);

    file.addEventListener("change", function () {
        readURL(this, "fk");
        const size = this.files[0].size;
        if (size > 5 * 1024 * 1024) {
            resultFile.innerHTML = `A Imagem ultrapassou o tamanho maximo de 5 MB`;
        }
    });

    function create() {
        const result = document.querySelector("#result");
        result.innerHTML = "Produto cadastrado com sucesso";
    }
}

function listProdCreate() {
    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML += prodListPage.prodHeader;

    const prodList = document.querySelector("#prodList");
    prodList.innerHTML += line.line1;
    prodList.innerHTML += prodListPage.prodInfos + line.line2;

    const backBt = document.querySelector("#backBt");
    backBt.addEventListener("click", register);
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
