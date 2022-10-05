export default class ExchangePage{

    exchangeMain(){
        return `<section id="exchangePage">
                    <div id="filterDiv">
                        <select name="filter" id="filter" value="Filtro">
                            <option value="" selected>Filtro</option>
                        </select>
                    </div>
                    <div id="offerDiv"></div>
                </section>`;
    } 


    funkoFigure(infos){
        return `<figure class="funkoImg">
                    <img src=${infos.img} alt="">
                    <h3 class="font1 , bold">${infos.fkName}</h3>
                    <h4 class="font1">${infos.username}</h4>
                </figure>`;
    }

}

