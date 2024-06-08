import { createServer } from 'http';
import { parse } from 'url';
import next from 'next';
import WebSocket from 'ws';

interface CustomWebSocketServer extends WebSocket.WebSocketServer {
  broadcast(data: WebSocket.Data): void;
}

const httpPort = parseInt(process.env.PORT || '3000', 10);
const wsPort = 8181;

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url || '', true);

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    handle(req, res, parsedUrl);
  });

  server.listen(httpPort, () => {
    console.log(`> Ready on http://localhost:${httpPort}`);
  });

  const wss = new WebSocket.Server({ port: wsPort }) as CustomWebSocketServer;

  wss.broadcast = function broadcast(data: WebSocket.Data) {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };

  wss.on('connection', function connection(ws) {
    ws.on('message', function message(data) {
      try {
        const jsonData = JSON.parse(data.toString());
        console.log('Received message:', jsonData);
        wss.broadcast(JSON.stringify(jsonData));
      } catch (error) {
        console.error('Invalid JSON received:', data.toString());
      }
    });
  });

  console.log(`WebSocket server is running on ws://localhost:${wsPort}`);
});
