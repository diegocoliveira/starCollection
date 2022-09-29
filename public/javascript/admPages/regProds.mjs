export class RegProd{

    regPage = `
    <section id="regProd">
    <div>                
        <h3>Funko Imagem</h3>
        <div id="fkImg">
            <img id="fk" src="./images/cam.svg"/>
        </div>
        <input id="inputImg" type='file'/>
    </div>
    <div id="infoProds">
        <div>        
            <label for="nameProd" class="font1 , bold">Nome</label>
            <div class="register">
                <input type="text" name="nameProd" id="nameProd" placeholder="Nome do Funko"/>                    
            </div>
        </div>
        <div>
            <label for="rarityProd" class="font1 , bold">Raridade</label>
            <div class="register">
            <select name="rarityProd" id="rarityProd">
                <option value="comum">Comum</option>
                <option value="rare">Raro</option>
                <option value="legendary">Lendário</option>
            <select/>                    
            </div>
        </div>
        <div>
            <label for="descProd" class="font1 , bold">Descrição</label>
            <div class="register">
            <textarea name="descProd" id="descProd" cols="30" rows="10"  placeholder="Descrição do Funko"></textarea>
            </div>
        </div>
        <div id="btsProd">
            <button id="btRegister" class="font2" type="submit">Cadatrar Produto</button>
            <button id="btListProds" class="font2" type="button">Produtos Cadastrados</button>
        </div>
    </div>
    </section>`;
}