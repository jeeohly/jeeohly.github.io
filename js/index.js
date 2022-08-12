var socket = io();

socket.on('connect', function () {
    console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('New message', message);
});

socket.emit('createMessage', {
    from: 'Gio',
    text: 'Hi'
}, function (data) {
    console.log('Got it', data)
});