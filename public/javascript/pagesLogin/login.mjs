import html from "./login-html.js";

const mainContent = document.querySelector("#root");

function login() {
    window.location.href = "/#admPage";
}

export default function action() {
    mainContent.innerHTML = html();
    const btnLogin = document.querySelector("#btn-login");
    btnLogin.onclick = login;
}
