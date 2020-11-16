//comando para establecer la conexion
var socket = io();

var labelNuevoTicket = $('#lblNuevoTicket');

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});

socket.on('estadoActual', function(ticketActual) {
    labelNuevoTicket.text(ticketActual.actual);
});

$('button').on('click', function() {
    //console.log('click');
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        labelNuevoTicket.text(siguienteTicket);
    });
});