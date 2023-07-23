const { createApp } = Vue
const options = {
    data() {
        return {
            eventos: [],
            eventosUp: [],
            catPast: [],
            catUp: [],
            filter: [],
            inputValue: "",
            checkbox: [],
            inputCheck: [],
            crossFilter: [],
            namePorcAssistMa: "",
            namePorcAssistMe: "",
            porcAssistMa: Number,
            porcAssistMe: Number,
            arraySort: [],
            nombreMayorC: "",
            mayorC: Number,
            arrayPorc: [],
            objEventPast: null,
            objEventUp: null


        }
    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(datosEventos => {
                this.eventos = datosEventos.events
                this.eventosPast = datosEventos.events.filter(evento => evento.date < datosEventos.currentDate)
                this.eventosUp = datosEventos.events.filter(evento => evento.date > datosEventos.currentDate)
                this.catUp = [... new Set(this.eventosUp.map(events => events.category))]
                this.catPast = [... new Set(this.eventosPast.map(events => events.category))]
                this.arraySort = this.eventos.sort((a, b) => a.capacity - b.capacity)
                this.nombreMayorC = this.arraySort[this.arraySort.length - 1].name
                this.mayorC = this.arraySort[this.arraySort.length - 1].capacity
                function masPorcentaje(assistance, capacidad) {
                    let porcentaje = (assistance / capacidad) * 100
                    return porcentaje
                }
                this.arrayPorc = this.eventosPast.sort((a, b) => masPorcentaje(a.assistance, a.capacity) - masPorcentaje(b.assistance, b.capacity))
                console.log(this.arrayPorc);
                this.namePorcAssistMe = this.arrayPorc[0].name
                this.namePorcAssistMa = this.arrayPorc[this.arrayPorc.length - 1].name
                this.porcAssistMa = masPorcentaje(this.eventosPast[this.eventosPast.length - 1].assistance, this.eventosPast[this.eventosPast.length - 1].capacity).toFixed(1)
                this.porcAssistMe = masPorcentaje(this.eventosPast[0].assistance, this.eventosPast[0].capacity).toFixed(1)
                let catPast = this.eventosPast.map(evento => evento.category)
                catPast = Array.from(new Set(catPast))
                let catUp = this.eventosUp.map(evento => evento.category)
                catUp = Array.from(new Set(catUp))

                this.objEventPast = catPast.map((categoria) => {
                    let aux = {
                        category: categoria
                    }


                    let catEvents = this.eventosPast.filter(evento => evento.category == categoria)
                    console.log(catEvents);

                    const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.assistance), 0)
                    console.log(revenue);
                    aux.revenue = revenue.toLocaleString()

                    let porcAssist = catEvents.reduce((acc, act) => acc + (act.assistance / (act.capacity / 100)), 0) / catEvents.length
                    aux.porcAssist = porcAssist.toFixed(2)

                    return aux
                })
                this.objEventUp = catUp.map((categoria) => {
                    let aux = {
                        category: categoria
                    }


                    let catEvents = this.eventosUp.filter(evento => evento.category == categoria)
                    console.log(catEvents);

                    const revenue = catEvents.reduce((acc, act) => acc + (act.price * act.estimate), 0)
                    console.log(revenue);
                    aux.revenue = revenue.toLocaleString()

                    let porcEstimate = catEvents.reduce((acc, act) => acc + (act.estimate / (act.capacity / 100)), 0) / catEvents.length
                    aux.porcEstimate = porcEstimate.toFixed(2)
                    console.log(porcEstimate);
                    return aux
                })
                console.log(this.objEventUp);





            })
            .catch(error => console.error(error))
    },
    methods: {

    }


}
const app = createApp(options)
app.mount('#app')