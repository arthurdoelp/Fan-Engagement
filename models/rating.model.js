const Sequelize = require("sequelize");
const db = require("../config/db");

// Rating Schema

module.exports = db.sequelize.define(
    'rating',
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
        rating: {
            type: Sequelize.INTEGER
        }
    },
    {
        deletedAt: 'deletedAt',
        timestamps: true,
        paranoid: true
    }
)