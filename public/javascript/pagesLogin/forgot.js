export default () => {

    const forgotPage = `
    <section class="login">
            <div id="mainLeftSignup">
             <img src="./images/jaja.svg" class="imagePagesLoginJar">  
            </div>

            <div id="mainRightLogin">
            
            <h2 class="titleH2">Esqueceu a Senha?</h2>
            <p class="pSignup"><a id="signup" href="/#login">Login</a></p>

            <div class="bar"></div>

            <p class="pLogin">Por favor, insira o seu e-mail</p>
            <input type="email" placeholder="e.g.: R2-D2@gmail.com" id="email">
            

            <input class="btn-pages-login" type="submit" value="Send" id="loginButton">
            
           
            </div>
            </section>
         `;


    return forgotPage;
};