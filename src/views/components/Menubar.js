let Menubar = {
    render: async () => {
        let view =  /*html*/`
             
                <div class="side-menu">
                    <div class="side-menu-item">
                        <span>Menu</span>
                        <a href="/#/">Agendamentos</a>
                        <a href="/#/locations">Locais</a>
                        <a href="/#/rooms">Salas</a>                        
                    </div>
                </div>
            </div>
        `
        return view
    },
    after_render: async () => { }

}

export default Menubar;