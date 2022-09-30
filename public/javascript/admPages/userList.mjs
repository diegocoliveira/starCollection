export class UserListPage{

    userHeader = `
    <section id="userListPage" class="flex">
        <div id="divListUser">
            <div id="userHeader">
                <h2>Lista de Usuários</h2>
            </div>
            <div class="between">
                <p class="font1 , bold">Nome</p>
                <p class="font1 , bold">Bloquear</p>
            </div>
        </div>
    </section>`;
    

    userView = `
    <div class="between">
        <div class="flex">
            <img class="avatar" src="" alt="">
            <p class="font1 , bold">NAME</p>
        </div>
        <button id="blockBt" class="whiteBt">
            <img src="./images/user-block.svg" alt="block icon">
        </button>
    </div>`;

    newUserDiv = `
    <div id="divNewUser">
        <div>
            <h2>Novos Usuários</h2>
        </div>
    </div>`;

    newUserView = `
    <div class="newList , flex">
        <img class="avatar" src="" alt="">
        <p class="font1 , bold">NAME</p>
    </div>`;

}