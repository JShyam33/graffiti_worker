// worker.js
require('dotenv').config();
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const bodyParser = require('body-parser');
const { JSONCookies } = require('cookie-parser');
const prisma = new PrismaClient();
const app = express();
app.use(express.json());
// Other middlewares (if any)
app.use(cors({origin: true,methods: ['GET','POST','PUT','DELETE'],allowedHeaders: ['Content-Type', 'Authorization','Access-Control-Allow-Origin']}));



app.use(bodyParser.json({ limit: '10mb' })); // Increase limit if needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

// Example routes
app.get('/', (req, res) => {
  console.log('Hello World');
  res.send('Hello World');
});

app.post('/save_spray_data', async (req, res) => {
  console.log('save-image');
  const { sprayCommands } = req.body;
  
  console.log(sprayCommands);

  const Commands = JSON.stringify(sprayCommands); 
  await prisma.image.create({
    data: {sprayCommands:Commands},
  });

  res.sendStatus(200);

});

app.listen(5000, () => {
  console.log('Worker server running on port 5000');
});
