import UserAPI from "./api/user-api.mjs";

export default function logout() {
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