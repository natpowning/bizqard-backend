require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const { connectDB } = require('./db/index');
const setRoutes = require('./routes/contacts');
const swaggerSetup = require('./swagger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

connectDB();

setRoutes(app);

// Setup Swagger
swaggerSetup(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});