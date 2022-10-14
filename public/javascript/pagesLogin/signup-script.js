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

export async function requestUF() {
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
    const form = {};
    try {
        if (username.value == '' || username.value.length < 4) {
            result.innerHTML = "O nome do usuário deve conter no minimo 4 caracteres";
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
        form.name = username.value;
        form.email = email.value;
        form.password = password.value;
        form.state = state.value;
        form.city = city.value;
        form.type = "cliente";
        await userAPI.userCreate(form);

        username.value = '';
        email.value == '';
        password.value == '';
        state.value == '';
        result.innerHTML = 'Usuário cadastrado com sucesso';
        setTimeout(()=>{window.location.hash = '#login'}, 2000);
    } catch (error) {
        result.innerHTML = error.message;
        console.log(error);
    }
}