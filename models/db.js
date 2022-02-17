const Sequelize = require('sequelize');

//Conexão
    const sequelize = new Sequelize('Xerox', 'root', 'Santer@2', {
        host: "localhost",
        dialect: 'mysql'
    })

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}