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

    return { create };
}
