export default function signupPage() {

    return `
    <section class="login">
    <div id="mainLeftSignup">
     <img src="./images/r2d2Recortado.png" class="imagePagesLogin">  
    </div>

    <div id="mainRightLogin">
    
    <h2 class="titleH2">Criar Nova Conta</h2>
    <p class="pSignup">Já é Registrado?  <a id="signup" href="/#login">Login</a></p>

    <div class="bar"></div>

    <p class="pLogin">Por favor, insira o seu nome</p>
    <input type="text" placeholder="R2-D2" id="username">

    <p class="pLogin">Por favor, insira o seu e-mail</p>
    <input type="email" placeholder="e.g.: R2-D2@gmail.com" id="input-email">

    <p class="pLogin">Por favor, insira sua senha</p>
    <input type="password" placeholder="**********" id="input-password">

    <p class="pLogin">Por favor, insira seu estado</p>
    <select name="estado" id="state">
        <option value="" selected></option>
        <optgroup label="Norte">
            <option value="AC">Acre</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="PA">Pará</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="TO">Tocantins</option>
        </optgroup>
        <optgroup label="Nordeste">
            <option value="AL">Alagoas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="MA">Maranhão</option>
            <option value="PB">Paraiba</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="SE">Sergipe</option>
        </optgroup>
        <optgroup label="Centro-Oeste">
            <option value="DF">Distrito Federal</option>
            <option value="GO">Goiás</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
        </optgroup>
        <optgroup label="Sudeste">
            <option value="ES">Espírito Santo</option>
            <option value="MG">Minas Gerais</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="SP">São Paulo</option>
        </optgroup>
        <optgroup label="Sul">
            <option value="PR">Paraná</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="SC">Santa Caratina</option>
        </optgroup>
    </select>

    <p class="pLogin">Por favor, insira sua cidade</p>
    <select name="cidade" id="city"></select>

    <input class="btn-pages-login" type="submit" value="Sign Up" id="loginButton">
    
    <div id="result" class="font1 , error"> </div>

    </div>
    </section>`;
};