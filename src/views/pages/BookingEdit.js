import Utils from './../../services/Utils.js'
import {getBooking, saveBooking} from '../../services/BookingService.js'
import {getRoomsList} from '../../services/RoomService.js'

/**
 * Render view
 *
 * @type {{render: (function(): string), after_render: RoomShow.after_render}}
 */
let RoomShow = {

    render: async () => {
        let request = Utils.parseRequestURL()
        let rooms = await getRoomsList()
        let booking = {
            id: null,
            room_id: null,
            date_start: '',
            hour_start: '',
            date_end: '',
            hour_end: '',
            accountable: '',
            is_coffee: false,
            participants: null,
            description: ''
        }
        if (request.id) {
            booking = await getBooking(request.id)
        }

        return `
                <div class="row">
                    <div class="col-75">
                        <h3 class="pull-left">Agendamentos</h3>
                    </div>
                    <div class="col-25">
                        <a class="btn lg blue pull-right" href="/#/">Voltar</a>
                    </div>
                </div>
                <form id="bookingForm">
                    <div class="row">
                        <div class="col-25">
                            <label>Sala</label>
                        </div>
                        <div class="col-75">
                            <select name="room_id" >
                                ${rooms.map((room) =>
            `<option value="${room.id}" ${room.id === booking.room_id ? 'selected' : ''}>${room.name}</option>`
        ).join('\n ')}
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Data (Início)</label>
                        </div>
                        <div class="col-75">
                            <input type="date" name="date_start" value="${booking.date_start}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Hora (Início)</label>
                        </div>
                        <div class="col-75">
                            <input type="time" name="hour_start" value="${booking.hour_start}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Data (Fim)</label>
                        </div>
                        <div class="col-75">
                            <input type="date" name="date_end" value="${booking.date_end}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Hora (Fim)</label>
                        </div>
                        <div class="col-75">
                            <input type="time" name="hour_end" value="${booking.hour_end}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Responsável</label>
                        </div>
                        <div class="col-75">
                            <input type="text" name="accountable" value="${booking.accountable}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label for="scales">Café</label>
                        </div>
                        <div class="col-25">
                            <input type="checkbox" name="is_coffee" class="pull-left" ${booking.is_coffee ? 'checked': ''}>                        
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Participantes</label>
                        </div>
                        <div class="col-75">
                            <input type="number" name="participants" value="${booking.participants}">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <label>Descrição</label>
                        </div>
                        <div class="col-75">
                            <textarea name="description">${booking.description}</textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-25">
                            <button type="button" class="btn lg green" id="saveBooking">Salvar</button>
                        </div>
                    </div>
                </form>
            </div>
        `
    },
    after_render: async () => {
        let request = Utils.parseRequestURL()
        document.getElementById('saveBooking').addEventListener('click', () => saveBooking(request.id))
    }
}

export default RoomShow