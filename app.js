/*
    require modules
*/
const express=require('express');
const socket=require('socket.io');

/*
    set up server
*/
const app=express();

app.use(express.static('static'));

const server=app.listen(3000);

/*
    set up server side socket
*/
const io=socket(server);

io.on('connection', (socket)=>{
    
    //send message to all users
    socket.on('sent', (data)=>{
        io.sockets.emit('sent', data);
    });

    //notify that a user is typing to every other user
    socket.on('typing', (data)=>{
        socket.broadcast.emit('typing', data);
    });

    //user has stopped typing
    socket.on('stopped', (data)=>{
        io.sockets.emit('stopped');
    });
});