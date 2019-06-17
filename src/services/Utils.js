const Utils = {
    /**
     * Parse the location hash (url) to return witch service will be rendered
     *
     * @returns {{resource: null, verb: null, id: null}}
     */
    parseRequestURL: () => {

        let url = location.hash.slice(1).toLowerCase() || '/'
        let r = url.split('/')
        let request = {
            resource: null,
            id: null,
            verb: null
        }
        request.resource = r[1]
        request.id = r[2]
        request.verb = r[3]

        return request
    },

    /**
     * Check if user is authenticated
     *
     * @returns {boolean}
     */
    isAuthenticated: () => {
        return window.localStorage.getItem('token') !== null
    },

    /**
     * Parses a form data into a valid json
     *
     * @param form
     * @returns {string}
     */
    formToJson: (form) => {
        const formData = new FormData(form)
        return JSON.stringify(Object.fromEntries(formData))
    },

    /**
     * Format the datetime to a local date string
     *
     * @param datetime
     * @returns {string}
     */
    toDateFormatted: (datetime) => {
        let d = new Date(datetime)
        return d.toLocaleDateString()
    },

    /**
     * Format the datetime to a hour string
     *
     * @param datetime
     */
    toHourFormatted: (datetime) => {
        let d = new Date(datetime)
        return d.toLocaleTimeString()
    },

    /**
     *
     * @param datetime
     * @returns {*|string}
     */
    toDateStringFormatted: (datetime) => {
        return datetime.split(' ')[0]
    },

    /**
     *
     * @param date
     * @param time
     */
    toDateTime: (date, time) => {
        return [date, time]
            .join(' ')
    }

}

export default Utils