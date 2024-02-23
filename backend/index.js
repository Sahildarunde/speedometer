import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';
import { sequelize } from './database.js';
import { SpeedData } from './models/speedData.js';

const PORT = process.env.PORT || 3001;
const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors({
  origin: '*',
}));

// Use removeOldEntries middleware on every request


let intervalId;

//generate and insert dummy data into the db
const generateAndInsertData = () => {
  const randomSpeed = Math.floor(Math.random() * 100) + 1;
  SpeedData.create({speed: randomSpeed})
    .then((data) => {
      io.emit('newData', {speed: randomSpeed});
    })
    .catch((err) => console.error('Error inserting dummy data:', err));
};

const startDataGeneration = () => {
  intervalId = setInterval(generateAndInsertData, 1000); 
};

startDataGeneration();

//fetch speed data
app.get('/speed-data', async (req, res) => {
  try {
    const speedData = await SpeedData.findAll();
    res.json(speedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synced');
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
