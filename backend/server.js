const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const rts = require("./Router");
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const app = express();
const server = http.createServer(app);
const cookieParser = require("cookie-parser");
require("dotenv").config();
const { cronUpdateStory, cronResetView } = require("./Config/cron");

const {
  errorHandlingMiddleware,
} = require("./Middlewares/errorHandlingMiddleware.js");
const allowedOrigins = [
  "http://localhost:3001",
  "https://xlhyphzqr27vbs3ozi47425vey.srv.us",
];
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  // console.log(`User connected: ${socket.id}`);

  socket.on("disconnect", () => {
    // console.log(`User disconnected: ${socket.id}`);
  });
});

exports.io = io;
app.use(
  cors({
    origin: allowedOrigins, // Replace with your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true,
  })
);
const port = 3000;
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use("/", express.static(path.join(__dirname + "/public")));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
rts(app, io);

// Middleware xử lý lỗi
app.use(errorHandlingMiddleware);
// Sử dụng server.listen thay vì app.listen để Socket.io và Express dùng chung một server
server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
