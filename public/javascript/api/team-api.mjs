export default function TeamAPI() {
    async function getAll() {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch(`/api/team`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message);
        }
        const data = await response.json();
        return data;
    }

    async function create(data) {
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("/api/team", options);
        if (!response.ok || !(response.status == 200 || response.status == 201)) {
            const message = await response.json();
            throw new Error(message);
        }
        const user = await response.json();
        return user;
    }

    async function update(data) {
        const options = { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch(`/api/team/${data.id}`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            console.log(message);
            throw new Error(message);
        }
        const user = await response.json();
        return user;
    }

    async function remove(id) {
        const options = { method: "DELETE", headers: { "Content-Type": "application/json" } };
        const response = await fetch(`/api/team/${id}`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message);
        }
        const team = await response.json();
        return team;
    }

    return { getAll, create, update, remove };
}
