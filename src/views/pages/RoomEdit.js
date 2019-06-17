import Utils from './../../services/Utils.js'
import {getRoom, saveRoom} from '../../services/RoomService.js'
import {getLocationsList} from '../../services/LocationService.js'

/**
 * Render view
 *
 * @type {{render: (function(): string), after_render: RoomShow.after_render}}
 */
let RoomShow = {

    render: async () => {
        let request = Utils.parseRequestURL()
        let locations = await getLocationsList()
        let room = {
            id: null,
            location_id: null,
            name: '',
            description: ''
        }
        if (request.id) {
            room = await getRoom(request.id)
        }

        return `
                <div class="row">
                    <div class="col-75">
                        <h3 class="pull-left">Salas</h3>
                    </div>
                    <div class="col-25">
                        <a class="btn lg blue pull-right" href="/#/rooms">Voltar</a>
                    </div>
                </div>
                <form id="roomForm">
                    <div class="row">
                        <div class="col-25">
                            <label>Local</label>
                        </div>
                        <div class="col-75">
                            <select name="location_id" >
                                ${locations.map((location) =>
            `<option value="${location.id}" ${location.id === room.location_id ? 'selected' : ''}>${location.name}</option>`
        ).join('\n ')}
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Nome</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="name" placeholder="Digite o nome da Sala" value="${room.name}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Descrição</label>
                        </div>
                        <div class="col-75">
                            <textarea name="description">${room.description}</textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <button type="button" class="btn lg green" id="saveRoom">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        `
    },
    after_render: async () => {
        let request = Utils.parseRequestURL()
        document.getElementById('saveRoom').addEventListener('click', () => saveRoom(request.id))
    }
}

export default RoomShow