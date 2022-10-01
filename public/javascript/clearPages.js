export class Clear{

    rootClear(){
        const root = document.querySelector('#root');
        root.innerHTML = '';
    }

    mainClear() {
        const main = document.querySelector("#admMain");
        main.innerHTML = '';
    }
}
