export default function FunkoList() {
    function header() {
        return `
                <section id="prodList">
                    <div id="prodHeader" class="title">
                        <button id="backBt" class="whiteBt"><img src="./images/arrow.svg" alt="arrow icon"></button>
                        <h2 class="fontStarWarsBlack">Listagem de Funkos</h2>
                    </div>
                    <div class="infoBetween">
                        <div class="flex">
                            <p class="font1 , bold">Nome</p>
                        </div>
                        <div class="infoProd listProd">
                            <p class="font1 , bold listRarity">Raridade</p>
                            <p class="font1 , bold listEditDelete">Editar</p>
                            <p class="font1 , bold listEditDelete">Excluir</p>
                        </div>
                    </div>
                </section>`;
    }

    function row(funko) {
        return `
    <div class="infoBetween">

        <div class="flex listFunkoName">
            <img id="imgProd" class="avatar" src="/repository/images/${funko.id}.png" alt="${funko.description}">
            <p id="nameProd" class="font1 , bold" >${funko.name}</p>
        </div>

        <div class="infoProd infoProdList">      
                    
            <p id="rarityProd" class="listRarityRow">${funko.category}</p>

            <div class="infoProd listEditDelete">  
            <button id="${funko.id}" class="whiteBt , button-edit">
                <img id="${funko.id}"  name="${funko.name}" src="./images/edit.svg" alt="edit icon">
            </button>
        </div>

        <div class="infoProd listEditDelete">  
            <button class="whiteBt , button-delete">
                <img id="${funko.id}"  name="${funko.name}" src="./images/trash.svg" alt="trash icon">
            </button>

        </div>

    </div>`;
    }

    return { header, row };
}
