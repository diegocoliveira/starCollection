export default function UserAPI() {
    async function authentication(data) {
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("/api/authentication", options);

        if (response.status == 401) {
            throw new Error("Usuário ou senha inválidos");
        }

        if (!response.ok || !(response.status == 200 || response.status == 201)) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const user = await response.json();
        return user;
    }

    return { authentication };
}
