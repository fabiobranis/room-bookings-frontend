import environment from '../config/environment.js'
import Utils from './Utils.js'

/**
 * Get all locations
 *
 * @returns {Promise<any>}
 */
const getLocationsList = async () => {
    const options = {
        method: 'GET',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/locations`, options)
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
const deleteLocation = async (id) => {

    if (!confirm('Você deseja realmente excluir esse Local?')) {
        return
    }

    const options = {
        method: 'DELETE',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/locations/${id}`, options)
        if (response.status !== 204) {
            alert('Erro ao tentar excluir o Local')
        }
        alert('Local excluído com sucesso')
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
const getLocation = async (id) => {
    const options = {
        method: 'GET',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/locations/${id}`, options)
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
const saveLocation = async (id) => {

    let method = 'POST'
    let url = `${environment.baseUrl}/locations`
    let action = 'incluído'
    const data = Utils.formToJson(document.getElementById('locationForm'))

    if (id) {
        method = 'PUT'
        url += '/' + id
        action = 'alterado'
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
            alert(`Local ${action} com sucesso`)
            location.href = `${location.origin}/#/locations`
            return
        }

        const str = json.reduce((e,x) => {
            return e += x.message + '\n'
        }, '')

        alert(str)

    } catch (err) {
        alert('Erro ao tentar incluir o Local')
    }
}


export {
    getLocationsList,
    deleteLocation,
    getLocation,
    saveLocation
}