export default function CollectionAPI() {
    async function insert(data) {
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("/api/collection", options);
        if (!response.ok || !(response.status == 200 || response.status == 201)) {
            const message = await response.json();
            throw new Error(message);
        }
        data = await response.json();
        return data;
    }

    async function update(data) {
        const options = { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch(`/api/collection/${data.id}`, options);
    }

    async function remove(id) {
        const options = { method: "DELETE", headers: { "Content-Type": "application/json" } };
        const response = await fetch(`/api/collection/${id}`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const data = await response.json();
        return data;
    }

    async function list() {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch("/api/collection", options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const data = await response.json();
        return data;
    }

    return { insert, update, remove, list };
}
