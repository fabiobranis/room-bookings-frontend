import environment from '../config/environment.js'
import Utils from './Utils.js'

/**
 * Function to login
 * Assign the token to session storage and local environment
 * @returns {Promise<void>}
 */
const login = async () => {
    const method = 'POST'
    const url = `${environment.baseUrl}/auth`
    const data = Utils.formToJson(document.getElementById('login'))
    const options = {
        method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    }
    try {
        const response = await fetch(url, options)
        const json = await response.json()
        if (response.status === 200) {
            const token = [
                json.type,
                json.token
            ].join(' ')
            window.localStorage.setItem('token', token)
            environment.headers.Authorization = token
            location.href = `${location.origin}/#/`
            return
        }

        const str = json.reduce((e, x) => {
            return e += x.message + '\n'
        }, '')

        alert(str)

    } catch (err) {
        alert('Erro ao tentar logar')
    }
}

/**
 * Function to logout
 * Removes token from session storage and environment
 */
const logout = () => {
    window.localStorage.removeItem('token')
    environment.headers.Authorization = ''
    location.reload()
}

export {
    login,
    logout
}