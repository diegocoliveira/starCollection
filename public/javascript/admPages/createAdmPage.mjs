import admMenu from "./adm-menu-html.mjs";
import { Dashboard } from "./dashBoard.mjs";
import FunkoCreate from "./funko-create-html.mjs";
import FunkoList from "./funko-list-html.mjs";
import { Line } from "../line.mjs";
import { readURL } from "../preview.js";
import { Clear } from "../clearPages.js";
import { requestUF } from "../pagesLogin/signup-script.js";

import { UserListPage } from "./userList.mjs";
import { ConfAdmPage } from "./confAdm.mjs";

import FunkoAPI from "../api/funko-api.mjs";
import UserAPI from "../api/user-api.mjs";
import offerAPI from "../api/offer-api.mjs";
import exchangeAPI from "../api/exchange-api.mjs";
import logout from "../logout.js";

const clear = new Clear();
const line = new Line();

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

async function dashBoardCreate() {
    const main = document.querySelector("#admMain");
    const users = await UserAPI().countUser();
    const offers = await offerAPI().countOffer();
    const exchange = await exchangeAPI().countExchange();
    const dashBoard = new Dashboard();

    clear.mainClear();
    main.innerHTML += dashBoard.infos(users, offers, exchange);
    main.innerHTML += dashBoard.recentTrades;
    listInfo();
}

async function listInfo() {
    const infos = document.querySelector("#recentTrades");
    const dashBoard = new Dashboard();
    const exchange = await exchangeAPI().list();

    infos.innerHTML += line.line1;
    for (let index = 0; index < exchange.length; index++) {
        infos.innerHTML += dashBoard.tradeInfo(exchange[index]) + line.line2;
    }
    statusList();
}

