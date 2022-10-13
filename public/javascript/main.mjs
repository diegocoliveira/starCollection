import TeamApi from "./api/team-api.mjs";

const teamApi = TeamApi();

const table = document.querySelector("#list-team");
const txtName = document.querySelector("#txt-name");
const result = document.querySelector("#result");
const btnAdd = document.querySelector("#btn-add");

async function create() {
    try {
        const team = {};
        result.innerHTML = "";
        team.name = txtName.value;
        await teamApi.create(team);
        result.innerHTML = "Criado com sucesso";
        txtName.value = "";
        await list();
    } catch (error) {
        result.innerHTML = error.message;
        console.log(error);
    }
}

async function update(e) {
    const team = {};
    team.id = e.target.getAttribute("data-id");
    team.name = e.target.value;
    try {
        result.innerHTML = "";
        await teamApi.update(team);
        result.innerHTML = "Atualizado com sucesso";
        await list();
    } catch (error) {
        result.innerHTML = error.message;
        console.log(error);
    }
}

async function remove(e) {
    const id = e.target.getAttribute("data-id");
    try {
        result.innerHTML = "";
        await teamApi.remove(id);
        result.innerHTML = "Removido com sucesso";
        await list();
    } catch (error) {
        result.innerHTML = error.message;
        console.log(error);
    }
}

async function list() {
    const data = await teamApi.getAll();
    renderTable(data);
}

function renderTable(team) {
    table.innerHTML = "";
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const row1 = document.createElement("tr");
    const heading1 = document.createElement("th");
    heading1.innerHTML = "#ID";
    heading1.id = "th-id";
    row1.appendChild(heading1);

    const row2 = document.createElement("tr");
    const heading2 = document.createElement("th");
    heading2.innerHTML = "Nome";
    heading2.id = "th-name";
    row1.appendChild(heading2);

    const heading3 = document.createElement("th");
    heading3.innerHTML = "Excluir";
    row1.appendChild(heading3);

    thead.appendChild(row1);

    let row;
    let cell1, cell2, cell3;
    let input, icon;
    for (let i = 0; i < team.length; i++) {
        const member = team[i];
        let id = member.id;
        row = document.createElement("tr");
        cell1 = document.createElement("td");
        cell1.innerHTML = member.id.split("-")[0] + "...";
        row.appendChild(cell1);

        cell2 = document.createElement("td");
        input = document.createElement("input");
        input.type = "text";
        input.value = member.name;
        input.setAttribute("data-id", id);
        input.onchange = update;
        cell2.appendChild(input);
        row.appendChild(cell2);

        cell3 = document.createElement("td");
        icon = document.createElement("span");
        icon.className = "material-icons";
        icon.innerHTML = "delete";
        icon.setAttribute("data-id", id);
        icon.onclick = remove;
        cell3.appendChild(icon);
        row.appendChild(cell3);
        tbody.appendChild(row);
    }
    table.appendChild(thead);
    table.appendChild(tbody);
}

btnAdd.onclick = create;
list();
