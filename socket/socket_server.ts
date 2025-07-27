// socket-server.js
const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer();
const io = new Server(server, {
    cors: {
        origin: "*", // 允许任何来源连接（开发时可用）
    },
});

io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);

    socket.on("message", (data) => {
        console.log("Received message:", data);
        socket.emit("message", `Server received: ${data}`);
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });
});

server.listen(3001, () => {
    console.log("Socket.IO server running on http://localhost:3001");
});