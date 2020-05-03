/*
    set up client side socket
*/
const socket=io.connect('http://localhost:3000');

/*
    save references to DOM elements in variables
*/
const output=document.getElementById('output');
const typing=document.getElementById('typing');
const name=document.getElementById('name');
const msg=document.getElementById('msg');
const send=document.getElementById('send');

/*
    client emits an event
        'sent' event: message is being sent on button click
        'typing' event: user is typing a message on keypress
        'stopped' event: user has stopped typing when msg has finished changing
*/
send.addEventListener('click', ()=>{
    if(msg.value!==""){
        socket.emit('sent', {
            name: name.value,
            msg: msg.value
        });

        msg.value="";
    }

    else{
        alert("Please enter a mesage");
    }
});

msg.addEventListener('keypress', ()=>{
    socket.emit('typing', {
        name: name.value
    });
});

msg.addEventListener('change', ()=>{
    socket.emit('stopped');
});


/*
    client recieves an event
        'sent' event: add the message recieved to the DOM
        'typing' event: show which user is typing on the DOM
        'stopped' event: stop showing which user is typing on the DOM
*/
socket.on('sent', (data)=>{
    typing.innerHTML="";
    
    output.innerHTML+=
        '<p><strong>' +data.name + ': </strong>' + data.msg +'</p>';
});

socket.on('typing', (data)=>{
    typing.innerHTML= '<div><em>'+ data.name + ' is typing...</em></div>';
});

socket.on('stopped', ()=>{
    typing.innerHTML="";
});