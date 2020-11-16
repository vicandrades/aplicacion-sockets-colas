const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    // Escuchar el cliente
    client.on('siguienteTicket', (data, callback) => {

        //client.broadcast.emit('enviarMensaje', data);

        let siguiente = ticketControl.siguiente();

        console.log(siguiente);

        callback(siguiente);

    });

    client.on('atenderTicket', (data, callback) => {

        if (!data.escritorio) {
            return callback({
                err: false,
                mensaje: 'el escritorio es necesario'
            });
        }

        let atenderTicket = ticketControl.atenderTicket(data.escritorio);

        //emitir ultimos4
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        });
        return callback(atenderTicket);

        //actualizar cambios en los ultimos4 

    });



});