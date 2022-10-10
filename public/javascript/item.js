const selector = document.getElementById("selector");
const SelectedFunkoImg = document.querySelector(".SelectedFunkoImg");


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