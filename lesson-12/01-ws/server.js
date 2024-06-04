import { WebSocketServer } from 'ws';

const server = new WebSocketServer({ port: 8080 });

server.on('connection', socket => {
  console.log('Client connected');
});

console.log('Server started on port 8080');
