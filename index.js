const path = require("path");
const express = require("express");
const app = express(); //esto va a tener toda la configuracion de mi servidor
//express es mi servidor

//setting THE PORT
app.set("port", process.env.PORT || 3000);

//static files
app.use(express.static(path.join(__dirname, "public")));

//mi app es express. el modulo use es un modulo de app. luego de express yo llamo la propuedad static.
//esto es para ver los archivos estáticos.. basicamente lo qe es del public, lo qe se llamará una vez y no se modificara
// luego debo usar un palabra reservada qe es path.
//express no sabe donde están los archivos estáticos.
//path es un modulo de nodejs. este modulo se encarga de unir directorios.
//el metodo join es para unir la ruta dirname con la siguiente parte de la ruta.
//por eso uso path.join dirname junto a public

//console.log(__dirname )
//dirname me dice la uta de onde estoy

//start the server
const server = app.listen(app.get("port"), () => {
  console.log("server on port: ", app.get("port"));
});

//websockets

const SocketIO = require("socket.io");
//pero necesito el servidor inicializado. entonces mira como abajo, inicializo el servidor con .listen
//luego de inicializado, lo paso entonces como constante a mi socketIO con su metodo/modulo .listen.
//const SocketIO.listen(server);

const io = SocketIO(server); //como ya esta inicializado el listen ahi abajo, entonces ya no requiero llamar el listen aqui.

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  //este es el id del socket.

  socket.on("chat:message", (data) => {
    //el servidor escucha. Para eso es el .on. Escucha la data

    io.sockets.emit("chat:message", data); //este es el servidor emitiendo info . para eso es el emit
  }); //io.sockets es para qe se emita a todos, inlcuyendome

  //respecto a cuando el otro tipea.
  //quiero que el servidor escuche.

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
    //ahora quiero emitir solo a los demás, no a mi
    //esto, recuerda, es del lado del server.
  });
});

//la carpeta public tendrá todo lo del frontend
