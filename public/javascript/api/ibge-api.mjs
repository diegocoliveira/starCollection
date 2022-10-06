export default function IbgeApi(){
    async function getCitys(uf) {
        const options = { method: "GET", headers: { "Content-Type": "application/json" } };
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`, options);
        
        if (!response.ok || !(response.status == 200 || response.status == 201)) {
            const message = await response.json();
            throw new Error(message.error);
        }
        const data = await response.json();
        return data;
    }

    return {getCitys};
}