const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const gpsRoute = require('./routes/auth');
const dotenv = require('dotenv');
const { profileEnd } = require('console');
dotenv.config()
const app = express();
app.use(cors());
app.use(express.json());
app.use('/auth', gpsRoute);

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React frontend
    methods: ["GET", "POST"]
  }
});

const users = {}; // To track users

io.on('connection', (socket) => {
  console.log('Client connected:', socket.id);

  socket.on('send-location', (location) => {
    users[socket.id] = location; // Save user location
    io.emit('receive-locations', users); // Send all users' locations
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    delete users[socket.id]; // Remove disconnected user
    io.emit('receive-locations', users); // Update all users
  });
});


server.listen(process.env.PORT, () => {
  console.log(`Server running at http://localhost:${process.env.PORT}`);
});

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("Connected to MongoDB");
});