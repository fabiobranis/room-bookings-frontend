import {getLocation, saveLocation} from '../../services/LocationService.js'
import Utils from './../../services/Utils.js'

/**
 * Methods to render the view
 *
 * @type {{render: (function(): string), after_render: LocationShow.after_render}}
 */
let LocationShow = {

    render: async () => {
        let request = Utils.parseRequestURL()
        let location = {
            id: null,
            name: '',
            description: ''
        }
        if (request.id) {
            location = await getLocation(request.id)
        }

        return `
                <div class="row">
                    <div class="col-75">
                        <h3 class="pull-left">Locais</h3>
                    </div>
                    <div class="col-25">
                        <a class="btn lg blue pull-right" href="/#/locations">Voltar</a>
                    </div>
                </div>
                <form id="locationForm">
                    <div class="row">
                        <div class="col-25">
                            <label>Nome</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="name" placeholder="Digite o nome do local" value="${location.name}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Descrição</label>
                        </div>
                        <div class="col-75">
                            <textarea name="description">${location.description}</textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <button type="button" class="btn lg green" id="saveLocation">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        `
    }
    , after_render: async () => {
        let request = Utils.parseRequestURL()
        document.getElementById('saveLocation').addEventListener('click', () => saveLocation(request.id))
    }
}

export default LocationShow