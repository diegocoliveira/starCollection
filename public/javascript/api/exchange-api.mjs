export default function exchangeAPI() {
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
    return { countExchange }
}

