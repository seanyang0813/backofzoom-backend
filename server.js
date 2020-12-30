const io = require("socket.io")(3000, {
    cors: {
      origin: "http://backofzoom.vercel.app/*",
    },
  });

var connections = 0;
var messages = 0;

io.on('connection', socket => {
  socket.on('join-room', function(room) {
    socket.join(room);
    connections += 1;
    if (connections % 20 === 0) {
      console.log("connections: " + connections.toString());
      console.log("Messages: " + messages.toString());
    }
  });
  socket.on('message', function(messageObject) {
    messages += 1;
    socket.to(messageObject.room).emit("message-send", 
      {user: messageObject.user, message: messageObject.message})
  });
})