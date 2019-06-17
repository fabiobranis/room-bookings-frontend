'use strict'

import Home from './views/pages/Home.js'
import Error404 from './views/pages/Error404.js'
import Register from './views/pages/Register.js'

import Headbar from './views/components/Headbar.js'
import Menubar from './views/components/Menubar.js'


import Utils from './services/Utils.js'
import Locations from './views/pages/Locations.js'
import LocationEdit from './views/pages/LocationEdit.js'
import Rooms from './views/pages/Rooms.js'
import RoomEdit from './views/pages/RoomEdit.js'
import BookingEdit from './views/pages/BookingEdit.js'

// List of supported routes. Any url other than these routes will throw a 404 error
// the list have a protected attribute, this attribute set if the component is visible without authentication
const routes = {
    '/': {
        component: Home,
        protected: true
    },
    '/bookings/:id': {
        component: BookingEdit,
        protected: true
    },
    '/booking': {
        component: BookingEdit,
        protected: true
    },
    '/locations': {
        component: Locations,
        protected: true
    },
    '/locations/:id': {
        component: LocationEdit,
        protected: true
    },
    '/location': {
        component: LocationEdit,
        protected: true
    },
    '/rooms': {
        component: Rooms,
        protected: true
    },
    '/rooms/:id': {
        component: RoomEdit,
        protected: true
    },
    '/room': {
        component: RoomEdit,
        protected: true
    },
    '/login': {
        component: Register,
        protected: false
    }
}


// The router code. Takes a URL, checks against the list of supported routes and then renders the corresponding content page.
const router = async () => {

    const content = null || document.getElementById('page_container')

    if (Utils.isAuthenticated()) {
        // Lazy load view element:
        const header = null || document.getElementById('header_container')
        const menu = null || document.getElementById('menu_container')


        // Render the Header and footer of the page
        header.innerHTML = await Headbar.render()
        await Headbar.after_render()
        menu.innerHTML = await Menubar.render()
        await Menubar.after_render()
    }


    // Get the parsed URl from the addressbar
    let request = Utils.parseRequestURL()

    // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '')



    // get the route based on parsed url
    // the default page is allways 404
    let route = routes[parsedURL]
    let page = Error404

    // if route exists, the system check if the user is authenticated
    // if not authenticated, the user is redirected to login form
    if (route ) {
        if (route.protected && Utils.isAuthenticated()) {
            page = route.component
        } else {
            page = Register
            location.href = `${location.origin}/#/login`
        }
    }

    // render the page based on it's component
    content.innerHTML = await page.render()
    await page.after_render()

}

// Listen on hash change:
window.addEventListener('hashchange', router)

// Listen on page load:
window.addEventListener('load', router)