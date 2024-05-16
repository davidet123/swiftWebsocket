const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const XLSX = require("xlsx")

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// ruta archivo excel
// const workbook = XLSX.readFile("./data/test.xlsx")

// const worksheet = workbook.Sheets[workbook.SheetNames[1]]
// const excelData = XLSX.utils.sheet_to_json(worksheet)

// Serve a simple HTML page to establish a WebSocket connection
// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

// WebSocket server logic
wss.on('connection', (ws, req) => {
  console.log('A client connected.');
  console.log(req.socket.remoteAddress)

  // Handle incoming WebSocket messages
  ws.on('message', (data, isBinary) => {
    const message = isBinary ? data : data.toString();
    if(message === "actualizarExcel") {
      const workbook = XLSX.readFile("./data/test.xlsx")
      const worksheet = workbook.Sheets[workbook.SheetNames[1]]
      // worksheet.forEach(el => console.log(el))
      // console.log(typeof(worksheet))
      // const datos = (JSON.parse(worksheet))
      // wss.clients.forEach((client) => {
      //   if (client !== ws && client.readyState === WebSocket.OPEN) {
      //     // client.send(JSON.parse(message));
      //     client.send(excelData)
      //   }
      // });
      ws.send(JSON.stringify(worksheet))
    } else {

      console.log(`Received: ${message}`);
  
      // Broadcast the received message to all connected clients
      wss.clients.forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          // client.send(JSON.parse(message));
          client.send(message)
        }
      });
    }
  });

  // ws.on('partido', (data, isBinary) => {
  //   const message = isBinary ? data : data.toString();
  //   console.log(`Partido: ${message}`);

  //   // Broadcast the received message to all connected clients
  //   wss.clients.forEach((client) => {
  //     if (client !== ws && client.readyState === WebSocket.OPEN) {
  //       // client.send(JSON.parse(message));
  //       client.send('partido', message)
  //     }
  //   });
  // });

  // Handle WebSocket connection close
  ws.on('close', () => {
    console.log('A client disconnected.');
  });
});

const port = process.env.PORT || 8001;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});


// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const cors = require('cors'); // Import the cors middleware

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// const corsOptions = {
//   origin: "http://localhost:8001/",
//   methods: ["GET", "POST"]
// }

// app.use(cors(corsOptions));
// // Serve a simple HTML page


// // Define a connection event for Socket.io
// io.on('connection', (socket) => {
//   console.log('A user connected');

//   // Handle messages sent by the client
//   socket.on('mensaje', (msg) => {
//     console.log(`Received message: ${msg}`);
//     // Broadcast the message to all connected clients
//     io.emit('mensaje', msg);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('A user disconnected');
//   });
// });

// // Start the server on port 8001
// const PORT = process.env.PORT || 8001;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });


// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// // Almacena las conexiones de los clientes
// const clients = new Map();

// app.get('/', (req, res) => {
//     res.send('¡Hola, WebSocket!');
//   });

// io.on('connection', (socket) => {
//   // Maneja la conexión de un nuevo cliente
//   console.log(`Cliente conectado: ${socket.id}`);
  
//   // Almacena el socket del cliente en el mapa
//   clients.set(socket.id, socket);

//   // Maneja los mensajes enviados por el cliente
//   socket.on('message', (message) => {
//     console.log(`Mensaje recibido de ${socket.id}: ${message}`);

//     // Envía el mensaje a todos los clientes excepto al remitente
//     clients.forEach((clientSocket) => {
//       if (clientSocket !== socket) {
//         clientSocket.emit('message', message);
//       }
//     });
//   });

//   // Maneja la desconexión de un cliente
//   socket.on('disconnect', () => {
//     console.log(`Cliente desconectado: ${socket.id}`);
//     clients.delete(socket.id);
//   });
// });

// const PORT = 8001;
// server.listen(PORT, () => {
//   console.log(`Servidor WebSocket escuchando en el puerto ${PORT}`);
// });


// const express = require('express');
// const http = require('http');
// const WebSocket = require('ws');

// const app = express();
// const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });

// const clients = new Set();

// // Configuración de Express
// app.get('/', (req, res) => {
//   res.send('¡Hola, WebSocket!');
// });

// // Configuración de WebSocket
// wss.on('connection', (ws) => {
//   console.log('Cliente conectado');
//   clients.add(ws);

//   // Envía un mensaje al cliente
//   // ws.send('¡Conexión exitosa al servidor WebSocket!');

//   // Maneja mensajes recibidos del cliente
//   ws.on('message', (message) => {
//     // console.log(`Mensaje recibido: ${message}`);
//     clients.forEach((client) => {
//       if (client !== ws && client.readyState === WebSocket.OPEN) {
//         client.send(message);
//       }
//     });

//     // Envía un mensaje de respuesta al cliente
//     // ws.send(`Servidor: Recibí tu mensaje: ${message}`);
//     // ws.send(`Servidor: Recibí tu mensaje: ${message}`)
//   });
// });

// // Inicia el servidor en el puerto 8001
// server.listen(8001, () => {
//   console.log('Servidor Express y WebSocket escuchando en el puerto 3000');
// });