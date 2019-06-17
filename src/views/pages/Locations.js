import {getLocationsList, deleteLocation} from '../../services/LocationService.js'

let Locations = {
    render: async () => {
        let locations = await getLocationsList()
        return `
            <div class="col-75">
                <div class="row">
                    <div class="col-75">
                        <h3 class="pull-left">Locais</h3>
                    </div>
                    <div class="col-25">
                        <a href="/#/location" class="btn lg green pull-right">Novo</a>
                    </div>
                </div>
                <div class="row">
                    <div class="col-100">
                        <div class="component">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nome</th>
                                        <th>Descrição</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    ${locations.map(location =>
            `<tr>
                                            <td>${location.name}</td>
                                            <td>${location.description}</td>
                                            <td>
                                                <a href="#/locations/${location.id}" class="btn blue" type="button">Editar</a>
                                                <button class="btn red" type="button" name="deleteLocationButton" data-id="${location.id}">Excluir</button>
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
            .getElementsByName('deleteLocationButton')
            .forEach((e) => e.addEventListener(
                'click',
                async () => {
                    await deleteLocation(e.dataset.id)
                }
            ))

    }

}

export default Locations