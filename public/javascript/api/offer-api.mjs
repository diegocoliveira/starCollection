export default function offerAPI() {
    async function insert(data) {
        const options = { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
        const response = await fetch("/api/offer", options);

        if (response.status == 401) {
            window.location.href = "/#login";
            throw new Error("Sua sessão expirou");
        }

        if (!response.ok || !(response.status == 200 || response.status == 201)) {
            const message = await response.json();
            throw new Error(message.error);
        }
        data = await response.json();
        return data;
    }
  
    async function countOffer() {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch("/api/count_offer", options);
        if (!response.ok || !response.status == 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const count = await response.json();
        return count;
    }

    return { insert, countOffer };
}