function statusList() {
    const divStatus = document.querySelectorAll(".divStatus");
    const status = document.querySelectorAll(".status");
    const dashBoard = new Dashboard();

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

    const funkoCreate = new FunkoCreate();
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
    const listFunkoDiv = document.createElement("div");
    listFunkoDiv.className = "listFunkoDiv";
    try {
        const list = await funkoAPI.list();
        for (let index = 0; index < list.length; index++) {
            listFunkoDiv.innerHTML += funkoList.row(list[index]);
            listFunkoDiv.innerHTML += line.line2;
        }
        prodList.appendChild(listFunkoDiv);
    } catch (error) {
        console.log(error);
        alert(error.message);
    }

    //const funko = { id: "b6f2dcc0-2570-42f2-8cac-ab69da8edeb4", name: "Ahsoka", category: "comum" };
    //prodList.innerHTML += funkoList.row(funko) + line.line2;
    const editBts = document.querySelectorAll(".button-edit");
    const lines = document.querySelectorAll(".infoBetween");
    for (let index = 0; index < editBts.length; index++) {
        editBts[index].addEventListener("click", () => {
            edit(lines[index + 1]);
        });
    }

    const buttons = document.querySelectorAll(".button-delete");
    for (let index = 0; index < buttons.length; index++) {
        buttons[index].addEventListener("click", remove);
    }
    const backBt = document.querySelector("#backBt");
    backBt.addEventListener("click", register);

    async function edit(e) {
        const listFunkoName = e.querySelector(".listFunkoName");
        const nameProd = e.querySelector("#nameProd");
        const rarityProd = e.querySelector("#rarityProd");
        const img = e.querySelector("img");
        const button_edit = e.querySelector(".button-edit");
        const edit_img = button_edit.querySelector("img");
        const name = nameProd.textContent;
        const id = button_edit.id;
        const description = img.alt;
        const data = {};

        try {
            if (edit_img.getAttribute("src") == `./images/edit.svg`) {
                nameProd.innerHTML = `<input type="text" name="name" id="edit-name" value="${name}" />`;
                rarityProd.innerHTML = `
                <select name="category" id="select-category">
                    <option value="comum">Comum</option>
                    <option value="raro">Raro</option>
                    <option value="lendário">Lendário</option>
                <select/>`;
                listFunkoName.innerHTML += `<textarea name="description" id="txt-description" cols="13" rows="5"  
                placeholder="Descrição do Funko">${description}</textarea>`;
                edit_img.setAttribute("src", "./images/check-square.svg");
            } else {
                const edit_name = nameProd.querySelector("#edit-name");
                const select_category = rarityProd.querySelector("#select-category");
                const txt_description = listFunkoName.querySelector("#txt-description");
                if (confirm(`Deseja realmente editar o Funko "${edit_name.value}"?`) == true) {
                    data.id = id;
                    data.name = edit_name.value;
                    data.category = select_category.value;
                    data.description = txt_description.value;
                    try {
                        await funkoAPI.update(data);
                        alert("Funko editado com sucesso");
                        list();
                    } catch (error) {
                        alert(error);
                    }
                }
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

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

async function userListCreate() {
    const userListPage = new UserListPage();
    const userAPI = UserAPI();

    const main = document.querySelector("#admMain");
    clear.mainClear();
    main.innerHTML = userListPage.userHeader;

    const userListDiv = document.querySelector("#userListPage");
    userListDiv.innerHTML += userListPage.newUserDiv;

    const list = await userAPI.userList();
    const divListUser = document.querySelector("#divListUser");
    const newUserDiv = document.querySelector("#divNewUser");

    divListUser.innerHTML += line.line1;

    for (let index = 0; index < list.length; index++) {
        divListUser.innerHTML += userListPage.userView(list[index]) + line.line2;
        const date = Date.now();
        let dif = ((date - Date.parse(list[index].createdAt)) / 36288000000) * 1000;
        if (dif < 7) {
            newUserDiv.innerHTML += userListPage.newUserView(list[index]) + line.line2;
        }
    }

    const divUsers = document.querySelectorAll(".between");
    for (let index = 1; index < divUsers.length; index++) {
        const blockBt = divUsers[index].querySelector("button");
        blockBt.addEventListener("click", () => {
            blockUser(blockBt);
        });
    }

    async function blockUser(e) {
        const id = e.id;
        const name = e.name;
        try {
            if (confirm(`Deseja realmente excluir o Funko "${name}"?`) == true) {
                await userAPI.removeUser(id);
                alert("Funko excluído com sucesso");
                userListCreate();
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }
}

function confCreate() {
    const main = document.querySelector("#admMain");
    clear.mainClear();

    const confAdmPage = new ConfAdmPage();
    main.innerHTML = confAdmPage.confPage(user);

    const inputImgPerfil = document.querySelector("#inputImgPerfil");
    const btRmFt = document.querySelector("#btRmFt");
    const editBts = document.querySelectorAll(".whiteBt");
    const infoDivs = document.querySelectorAll(".infoBetween");

    inputImgPerfil.addEventListener("change", function () {
        readURL(this, "imgConf");
    });

    btRmFt.addEventListener("click", () => {
        const imgConf = document.querySelector("#imgConf");
        imgConf.src = "./images/person3.svg";
    });

    for (let index = 0; index < editBts.length; index++) {
        editBts[index].addEventListener("click", () => {
            edit(infoDivs[index], index);
        });
    }

    async function edit(e, index) {
        const userAPI = UserAPI();
        const button_edit = e.querySelector(".whiteBt");
        const edit_img = button_edit.querySelector("img");
        const data = {};
        try {
            if (edit_img.getAttribute("src") == "./images/edit.svg ") {
                if (index == 0) {
                    const name = document.querySelector("#name");
                    name.innerHTML = `<input type="text" name="name" id="edit-name" value="${user.name}" />`;
                    edit_img.setAttribute("src", "./images/check-square.svg");
                } else if (index == 1) {
                    const email = document.querySelector("#email");
                    email.innerHTML = `<input type="email" name="email" id="edit-email" value="${user.email}" />`;
                    edit_img.setAttribute("src", "./images/check-square.svg");
                } else if (index == 2) {
                    const pass = document.querySelector("#pass");
                    pass.innerHTML = `<input type="password" name="password" id="edit-pass" value="${user.password}" /> 
                    <label for="retry-pass">Confirme:</label> 
                    <input type="password" name="retry-password" id="retry-pass" value="${user.password}" />`;
                    edit_img.setAttribute("src", "./images/check-square.svg");
                } else {
                    const endress = document.querySelector("#endress");
                    endress.innerHTML = `<select name="estado" id="state">
                    <option value="" selected></option>
                    <optgroup label="Norte">
                        <option value="AC">Acre</option>
                        <option value="AP">Amapá</option>
                        <option value="AM">Amazonas</option>
                        <option value="PA">Pará</option>
                        <option value="RO">Rondônia</option>
                        <option value="RR">Roraima</option>
                        <option value="TO">Tocantins</option>
                    </optgroup>
                    <optgroup label="Nordeste">
                        <option value="AL">Alagoas</option>
                        <option value="BA">Bahia</option>
                        <option value="CE">Ceará</option>
                        <option value="MA">Maranhão</option>
                        <option value="PB">Paraiba</option>
                        <option value="PE">Pernambuco</option>
                        <option value="PI">Piauí</option>
                        <option value="RN">Rio Grande do Norte</option>
                        <option value="SE">Sergipe</option>
                    </optgroup>
                    <optgroup label="Centro-Oeste">
                        <option value="DF">Distrito Federal</option>
                        <option value="GO">Goiás</option>
                        <option value="MT">Mato Grosso</option>
                        <option value="MS">Mato Grosso do Sul</option>
                    </optgroup>
                    <optgroup label="Sudeste">
                        <option value="ES">Espírito Santo</option>
                        <option value="MG">Minas Gerais</option>
                        <option value="RJ">Rio de Janeiro</option>
                        <option value="SP">São Paulo</option>
                    </optgroup>
                    <optgroup label="Sul">
                        <option value="PR">Paraná</option>
                        <option value="RS">Rio Grande do Sul</option>
                        <option value="SC">Santa Caratina</option>
                    </optgroup>
                </select>
            
                <select name="cidade" id="city"></select>`;
                    const state = document.querySelector("#state");
                    state.addEventListener("change", requestUF);
                    edit_img.setAttribute("src", "./images/check-square.svg");
                }
            } else {
                if (index == 0) {
                    const edit_name = document.querySelector("#edit-name");
                    if (confirm(`Deseja realmente editar seu Nome para "${edit_name.value}"?`) == true) {
                        data.id = user.id;
                        data.name = edit_name.value;
                        data.type = user.type;
                        try {
                            await userAPI.updateName(data);
                            alert("Nome editado com sucesso");
                            logout();
                        } catch (error) {
                            alert(error);
                            confCreate();
                        }
                    }
                } else if (index == 1) {
                    const edit_email = document.querySelector("#edit-email");

                    if (confirm(`Deseja realmente editar seu Email para ${edit_email.value}?`) == true) {
                        data.id = user.id;
                        data.email = edit_email.value;
                        data.type = user.type;
                        try {
                            await userAPI.updateEmail(data);
                            alert("Email editado com sucesso");
                            logout();
                        } catch (error) {
                            alert(error);
                            confCreate();
                        }
                    }
                } else if (index == 2) {
                    const edit_pass = document.querySelector("#edit-pass");
                    const retry_pass = document.querySelector("#retry-pass");
                    if (edit_pass.value == retry_pass.value) {
                        if (confirm(`Deseja realmente editar sua Senha?`) == true) {
                            data.id = user.id;
                            data.password = edit_pass.value;
                            data.type = user.type;
                            try {
                                await userAPI.updatePassword(data);
                                alert("Senha editada com sucesso");
                                logout();
                            } catch (error) {
                                alert(error);
                                confCreate();
                            }
                        }
                    } else {
                        alert("Senhas não são iguais, tente novamente");
                    }
                } else {
                    const state = document.querySelector("#state");
                    const city = document.querySelector("#city");
                    if (confirm(`Deseja realmente editar seu UF/Cidade para "${state.value}/${city.value}"?`) == true) {
                        data.id = user.id;
                        data.city = city.value;
                        data.state = state.value;
                        data.type = user.type;
                        try {
                            await userAPI.updateCity(data);
                            alert("UF/Cidade editados com sucesso");
                            logout();
                        } catch (error) {
                            alert(error);
                            confCreate();
                        }
                    }
                }
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }
}
