const io = require("socket.io")(3000, {
    cors: {
      origin: "http://https://backofzoom.vercel.app/",
    },
  });

const users = {}

io.on('connection', socket => {
  socket.on('join-room', function(room) {
    socket.join(room);
  });
  socket.on('message', function(messageObject) {
      socket.to(messageObject.room).emit("message-send", 
        {user: messageObject.user, message: messageObject.message})
  });
})