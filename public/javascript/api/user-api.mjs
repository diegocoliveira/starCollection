export default function UserAPI() {
    async function userCreate(data){
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("/api/user", options);

        if (!response.ok || !response.status == 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const user = await response.json();
        return user;
    }

    async function userList() {
        try {
            const options = { method: "GET", headers: { "Content-Type": "application/json" } };
            const response = await fetch("/api/user-list", options);
            if (!response.ok || response.status !== 200) {
                const message = await response.json();
                throw new Error(message.error);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }

    }

    async function removeUser(id){
        const options = { method: "DELETE", headers: { "Content-Type": "application/json" } };
        const response = await fetch(`/api/user/${id}`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const data = await response.json();
        return data;

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

    return { userCreate, userList, removeUser, authentication, authorization, logout };
}
