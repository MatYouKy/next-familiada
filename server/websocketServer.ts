// import WebSocket from 'ws';
// import http from 'http';
// import { Socket } from 'net';

// const ws = new WebSocket.Server({ noServer: true });

// ws.on('connection', function connection(ws: WebSocket) {
//   ws.on('message', async function incoming(message: string) {
//     console.log('Received:', message);
//     // Tutaj możesz dodać logikę związana z obsługą modeli MongoDB
//     // Przykładowo: const data = await YourModel.find({});
//     // ws.send(JSON.stringify(data));
//   });

//   ws.send('Połączenie z serwerem WebSocket zostało nawiązane!');
// });

// const server = http.createServer();
// server.on(
//   'upgrade',
//   function upgrade(
//     request: http.IncomingMessage,
//     socket: Socket,
//     head: Buffer
//   ) {
//     ws.handleUpgrade(request, socket, head, function done(ws) {
//       ws.emit('connection', ws, request);
//     });
//   }
// );

// server.listen(8080, () => {
//   console.log('WebSocket server listening on port 8080');
// });
