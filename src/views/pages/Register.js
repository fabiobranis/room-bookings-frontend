import {login} from '../../services/LoginService.js'

/**
 * Render the view
 * @type {{render: (function(): string), after_render: Register.after_render}}
 */
let Register = {

    render: async () => {
        return /*html*/ `
            <section class="section">
                <form id="login">
                    <div class="row">
                        <div class="col-25">
                            <label>E-mail</label>
                        </div>           
                        <div class="col-50">
                            <input type="email" name="email">
                        </div>         
                        </p>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Senha</label>
                        </div>           
                        <div class="col-50">
                            <input type="password" name="password">
                        </div>         
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <button class="btn lg green" type="button" id="loginButton">Entrar</button>
                         </div>                    
                    </div>
                </form>
            </section>
        `
    }
    , after_render: async () => {
        document.getElementById('loginButton').addEventListener('click', async () => { await login()})
    }
}

export default Register;