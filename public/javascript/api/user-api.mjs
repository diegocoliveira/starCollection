export default function UserAPI() {
    async function userCreate(data){
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("/user", options);
        
        if (response.status == 401) {
            throw new Error("Dados inválidos");
        }

        if (!response.ok || !response.status == 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const user = await response.json();
        return user;
    }

    async function authentication(data) {
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("/api/authentication", options);

        if (response.status == 401) {
            throw new Error("Usuário ou senha inválidos");
        }

        if (!response.ok || !response.status == 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const user = await response.json();
        return user;
    }

    async function authorization() {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch("/api/authorization", options);

        if (response.status == 401) {
            return [];
        }

        if (!response.ok || !response.status == 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const user = await response.json();
        return user;
    }

    async function logout() {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch("/api/logout", options);
        if (!response.ok || !response.status == 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        return true;
    }

    return { userCreate ,authentication, authorization, logout };
}
