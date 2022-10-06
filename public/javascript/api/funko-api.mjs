export default function FunkoAPI() {
    async function create(formData) {
        /*for (var key of formData.entries()) {
            console.log(key[0] + ", " + key[1]);
        }*/

        //const options = { method: "POST", headers: { "Content-Type": "multipart/form-data" }, body: formData };
        const options = { method: "POST", body: formData };

        const response = await fetch("/api/funko", options);
        if (!response.ok || !(response.status == 200 || response.status == 201)) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const data = await response.json();
        return data;
    }

    async function remove(id) {
        const options = { method: "DELETE", headers: { "Content-Type": "application/json" } };
        const response = await fetch(`/api/funko/${id}`, options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const data = await response.json();
        return data;
    }

    async function list() {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch("/api/funko", options);
        if (!response.ok || response.status !== 200) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const data = await response.json();
        return data;
    }


    return { create, remove, list };
}
