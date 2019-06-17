import Utils        from './../../services/Utils.js'

let getLocation = async (id) => {
    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const response = await fetch(`http://localhost:3333/locations/` + id, options)
        const json = await response.json();
        // console.log(json)
        return json
    } catch (err) {
        console.log('Error getting documents', err)
    }
}

let PostShow = {

    render : async () => {
        let request = Utils.parseRequestURL()
        let location = await getLocation(request.id)

        return /*html*/`
            <section class="section">
                <h1> Post Id : ${location.id}</h1>
                <p> Post Title : ${location.name} </p>
                <p> Post Content : ${location.description} </p>                
            </section>
        `
    }
    , after_render: async () => {
    }
}

export default PostShow;