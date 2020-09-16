const Sequelize = require("sequelize");
const db = require("../config/db");

// User Schema

module.exports = db.sequelize.define(
    'user',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        role: {
            type: Sequelize.STRING
        }
    },
    {
        deletedAt: 'deletedAt',
        timestamps: true,
        paranoid: true
    }
)