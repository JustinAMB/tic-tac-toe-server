class Jugadores {

    constructor() {
        this.jugadores = [];
    }

    agregarJugador(id = '', nombre, sala, created = '') {

        let jugador = { id, nombre, sala, created };

        this.jugadores.push(jugador);

        return this.jugadores;

    }

    getjugador(id = '') {
        let jugador = this.jugadores.find(jugador => jugador.id === id);

        return jugador;
    }

    getjugadores() {
        return this.jugadores;
    }

    getJugadoresPorSala(sala = '') {
        let jugadorsEnSala = this.jugadores.filter(jugador => jugador.sala === sala);
        return jugadorsEnSala;
    }

    borrarJugador(id = '') {

        let jugadorBorrada = this.getjugador(id);

        this.jugadores = this.jugadores.filter(jugador => jugador.id != id);

        return jugadorBorrada;

    }


}


module.exports = {
    Jugadores
}