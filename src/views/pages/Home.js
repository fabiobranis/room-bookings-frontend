import {getBookingsList, deleteBooking} from '../../services/BookingService.js'
import Utils from '../../services/Utils.js'

/**
 * Render the view
 *
 * @type {{render: (function(): string), after_render: Rooms.after_render}}
 */
let Rooms = {
    render: async () => {
        let bookings = await getBookingsList()
        bookings = bookings.map(booking => {
            let d = new Date(booking.schedule_start)
            booking.date_start = Utils.toDateFormatted(booking.schedule_start)
            booking.time_start = Utils.toHourFormatted(booking.schedule_start)
            return booking
        })
        return `
            <div class="col-75">
                <div class="row">
                    <div class="col-75">
                        <h3 class="pull-left">Agendamentos</h3>
                    </div>
                    <div class="col-25">
                        <a href="/#/booking" class="btn lg green pull-right">Novo</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-100">
                        <div class="component">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Local</th>
                                        <th>Sala</th>
                                        <th>Data Início</th>
                                        <th>Hora Início</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${bookings.map(booking =>
            `<tr>
                                            <td>${booking.room.location.name}</td>
                                            <td>${booking.room.name}</td>
                                            <td>${booking.date_start}</td>
                                            <td>${booking.time_start}</td>
                                            <td>
                                                <a href="#/bookings/${booking.id}" class="btn blue" type="button">Editar</a>
                                                <button class="btn red" type="button" name="deleteBookingButton" data-id="${booking.id}">Excluir</button>
                                            </td>
                                        </tr>`
        ).join('\n ')
            }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
             </div>                                
        `
    }
    , after_render: async () => {

        // to add the event listener I used a data attribute to hold the data
        document
            .getElementsByName('deleteBookingButton')
            .forEach((e) => e.addEventListener(
                'click',
                async () => {
                    await deleteBooking(e.dataset.id)
                }
            ))

    }

}

export default Rooms