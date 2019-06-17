import {logout} from '../../services/LoginService.js'

/**
 * Render the view
 * @type {{render: (function(): string), after_render: Headbar.after_render}}
 */
let Headbar = {
    render: async () => {
        return `
        <header class="compact">
            <h2 class="logoff"><a href="#" id="logoffButton">Sair</a></h2>
            <h1><a href="#">Bem vindo a Plataforma de Agendamentos</a></h1>
        </header>`
    },
    after_render: async () => {
        document.getElementById('logoffButton').addEventListener('click', async () => { await logout()})
    }

}

export default Headbar