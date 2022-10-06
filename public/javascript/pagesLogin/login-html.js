export default () => {
    const loginPage = `
    <section class="login">
            <div id="mainLeftLogin">
             <img src="./images/rey.png" alt="rey"  class="imagePagesLogin">  
            </div>

            <div id="mainRightLogin">
            
            <h2 class="titleH2">Login</h2>
            <p class="pSignup">Não tem uma conta?  <a id="signup" href="/#signup">Sign Up</a></p>

            <div class="bar"></div>

            <p class="pLogin">Por favor, insira o seu e-mail</p>
            <input type="email" placeholder="e.g.: example@gmail.com" id="input-email">

            <p class="pLogin">Por favor, insira sua senha</p>
            <input type="password" placeholder="**********" id="input-password">
            <p><a id="forgot" href="/#forgot">Esqueceu sua senha?</a></p>

            <input type="submit" value="Sign In" id="btn-login"/>
            <div id="result" class="font1 , error"> </div>
           
            </div>
            </section>
         `;

    return loginPage;
};
