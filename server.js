"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var url_1 = require("url");
var next_1 = require("next");
var ws_1 = require("ws");
var httpPort = parseInt(process.env.PORT || '3000', 10);
var wsPort = 8181;
var dev = process.env.NODE_ENV !== 'production';
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = (0, http_1.createServer)(function (req, res) {
        var parsedUrl = (0, url_1.parse)(req.url || '', true);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        handle(req, res, parsedUrl);
    });
    server.listen(httpPort, function () {
        console.log("> Ready on http://localhost:".concat(httpPort));
    });
    var wss = new ws_1.default.Server({ port: wsPort });
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function (client) {
            if (client.readyState === ws_1.default.OPEN) {
                client.send(data);
            }
        });
    };
    wss.on('connection', function connection(ws) {
        ws.on('message', function message(data) {
            try {
                var jsonData = JSON.parse(data.toString());
                console.log('Received message:', jsonData);
                wss.broadcast(JSON.stringify(jsonData));
            }
            catch (error) {
                console.error('Invalid JSON received:', data.toString());
            }
        });
    });
    console.log("WebSocket server is running on ws://localhost:".concat(wsPort));
});
