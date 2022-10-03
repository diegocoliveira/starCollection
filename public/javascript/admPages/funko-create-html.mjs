export default class FunkoCreate {
    html = `
    <div class="title" >
        <h2>CADASTRO DE FUNKO</h2>
        
    </div>

    <section id="regProd">
    
    <div class="file">                
        <h3 class="font1, bold">Funko Imagem</h3>
        <div id="fkImg">
            <img id="fk" src="./images/cam.svg"/>
        </div>
        <input id="input-file" type='file' name="file" accept="image/*"/>
        <p id="result-file" class="font1 , error , low"></p>
    </div>

    <div id="infoProds">
        <div>        
            <label for="txt-name" class="font1 , bold">Nome</label>
            <div class="register">
                <input type="text" name="name" id="txt-name" placeholder="Nome do Funko"/>                    
            </div>
        </div>

        <div>
            <label for="select-category" class="font1 , bold">Categoria</label>
            <div class="register">
            <select name="category" id="select-category">
                <option value="comum">Comum</option>
                <option value="raro">Raro</option>
                <option value="lendário">Lendário</option>
            <select/>                    
            </div>
        </div>

        <div>
            <label for="txt-description" class="font1 , bold">Descrição</label>
            <div class="register">
            <textarea name="description" id="txt-description" cols="30" rows="10"  placeholder="Descrição do Funko"></textarea>
            </div>
        </div>

        <div id="btsProd">
            <button id="btn-add" class="btn-primary" type="submit">Cadastrar</button>
            <button id="btListProds" class="btn-alternate" type="button">Listar</button>
        </div>

        <div id="result" class="font1 , error"> </div>
        
    </div>
    
    </section>`;
}
