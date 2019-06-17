import environment from '../config/environment.js'
import Utils from './Utils.js'

/**
 * Get all bookings
 *
 * @returns {Promise<any>}
 */
const getBookingsList = async () => {
    const options = {
        method: 'GET',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/bookings`, options)
        return await response.json()
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

/**
 * Exclude booking based on the given id
 *
 * @param id
 * @returns {Promise<void>}
 */
const deleteBooking = async (id) => {

    if (!confirm('Você deseja realmente excluir esse Agendamento?')) {
        return
    }

    const options = {
        method: 'DELETE',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/bookings/${id}`, options)
        if (response.status !== 204) {
            alert('Erro ao tentar excluir o Agendamento')
        }
        alert('Agendamento excluído com sucesso')
        location.reload()
    } catch (err) {
        console.log('Error getting documents', err)
    }
}


/**
 * Fetch the selected booking
 *
 * @param id
 * @returns {Promise<any>}
 */
const getBooking = async (id) => {
    const options = {
        method: 'GET',
        headers: environment.headers
    }
    try {
        const response = await fetch(`${environment.baseUrl}/bookings/${id}`, options)
        let json =  await response.json()
        return Object.assign({
            date_start: Utils.toDateStringFormatted(json.schedule_start),
            hour_start: Utils.toHourFormatted(json.schedule_start),
            date_end: Utils.toDateStringFormatted(json.schedule_end),
            hour_end: Utils.toHourFormatted(json.schedule_end)
        },json)


    } catch (err) {
        console.log('Error getting documents', err)
    }
}

/**
 * This function just store/update a booking
 *
 * @param id
 * @returns {Promise<void>}
 */
const saveBooking = async (id) => {

    let method = 'POST'
    let url = `${environment.baseUrl}/bookings`
    let action = 'incluído'
    const preData = JSON.parse(Utils.formToJson(document.getElementById('bookingForm')))
    const data = Object.assign({
        schedule_start: Utils.toDateTime(preData.date_start, preData.hour_start),
        schedule_end: Utils.toDateTime(preData.date_end, preData.hour_end),
        is_coffee: preData.is_coffee ? true : false
    },preData)

    if (id) {
        method = 'PUT'
        url += '/' + id
        action = 'alterado'
    }

    const options = {
        method,
        headers: environment.headers,
        body: JSON.stringify(data)
    }

    try {
        const response = await fetch(url , options)
        const json = await response.json()
        if (response.status === 200) {
            alert(`Agendamento ${action} com sucesso`)
            location.href = `${location.origin}/#/`
            return
        }

        const str = json.reduce((e,x) => {
            return e += x.message + '\n'
        }, '')

        alert(str)

    } catch (err) {
        alert('Erro ao tentar incluir o Agendamento')
    }
}


export {
    getBookingsList,
    deleteBooking,
    getBooking,
    saveBooking
}