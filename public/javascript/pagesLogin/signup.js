export default () => {

    const signupPage = `
    <section class="login">
            <div id="mainLeftSignup">
             <img src="./images/r2d2Recortado.png" class="imagePagesLogin">  
            </div>

            <div id="mainRightLogin">
            
            <h2 class="titleH2">Criar Nova Conta</h2>
            <p class="pSignup">Já é Registrado?  <a id="signup" href="/#login">Login</a></p>

            <div class="bar"></div>

            <p class="pLogin">Por favor, insira o seu nome</p>
            <input type="text" placeholder="R2-D2" id="email">

            <p class="pLogin">Por favor, insira o seu e-mail</p>
            <input type="email" placeholder="e.g.: R2-D2@gmail.com" id="email">

            <p class="pLogin">Por favor, insira sua senha</p>
            <input type="password" placeholder="**********" id="password">
            

            <input type="submit" value="Sign Up" id="loginButton">
            
           
            </div>
            </section>
         `;


    return signupPage;
};