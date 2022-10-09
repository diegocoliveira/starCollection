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
                    <img src="/repository/images/${infos.funko_id}.png" alt="">
                    <h3 class="font1 , bold">${infos.funko_name}</h3>
                    <h4 class="font1">${infos.user_name}</h4>
                </figure>`;
    }

}

