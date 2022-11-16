const Sequelize = require('sequelize');
module.exports = new Sequelize(
    "sulpak",
    "root",
    "123456789", {
    dialect: "mysql",
    host: "localhost",
});