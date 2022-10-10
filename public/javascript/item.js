const selector = document.getElementById("selector");
const SelectedFunkoImg = document.querySelector(".SelectedFunkoImg");

// Função dedicada a captar o objeto com as informações sobre o produto, através do select
// Falta integrar API para captar objeto

function get_img(){
    const option = selector.value;

    switch (option){
        case "vader":
            SelectedFunkoImg.setAttribute('src',)
            funkoName.innerHTML = "Vader";
            break;

        case"rey":
        SelectedFunkoImg.setAttribute('src',)
        funkoName.innerHTML = "Rey";
        break;
    }
}