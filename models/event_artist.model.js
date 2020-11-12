const Sequelize = require("sequelize");
const db = require("../config/db");
const Artist = require("./artist.model");
const Event = require("./event.model");

// Event_Artist Schema

module.exports = db.sequelize.define(
    'event_artist',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        artistUserId: {
            type: Sequelize.INTEGER,
            references: {
                model: Artist,
                key: 'userId'
            }
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