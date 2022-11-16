const express = require('express');
const sequelize = require('./db.js')

const PORT = 3000;

const app = express();

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();