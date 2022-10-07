import html from "./login-html.js";
import UserAPI from "../api/user-api.mjs";

const mainContent = document.querySelector("#root");

let user;

async function login() {
    const inputEmail = document.querySelector("#input-email");
    const inputPassword = document.querySelector("#input-password");
    const result = document.querySelector("#result");
    const userAPI = new UserAPI();
    try {
        result.innerHTML = "";
        if (!inputPassword.value || inputPassword.value.length < 8) {
            result.innerHTML = new Error("A senha precisa ter no mínimo 8 caracteres");
            return;
        }
        user = await userAPI.authentication({ email: inputEmail.value, password: inputPassword.value });

        if (user.type == "administrador") {
            window.location.href = "/#admPage";
        }
        if (user.type == "cliente") {
            window.location.href = "/#collection";
        }
    } catch (error) {
        console.log(error);
        result.innerHTML = error.message;
    }
}

export default function action() {
    mainContent.innerHTML = html();
    const btnLogin = document.querySelector("#btn-login");
    btnLogin.onclick = login;
}
