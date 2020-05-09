/**
 * This is the grapeful Node.js server.
 * It serves static files inside the front-end/ folder, and also employs a PeerJS server.
 */

const express = require('express');
const { ExpressPeerServer } = require('peer');

// Run Express server.
const expressApp = express();
expressApp.use(express.static(__dirname + '/front-end'));
const serverPort = 8082;
const server = expressApp.listen(serverPort, () => {
    console.log(`Running server at ${serverPort}.`);
});

// Set up PeerJS server.
const peerServer = ExpressPeerServer(server, {
    debug: true,
});
peerServer.on('connection', function(id) {
    console.log('A client connected: ' + id);
});
peerServer.on('disconnect', function(id) {
    console.log('A client disconnected: ' + id);
});
expressApp.use('/peerjs', peerServer);
