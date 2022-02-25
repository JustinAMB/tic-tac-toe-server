const { Jugadores } = require('../models/jugadores');

const jugadores = new Jugadores();
const socketController = (cliente) => {

    console.log('Jugador conectado', cliente.id);
    cliente.on('iniciarPartida', (data, callback) => {
        client.join(data.sala);

        jugadores.agregarJugador(client.id, data.nombre, data.sala);

        client.broadcast.to(data.sala).emit('listaJugador', usuarios.getJugadoresPorSala(data.sala));


        callback(usuarios.getPersonasPorSala(data.sala));

    })
    cliente.on('disconnect', () => {
        console.log('Cliente desconectado', cliente.id);
    });



}



module.exports = {
    socketController
}