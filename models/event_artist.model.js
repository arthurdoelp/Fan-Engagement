const Sequelize = require("sequelize");
const db = require("../config/db");

// Event_Artist Schema

module.exports = db.sequelize.define(
    'event_artist',
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
        }
    },
    {
        deletedAt: 'deletedAt',
        timestamps: true,
        paranoid: true
    }
)