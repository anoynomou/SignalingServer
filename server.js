var express = require("express")
var App = express()
var PORT = 80 || process.env.PORT
var cors = require("cors")
var bodyParser = require("body-parser")
var path = require("path")

App.use(bodyParser.json({ type: 'application/*+json' }))
App.use(cors())


var http = require("http").createServer(App).listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    
})
var io = require("socket.io")(http,{cors:{origin:"*"}})
App.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"views","document.html"))
})




io.on("connection",(socket)=>{
    console.log(socket.id)

     

    socket.on("join",(roomid)=>{
        console.log(`Join with ROOM: ${roomid}`)
        socket.join(roomid)
    })

    socket.on("msg",(roomid,data)=>{
        console.log(`TO : ${roomid}  MESSAGE : ${data}`)
        socket.broadcast.to(roomid).emit("msg",data)
    })


    socket.on("disconnect",(DisconnectionReason)=>{
        console.log("disconnect")
    })

})



