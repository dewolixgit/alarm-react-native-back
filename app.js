const express = require('express');
const config = require('config');
const mongoose = require("mongoose");
const initRoutes = require("./routes");
require('dotenv').config();

const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Request-Method', 'GET, POST');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

app.use(express.json({ extended: true }));

initRoutes(app);

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();

