if (process.env.DATABASE_URL) {
    const Sequelize = require("sequelize");
    const db = {};
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }

    });
    console.log("PostgreSQL Connected to heroku!");

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    module.exports = db;
} else {
    const Sequelize = require("sequelize");
    const db = {};
    const sequelize = new Sequelize("sofar-sounds-fan-engagement", "arthurdoelp", "", {
        host: 'localhost',
        dialect: 'postgres',

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }

    });
    console.log("PostgreSQL Connected to local machine!");

    db.sequelize = sequelize;
    db.Sequelize = Sequelize;

    module.exports = db;
}
