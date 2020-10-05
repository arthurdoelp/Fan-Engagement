const Event = require('../models/event.model');
const Event_Artist = require('../models/event_artist.model');
const Artist = require('../models/artist.model');
const Rating = require('../models/rating.model');
const User = require('../models/user.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const { OAuth2Client } = require('google-auth-library');
// const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

Artist.belongsToMany(Event, { through: Event_Artist });
Event.belongsToMany(Artist, { through: Event_Artist });

Event_Artist.belongsTo(Artist);
Event_Artist.belongsTo(Event);
Artist.belongsTo(User);

exports.registerArtistController = (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);

    const userData = {
        email,
        password,
        role: 'artist'
    }

    bcrypt.hash(userData.password, 10, (err, hash) => {
        userData.password = hash
        User.findOrCreate({
            where: {
                email: userData.email
            },
            defaults: {
                password: userData.password,
                role: userData.role
            }
        }).then(user => {
            let token = jwt.sign(user[0].dataValues, process.env.JWT_SECRET, {
                expiresIn: '7d'
            })
            if (user[1] == true) {
                console.log("The user is a new user");
                res.json({
                    success: "The user is a new user!",
                    token,
                    user: user[0]
                })

            } else {
                console.log("Ther user is an existing user");
                res.status(400).json({
                    errors: "This user already exists"
                })
            }
        })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    errors: "There was an issue searching the partne accounts table in the system. Please contact sales@britswine.com"
                })
            })
    })
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT);
// Google Login
exports.googleController = (req, res) => {
    const { idToken } = req.body;

    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT })
        .then(response => {
            const { email_verified, name, email } = response.payload;
            if (email_verified) {
                User.findOne({
                    where: {
                        email: email
                    }
                }).then(user => {
                    if (user) {
                        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                            expiresIn: '7d'
                        });
                        const { id, email, name, role } = user;
                        return res.json({
                            token,
                            user: { id, email, name, role }
                        });
                    } else {
                        let password = email + process.env.JWT_SECRET;
                        User.create({ name, email, password })
                            .then(newUser => {
                                const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
                                    expiresIn: '7d'
                                });
                                const { id, email, name, role } = newUser;
                                return res.json({
                                    token,
                                    user: { id, email, name, role }
                                })
                            }).catch(err => {
                                console.log(err);
                                res.status(400).json({
                                    errors: 'User signup failed with google'
                                })
                            })
                    }
                }).catch(err => {
                    console.log(err);
                    res.status(400).json({
                        errors: "There was an issue finding the user in the system"
                    })
                })
            } else {
                console.log('Google login failed. Try again');
                return res.status(400).json({
                    errors: 'Google login failed. Try again'
                })
            }
        })
}
