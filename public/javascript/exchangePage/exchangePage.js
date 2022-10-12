export default class ExchangePage {
    exchangeMain() {
        return `<section id="exchangePage">
                    <div id="filterDiv">
                        <select name="filter" id="filter" value="Filtro">
                            <option value="" selected>Filtro</option>
                        </select>
                    </div>
                    <div id="offerDiv"></div>
                </section>`;
    }

    funkoFigure(item) {
        return `<figure class="funkoImgChange">
                    <img src="/repository/images/${item.funko.id}.png" alt="">
                    <h3 class="font1 , bold">${item.funko.name}</h3>
                    <h4 class="font1">${item.user.name}</h4>
                </figure>`;
    }
}
