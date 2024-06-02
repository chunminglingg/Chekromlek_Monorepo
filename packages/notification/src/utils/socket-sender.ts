import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

let io: Server;

export function initSocket(server: HttpServer): void {
    io = new Server(server, {
        cors: {
            origin: "*", // Adjust the origin as needed
            methods: ["GET", "POST"]
        }
    });

    io.on("connection", (socket: Socket) => {
        console.log(`Client connected: ${socket.id}`);

        socket.on("disconnect", () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

export function getIo(): Server {
    if (!io) {
        throw new Error("Socket.io not initialized");
    }
    return io;
}
