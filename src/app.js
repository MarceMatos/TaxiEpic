const express = require('express');
const dotenv = require('dotenv');
const engine = require('ejs-mate');
const path = require('path');
const socketIO = require('socket.io');
const http = require('http');


const app = express();
app.engine('ejs', engine);
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
dotenv.config({path:'./env/.env'});
const server = http.createServer(app);
const io = socketIO(server)


//routes 
app.use(require('./routes/routes.js'));

//Socket
require('./sockets.js')(io);

//udpserver
require('./UDP_Server');

//Archivos estaticos
app.use(express.static(path.join(__dirname, 'public')))

//Inicial servidor 
const PORT = 3000; 
server.listen(PORT, ()=>{
    console.log('Server on http://localhost:'+PORT);
})


const connection = require('../database/db');
