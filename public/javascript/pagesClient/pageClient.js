import client from "./client.js";
import UserAPI from "../api/user-api.mjs";
import { requestUF } from "../pagesLogin/signup-script.js";
import logout from "../logout.js";

const mainContent = document.getElementById("root");

function clientConfig(user){
    return `<section id="clientConfPage">
    <div>
    
        <div class="headerConfClient">
        <img id="gearClientImg" src="./images/configuracao3.svg " alt="">
            <p>configurações</p>
        </div>

        <div class="confInfosClientTop">
        <div class="blueBar"></div>

            <div id="infoDivClient">
    
                <div class="greyDivClient">
                    <img id="imgConfClient" src="./images/person3.svg" alt=""/>
                </div>
    
                <div class="infoClient">
                    <h4>Foto</h4>
                    <p class="lowClient">tamanho minimo 100x100</p>
                    <button id="btRmFtclient">remover</button>
                </div>
                <input id="inputImgPerfil" type='file'/>
            </div>
    
        </div>
        
    
        <div class="confInfosClient">
    
            <div class="blueBar">
             <p class="dataPerson">Dados Pessoais</p>
            </div>
    
            <div id="tableClient">
    
            <div class="infoBetweenClient">
    
                    <p class="font1 , bold , dataConfsClient">Name</p>
                    <p class="font1 , bold , dataConfsClient">E-mail</p>
                    <p class="font1 , bold , dataConfsClient">Senha</p>
                    <p class="font1 , bold , dataConfsClient">Cidade - UF</p>
                    
            </div>
    
            <div class="infoBetweenClient">
    
                    <p id="nameConf" class="dataConfsClient">${user.name}</p>
                    <p id="emailConf" class="dataConfsClient">${user.email}</p>
                    <p id="passConf" class="dataConfsClient">*********</p>
                    <p id="cityConf" class="dataConfsClient">${user.city} - ${user.state}</p>
        
                    
            </div>
    
    
            <div class="infoBetweenClient">
                <button class="whiteBt dataConfsClientEdit">
                    <img id="editName" src="./images/edit.svg " alt="">
                </button>
                <button class="whiteBt dataConfsClientEdit">
                    <img id="editName" src="./images/edit.svg " alt="">
                </button>
                <button class="whiteBt dataConfsClientEdit">
                    <img id="editName" src="./images/edit.svg " alt="">
                </button>
                <button class="whiteBt dataConfsClientEdit">
                    <img id="editName" src="./images/edit.svg " alt="">
                </button>
            </div>
    
        </div>
        </div>
    </div>
    </section> `;
} 

function configClientPage(){
    window.location.href = "/#configuracao";
}
export default (user) => { 
    mainContent.innerHTML = client(user);
    const clientLeft = document.querySelector("#clientLeft");
    clientLeft.innerHTML = clientConfig(user);
    const btnConfiClient = document.querySelector("#btnConfig");
    btnConfiClient.addEventListener("click", configClientPage);
    
    const editBts = document.querySelectorAll(".whiteBt");

    for (let index = 0; index < editBts.length; index++) {
        editBts[index].addEventListener('click', ()=>{edit(editBts[index], index)}) 
    }

    async function edit(e, index){
        const userAPI = UserAPI();
        const edit_img = e.querySelector("img");
        const data = {};
        try {
            if (edit_img.getAttribute('src') == './images/edit.svg ') {
                if (index == 0) {
                    const name = document.querySelector("#nameConf");
                    name.innerHTML = `<input type="text" name="name" id="edit-name" value="${user.name}" />`;
                    edit_img.setAttribute('src', './images/check-square.svg');
                } else if (index == 1){
                    const email = document.querySelector("#emailConf");
                    email.innerHTML = `<input type="email" name="email" id="edit-email" value="${user.email}" />`;
                    edit_img.setAttribute('src', './images/check-square.svg');
                } else if (index == 2){
                    const pass = document.querySelector("#passConf");
                    pass.innerHTML = `<input type="password" name="password" id="edit-pass" value="${user.password}" /> 
                    <label for="retry-pass">Confirme:</label> 
                    <input type="password" name="retry-password" id="retry-pass" value="${user.password}" />`;
                    edit_img.setAttribute('src', './images/check-square.svg');
                } else{
                    const endress = document.querySelector("#cityConf");
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
                state.addEventListener('change', requestUF);
                edit_img.setAttribute('src', './images/check-square.svg');
                }
            } else{
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
                        } 
                    } 

                } else if (index == 1){
                    const edit_email = document.querySelector("#edit-email");
                    
                    if (confirm(`Deseja realmente editar seu Email para ${edit_email.value}?`) == true) {
                        data.id = user.id;
                        data.email = edit_email.value;
                        data.type = user.type;
                        try{
                            await userAPI.updateEmail(data);
                            alert("Email editado com sucesso");
                            logout();
                        } catch (error) {
                            alert(error);
                        }
                    }
        
                }else if (index == 2){
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
                            }
                        }
                    } else{
                        alert("Senhas não são iguais, tente novamente");
                    }
                    
                } else{
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
                        }    
                    }
                }
            }
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }
};
