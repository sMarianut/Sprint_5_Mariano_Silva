const { createApp } = Vue
const options = {
    data() {
        return {

            eventos: [],
            categories: [],
            filter: [],
            inputValue: "",
            checkbox: [],
            inputCheck: [],
            crossFilter: []

        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(datosEventos => {
                this.eventos = datosEventos.events
                this.crossFilter = datosEventos.events
                this.categories = [... new Set(this.eventos.map(events => events.category))]
                console.log(this.categories);
                //console.log(this.eventos);

            })
            .catch(error => console.error(error))
    },
    methods: {
        bothFilter() {
            this.crossFilter = this.eventos.filter(evento => {
                return evento.name.toLowerCase().startsWith(this.inputValue.toLowerCase())
                    && (this.checkbox.includes(evento.category) || this.checkbox.length == 0)
            })
        }
    }


}
const app = createApp(options)
app.mount('#app')