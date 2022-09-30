import login from "./pagesLogin/login.js";
import forgot from "./pagesLogin/forgot.js";
import signup from "./pagesLogin/signup.js";
import index from "./pageHome/index.js";

const mainContent = document.getElementById('root');


function route (){
    
    const hash = window.location.hash;
    mainContent.innerHTML = '';
    switch (hash) {
        case '#':
            mainContent.innerHTML = index();
            break;
        case '#login':
            console.log(login());
            mainContent.innerHTML = login();
            break;
        case '#forgot':
            mainContent.innerHTML = forgot();
            break;
        case '#signup':
            mainContent.innerHTML = signup();
            break;
        default:
            mainContent.innerHTML = index();
            break;
    }
}

window.addEventListener("hashchange", route);


