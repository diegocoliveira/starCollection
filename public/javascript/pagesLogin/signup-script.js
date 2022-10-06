const state = document.querySelector("#state");

function optionCity(muni) {
    const city = document.querySelector("#city");
    city.innerHTML += `<option value="${muni}">${muni}</option>`;
}

function selectAdd(req) {
    for (let index = 0; index < req.length; index++) {
        optionCity(req[index].nome);
    }
}

async function requestUF() {
    const state = document.querySelector("#state");

    const promiseUF = new Promise((resolve, reject) => {
        
        fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state.value}/distritos`, {method: 'GET'})
        .then(resp => {
              
            if (resp.status == 200) {
                resolve(resp.json());
            } else {
                reject("[ERROR] Objeto não encontrado!");
            }
        })
    })

    promiseUF.then((value) => {
       
        selectAdd(value);
    
    })
    promiseUF.catch(err => console.log(err));
}

state.addEventListener('change', requestUF);