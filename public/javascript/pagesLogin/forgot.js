export default () => {

    const forgotPage = `
    <section class="login">
            <div id="mainLeftSignup">
             <img src="./images/jaja.svg" class="imagePagesLoginJar">  
            </div>

            <div id="mainRightLogin">
            
            <h2 class="titleH2Forgot">Esqueceu a Senha?</h2>
            <p class="pSignupForgot"><a id="signup" href="/#login">Conecte-se</a></p>

            <div class="bar"></div>

            <p class="pLogin">Por favor, insira o seu e-mail</p>
            <input type="email" placeholder="e.g.: R2-D2@gmail.com" id="emailForgot">
            

            <input class="btn-pages-loginForgot" type="submit" value="Envie" id="loginButton">
            
           
            </div>
            </section>
         `;


    return forgotPage;
};