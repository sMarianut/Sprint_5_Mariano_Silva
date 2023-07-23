const { createApp } = Vue

createApp({
    data() {
        return {
            events: [],
            parameter: [],
            parameters: [],
            idparameter: [],
            finder: null,
        }

    },
    created() {
        fetch('https://mindhub-xj03.onrender.com/api/amazing')
            .then(response => response.json())
            .then(dataEvents => {
                this.events = dataEvents.events
                this.parameter = location.search
                this.parameters = new URLSearchParams(this.parameter)
                this.idparameter = this.parameters.get('id')
                this.finder = this.events.find(dato => dato._id == this.idparameter)
                console.log(this.finder);
            })
            .catch(error => console.error(error))
    }
}

).mount("#app")
