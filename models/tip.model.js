const Sequelize = require("sequelize");
const db = require("../config/db");

// Tip Schema

module.exports = db.sequelize.define(
    'tip',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        artistId: {
            type: Sequelize.INTEGER
        },
        eventId: {
            type: Sequelize.INTEGER
        },
        tip: {
            type: Sequelize.STRING
        }
    },
    {
        deletedAt: 'deletedAt',
        timestamps: true,
        paranoid: true
    }
)