export default function exchangeAPI() {
    async function create(data){
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("/api/exchange", options);
        
        if (response.status == 401) {
            window.location.href = "/#login";
            throw new Error("Sua sessão expirou");
        }

        if (!response.ok || !response.status == 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const exchange = await response.json();
        return exchange;
    }

    async function list() {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch("/api/exchange", options);

        if (response.status == 401) {
            window.location.href = "/#login";
            throw new Error("Sua sessão expirou");
        }

        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const data = await response.json();
        return data;
    }

    async function countExchange() {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch("/api/count_exchange", options);
        if (!response.ok || !response.status == 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const count = await response.json();
        return count;
    }
    return { create, list, countExchange }
}

