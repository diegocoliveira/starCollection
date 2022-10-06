import signupPage from "./signup.js";
import IbgeApi from "../api/ibge-api.mjs";
import UserAPI from "../api/user-api.mjs";

export default function createSignup(){
    const root = document.querySelector("#root");
    root.innerHTML = signupPage();
     
    const state = document.querySelector("#state");
    const loginButton = document.querySelector("#loginButton");
    
    state.addEventListener('change', requestUF);
    loginButton.addEventListener('click', postClient);
}

function optionCity(muni) {
    const city = document.querySelector("#city");
    city.innerHTML += `<option value="${muni}">${muni}</option>`;
}

function selectAdd(req) {
    city.innerHTML = '';
    for (let index = 0; index < req.length; index++) {
        optionCity(req[index].nome);
    }
}

async function requestUF() {
    const state = document.querySelector("#state");
    const ibgeApi = new IbgeApi();
    try {
        const req = await ibgeApi.getCitys(state.value);
        selectAdd(req);
    } catch (error) {
        result.innerHTML = error.message;
        console.log(error);
    }

}

async function postClient(){
    const username = document.querySelector("#username");
    const email = document.querySelector("#input-email");
    const password = document.querySelector("#input-password");
    const state = document.querySelector("#state");
    const city = document.querySelector("#city");
    const result = document.querySelector("#result");
    const userAPI = new UserAPI;
    const formData = new FormData();
    try {
        if (username.value == '' || username.value.length < 3) {
            result.innerHTML = "O nome do usuário deve conter no minimo 3 caracteres";
            return;
        }
        if (email.value == '') {
            result.innerHTML = "O campo email é obrigatorio";
            return;
        }
        if (password.value == '' || password.value.length < 8) {
            result.innerHTML = "A senha deve conter no minimo 8 caracteres";
            return;
        }
        if (state.value == '') {
            result.innerHTML = "O campo estado é obrigatorio";
            return;
        }
        formData.append("name", username.value);
        formData.append("email", email.value);
        formData.append("password", password.value);
        formData.append("state", state.value);
        formData.append("city", city.value);
        formData.append("type", 'client')

        await userAPI.authentication(formData);

        username.value = '';
        email.value == '';
        password.value == '';
        state.value == '';
        result.innerHTML = 'Usuário cadastrado com sucesso';
    } catch (error) {
        result.innerHTML = error.message;
        console.log(error);
    }
}