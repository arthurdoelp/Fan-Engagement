const Sequelize = require("sequelize");
const db = require("../config/db");

// Artist Schema

module.exports = db.sequelize.define(
    'artist',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        genre: {
            type: Sequelize.STRING
        },
        bio: {
            type: Sequelize.STRING
        },
        venmo: {
            type: Sequelize.STRING
        },
        facebook: {
            type: Sequelize.STRING
        },
        instagram: {
            type: Sequelize.STRING
        },
        twitter: {
            type: Sequelize.STRING
        },
        spotify: {
            type: Sequelize.STRING
        },
        soundcloud: {
            type: Sequelize.STRING
        },
        merchandise: {
            type: Sequelize.STRING
        },
        promoVideo: {
            type: Sequelize.STRING
        },
        otherLink: {
            type: Sequelize.STRING
        },
        createdBy: {
            type: Sequelize.STRING
        },
        updatedBy: {
            type: Sequelize.STRING
        }
    },
    {
        deletedAt: 'deletedAt',
        timestamps: true,
        paranoid: true
    }
)