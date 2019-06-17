import {getRoomsList, deleteRoom} from '../../services/RoomService.js'

/**
 * Render the view
 *
 * @type {{render: (function(): string), after_render: Rooms.after_render}}
 */
let Rooms = {
    render: async () => {
        let rooms = await getRoomsList()
        return `
            <div class="col-75">
                <div class="row">
                    <div class="col-75">
                        <h3 class="pull-left">Salas</h3>
                    </div>
                    <div class="col-25">
                        <a href="/#/room" class="btn lg green pull-right">Nova</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-100">
                        <div class="component">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Local</th>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${rooms.map(room =>
                                        `<tr>
                                            <td>${room.location.name}</td>
                                            <td>${room.name}</td>
                                            <td>${room.description}</td>
                                            <td>
                                                <a href="#/rooms/${room.id}" class="btn blue" type="button">Editar</a>
                                                <button class="btn red" type="button" name="deleteRoomButton" data-id="${room.id}">Excluir</button>
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
            .getElementsByName('deleteRoomButton')
            .forEach((e) => e.addEventListener(
                'click',
                async () => {
                    await deleteRoom(e.dataset.id)
                }
            ))

    }

}

export default Rooms