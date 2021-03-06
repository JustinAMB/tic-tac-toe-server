 const { Jugadores } = require('../models/jugadores');

 const jugadores = new Jugadores();
 const socketController = (cliente) => {

     console.log('Jugador conectado', cliente.id);
     cliente.on('iniciarPartida', (data, callback = Function) => {
         try {
             cliente.join(data.sala);

             jugadores.agregarJugador(cliente.id, data.nombre, data.sala, data.created);
             console.log(jugadores.getJugadoresPorSala(data.sala));
             cliente.broadcast.to(data.sala).emit('iniciarPartida', jugadores.getJugadoresPorSala(data.sala));
             callback(jugadores.getJugadoresPorSala(data.sala));
         } catch (err) {

             callback();
         }

     });
     cliente.on('jugada', (data, callback = Function) => {
         console.log(data);
         cliente.broadcast.to(data.sala).emit('jugada', data);
         //callback(data);
     });
     cliente.on('ganador', (data, callback = Function) => {
         console.log(data);
         cliente.broadcast.to(data.sala).emit('ganador', data);
         //callback(data);
     });
     cliente.on('reiniciar', (data, callback = Function) => {
         console.log(data);
         cliente.broadcast.to(data.sala).emit('reiniciar', data);
         //callback(data);
     });
     cliente.on('disconnect', () => {
         try {
             console.log('Jugador desconectado', cliente.id);
             let personaBorrada = jugadores.borrarJugador(cliente.id);
             cliente.broadcast.to(personaBorrada.sala).emit('iniciarPartida', jugadores.getJugadoresPorSala(personaBorrada.sala));

         } catch (err) {


         }
     });




 }



 module.exports = {
     socketController
 }