//comando para establecer la conexion
var socket = io();

socket.on('connect', function() {
    console.log('Conectado al servidor');
});

socket.on('disconnect', function() {
    console.log('perdimos conexion con el servidor');
});


//obtener parametros de la url
var searchParams = new URLSearchParams(window.location.search);

var label = $('small');


//console.log(searchParams.has('escritorio')); //muestra en consola si existe un parametro escritorio en los parametros del url

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
console.log(escritorio);
$('h1').text('Escritorio:' + escritorio);

$('button').on("click", function() {

    socket.emit('atenderTicket', { escritorio: escritorio }, function(resp) {

        console.log(resp);
        if (resp === 'No Hay tickets') {
            label.text(resp);
            alert(resp);
            return;
        }

        label.text('ticket nro:' + resp.numero);
    });


});