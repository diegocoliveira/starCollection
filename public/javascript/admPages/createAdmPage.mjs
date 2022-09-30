import { admMenu } from "./admMenu.mjs";
import { Dashboard } from "./dashBoard.mjs";
import { RegProd } from "./regProds.mjs";
import { Line } from "../line.mjs";
import { readURL } from "../preview.js";
import { Clear } from "../clearPages.js";
import { ProdList } from "./prodList.mjs";
import { UserListPage } from "./userList.mjs";

const clear = new Clear();
const dashBoard = new Dashboard();
const regProd = new RegProd();
const line = new Line();
const prodListPage = new ProdList();
const userListPage = new UserListPage();

function createMenu() {
    const body = document.querySelector('#body');

    clear.bodyClear();
    body.innerHTML += admMenu;

    const dashBt = document.querySelector("#dashBt");
    const registBt = document.querySelector("#registBt");
    const userBt = document.querySelector("#userBt");

    dashBt.addEventListener("click", dashBoardCreate);
    registBt.addEventListener("click", registerCreate);
    userBt.addEventListener("click", userListCreate);
}

function dashBoardCreate(){
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
            status[index].innerHTML = 'troca concluida';
        } else if (index == 1) {
            status[index].innerHTML = 'troca em andamento'
        }else if (index == 2) {
            status[index].innerHTML = 'troca recusada'
        }
    }
    statusList();
}

function statusList() {
    const divStatus = document.querySelectorAll(".divStatus");
    const status = document.querySelectorAll(".status");
    
    for (let index = 0; index < status.length; index++) {
        if(status[index].innerHTML == 'troca concluida'){
            divStatus[index].innerHTML += dashBoard.finished;
        } else if(status[index].innerHTML == 'troca em andamento'){
            divStatus[index].innerHTML += dashBoard.pending;
        } else if(status[index].innerHTML == 'troca recusada'){
            divStatus[index].innerHTML += dashBoard.refused;
        }
    }
 
}

function registerCreate() {
    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML += regProd.regPage;

    const inputImg = document.querySelector("#inputImg");
    const btListProd = document.querySelector("#btListProds")

    inputImg.addEventListener('change', function(){readURL(this, 'fk')});
    btListProd.addEventListener('click', listProdCreate);
}

function listProdCreate(){
    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML += prodListPage.prodHeader;

    const prodList = document.querySelector("#prodList");
    prodList.innerHTML += line.line1;
    prodList.innerHTML += prodListPage.prodInfos + line.line2;

    const backBt = document.querySelector("#backBt");
    backBt.addEventListener("click", registerCreate);
}

function userListCreate() {
    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML += userListPage.userHeader;

    const divListUser = document.querySelector("#divListUser");
    divListUser.innerHTML += line.line3;
    divListUser.innerHTML += userListPage.userView + line.line4;

    const userList = document.querySelector("#userListPage");
    userList.innerHTML += userListPage.newUserDiv;

    const divNewUser = document.querySelector("#divNewUser");
    divNewUser.innerHTML += userListPage.newUserView;
}

createMenu();