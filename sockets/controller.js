const { Jugadores } = require('../models/jugadores');

const jugadores = new Jugadores();
const socketController = (cliente) => {

    console.log('Jugador conectado', cliente.id);
    cliente.on('iniciarPartida', (data, callback) => {
        cliente.join(data.sala);

        jugadores.agregarJugador(cliente.id, data.nombre, data.sala);
        console.log(jugadores.getJugadoresPorSala(data.sala));
        cliente.broadcast.to(data.sala).emit('listaJugador', jugadores.getJugadoresPorSala(data.sala));


        callback(jugadores.getJugadoresPorSala(data.sala));

    })
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado', cliente.id);
    });



}



module.exports = {
    socketController
}