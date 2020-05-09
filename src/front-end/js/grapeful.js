/**
 * This is just a proof-of-concept.
 */

window.onload = function () {
    becomePeer();
};

let peer = null; // This is me. I'm a Peer.
let connection = null; // Connection to other Peer.

function connectToPeer(peerId) {
    connection = peer.connect(peerId, { reliable: true });
    connection.on('data', function (data) {
        console.log(`Peer (${peerId}) sent me data.`, data);
    });
    connection.on('open', function (data) { 
        connection.send({ message: 'Hello, host. We connected.' });
    });
    connection.on('close', function (data) { console.log('Client: connection.on.close.'); });
    connection.on('error', function (data) { console.log('Client: connection.on.error.'); });
}

function becomePeer() {

    peer = new Peer({
        host: 'localhost',
        path: '/peerjs',
        port: 8082,
        debug: 2, // Log errors and warnings.
        secure: false,
    });

    peer.on('open', function (myPeerId) {
        console.log('The server has made be Peer with ID:', myPeerId);
    });

    peer.on('connection', function (conn) {
        connection = conn;
        console.log('Another Peer connected to me.', connection);
        connection.on('data', function (data) {
            console.log(`I, the host Peer, got a message.`, data);
        });
        connection.on('open', function (data) { 
            connection.send('Hello, I\'m the host. It\'s open season.');
        });
        connection.on('close', function (data) { console.log('Host: connection.on.close.'); });
        connection.on('error', function (data) { console.log('Host: connection.on.error.'); });
    });

    peer.on('disconnected', function () { console.log('I disconnected the from server.'); });
    peer.on('error', function (error) { console.log(`There was an error with my connection with the server.`, error); });
}
