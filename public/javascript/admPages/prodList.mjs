export class ProdList{

    prodHeader=`
    <section id="prodList">
        <div id="prodHeader" class="flex">
            <button id="backBt" class="whiteBt"><img src="./images/arrow.svg" alt="arrow icon"></button>
            <h2 class="fontStarWarsBlack">Produtos Cadastrados</h2>
        </div>
        <div class="infoBetween">
            <div>
                <p class="font1 , bold">Nome</p>
            </div>
            <div class="infoProd">
                <p class="font1 , bold">Raridade</p>
                <p class="font1 , bold">Editar</p>
                <p class="font1 , bold">Excluir</p>
            </div>
        </div>
    </section>`

    prodInfos = `
    <div class="infoBetween">
        <div class="flex">
            <img id="imgProd" class="avatar" src="" alt="">
            <p id="nameProd" class="font1 , bold" >NAME</p>
        </div>
        <div class="infoProd">
            <p id="rarityProd">RARITY</p>
            <button id="" class="whiteBt">
                <img src="./images/edit.svg" alt="edit icon">
            </button>
            <button id="" class="whiteBt">
                <img src="./images/trash.svg" alt="trash icon">
            </button>
        </div>
    </div>`

}