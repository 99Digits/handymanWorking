const { Socket, Server } = require("socket.io");

const io = require ("socket.io")(Server)

io.on ('connect',(socket)=>{
console.log("tyuyttyu");
})
