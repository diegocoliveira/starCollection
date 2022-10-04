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
                        <div class="infoProd">
                            <p class="font1 , bold">Raridade</p>
                            <p class="font1 , bold">Editar</p>
                            <p class="font1 , bold">Excluir</p>
                        </div>
                    </div>
                </section>`;
    }

    function row(funko) {
        return `
                <div class="infoBetween">
                    <div class="flex">
                        <img id="imgProd" class="avatar" src="/repository/images/${funko.id}.png" alt="${funko.name}">
                        <p id="nameProd" class="font1 , bold" >${funko.name}</p>
                    </div>
        <div class="infoProd">      
            <p id="rarityProd">${funko.category}</p>
            <button id="" class="whiteBt">
                <img src="./images/edit.svg" alt="edit icon">
            </button>
            <button class="whiteBt , button-delete">
                <img id="${funko.id}"  name="${funko.name}" src="./images/trash.svg" alt="trash icon">
            </button>
        </div>
    </div>`;
    }

    return { header, row };
}
