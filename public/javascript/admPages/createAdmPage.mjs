import { admMenu } from "./admMenu.mjs";
import { Dashboard } from "./dashBoard.mjs";
import { RegProd } from "./regProds.mjs";
import { Line } from "../line.mjs";

const dashBoard = new Dashboard();
const regProd = new RegProd();
const line = new Line();

function createMenu(params) {
    const body = document.querySelector('#body');

    body.innerHTML = '';
    body.innerHTML += admMenu;

    const dashBt = document.querySelector("#dashBt");
    const registBt = document.querySelector("#registBt");

    dashBt.addEventListener("click", dashBoardCreate);
    registBt.addEventListener("click", registerCreate);
}

function mainClear() {
    const main = document.querySelector("#admMain");
    main.innerHTML = '';
}

function dashBoardCreate(){
    const main = document.querySelector("#admMain");
    mainClear();
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
    mainClear();
    main.innerHTML += regProd.regPage;
    const inputImg = document.querySelector("#inputImg");
    inputImg.addEventListener('change', function(){regProd.readURL(this)});
}

createMenu();