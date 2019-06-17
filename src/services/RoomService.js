import environment from '../config/environment.js'
import Utils from './Utils.js'

/**
 * Get all rooms
 *
 * @returns {Promise<any>}
 */
const getRoomsList = async () => {
    const options = {
        method: 'GET',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/rooms`, options)
        return await response.json()
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

/**
 * Exclude location based on the given id
 *
 * @param id
 * @returns {Promise<void>}
 */
const deleteRoom = async (id) => {

    if (!confirm('Você deseja realmente excluir essa Sala?')) {
        return
    }

    const options = {
        method: 'DELETE',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/rooms/${id}`, options)
        if (response.status !== 204) {
            alert('Erro ao tentar excluir a Sala')
        }
        alert('Sala excluída com sucesso')
        location.reload()
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

/**
 * Fetch the selected location
 *
 * @param id
 * @returns {Promise<any>}
 */
const getRoom = async (id) => {
    const options = {
        method: 'GET',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/rooms/${id}`, options)
        return await response.json()
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

/**
 * This function just store/update a location
 *
 * @param id
 * @returns {Promise<void>}
 */
const saveRoom = async (id) => {

    let method = 'POST'
    let url = `${environment.baseUrl}/rooms`
    let action = 'incluída'
    const data = Utils.formToJson(document.getElementById('roomForm'))

    if (id) {
        method = 'PUT'
        url += '/' + id
        action = 'alterada'
    }

    const options = {
        method,
        headers: environment.headers,
        body: data
    }

    try {
        const response = await fetch(url , options)
        const json = await response.json()
        if (response.status === 200) {
            alert(`Sala ${action} com sucesso`)
            location.href = `${location.origin}/#/rooms`
            return
        }

        const str = json.reduce((e,x) => {
            return e += x.message + '\n'
        }, '')

        alert(str)

    } catch (err) {
        alert('Erro ao tentar incluir a Sala')
    }
}

export {
    getRoomsList,
    getRoom,
    saveRoom,
    deleteRoom
}