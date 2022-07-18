const socket = io()


// DOM elements
let message = document.getElementById('message')
let username = document.getElementById('username')
let btn = document.getElementById('send')
let output = document.getElementById('output')
let actions = document.getElementById('actions')

btn.addEventListener('click', function(){
socket.emit('chat:message',{ //el servidor emite, que parte del boton que registrae el evento.
    username: username.value,
    message:message.value
    }
// nota que yo solo puedo enviarle un mensaje.
)
})

//cuando alguien está tipeando mensajes:
message.addEventListener('keypress',function(){
    console.log(username.value)
    socket.emit('chat:typing',username.value)
    //socket emit para enviar mensaje del cliente al servidor
})








//ahora toca hacer que el socket escuche lo qe envie el server

socket.on('chat:message',function(data){

    actions.innerHTML = '' // esto es para que cuando el mensaje en si ya se recibió, el inner html de actions se borre.
    //esto para qe no aparece que está tipeando.

   output.innerHTML +=  `<p>
    <strong>${data.username}</strong>: ${data.message}    
    </p>` 
})

socket.on('chat:typing',function(data){
//esto es para que el cliente escuche.
actions.innerHTML = `<p><em> 
${data} is typing a message
</em></p>`

})










