export class Clear{

    bodyClear(){
        const body = document.querySelector('#body');
        body.innerHTML = '';
    }

    mainClear() {
        const main = document.querySelector("#admMain");
        main.innerHTML = '';
    }
}
