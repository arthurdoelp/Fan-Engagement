const Sequelize = require("sequelize");
const db = require("../config/db");

// Event Schema

module.exports = db.sequelize.define(
    'event',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: Sequelize.DATE
        },
        city: {
            type: Sequelize.STRING
        },
        address: {
            type: Sequelize.STRING
        },
        seats: {
            type: Sequelize.INTEGER
        },
        createdBy: {
            type: Sequelize.STRING
        },
        updatedBy: {
            type: Sequelize.STRING
        },
    },
    {
        deletedAt: 'deletedAt',
        timestamps: true,
        paranoid: true
    }
)