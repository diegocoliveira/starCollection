import FunkoAPI from "../api/funko-api.mjs";
import myCollectionHtml from "./myCollection.js";
import client from "./client.js";

const mainContent = document.getElementById("root");

async function createCollection() {

    const divAllFunkos = document.querySelector(".divCollectionFunkos");
    const funkoAPI = FunkoAPI();
    

    try {
        const funkos = await funkoAPI.list();

        for (let i = 0; i < funkos.length; i++) {
           divAllFunkos.innerHTML += myCollectionHtml().rowFunko(funkos[i]);
        }
    } catch (error) {
        console.log(error);
        alert(error.message);
    }
}

// function collection() {
//     window.location.href = "#collection";
// }

export default function action() {
    mainContent.innerHTML = client();

    const clientLeft = document.querySelector("#clientLeft");

    clientLeft.innerHTML = myCollectionHtml().minhaColecao();
    createCollection();
    
    // const btnCollection = document.querySelector("#collectionButton");
    // btnCollection.onclick = collection;
}


