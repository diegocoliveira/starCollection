export class UserListPage{

    userHeader = `
    <section id="userListPage" class="flex">
        <div id="divListUser">
            <div class="headerAdm">
                <h2 class="fontStarWarsBlack">Lista de Usuarios</h2>
            </div>
            <div class="between">
                <p class="font1 , bold">Nome</p>
                <p class="font1 , bold">Bloquear</p>
            </div>
        </div>
    </section>`;
    

    userView(user){
        return `<div class="between">
            <div class="flex">
                <img class="avatar" src="./images/personBlack.svg" alt="">
                <p class="fontStarWarsBlack">${user.name}</p>
            </div>
            <button id="${user.id}" name="${user.name}" class="whiteBt">
                <img src="./images/user-block.svg" alt="block icon">
            </button>
        </div>`;
    }

    newUserDiv = `
    <div id="divNewUser">
        <div class="headerAdm"> 
            <h2 class="fontStarWarsBlack">Novos Usuarios</h2>
        </div>
        <div class="line2"></div>
    </div>`;

    newUserView(user){
        return `<div class="newList , flex">
            <img class="avatar" src="./images/personBlack.svg" alt="">
            <p class="fontStarWarsBlack">${user.name}</p>
        </div>`;

    } 
}