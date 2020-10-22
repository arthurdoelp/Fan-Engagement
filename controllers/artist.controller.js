const Event = require('../models/event.model');
const Event_Artist = require('../models/event_artist.model');
const Artist = require('../models/artist.model');
const Rating = require('../models/rating.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');

Artist.belongsToMany(Event, { through: Event_Artist });
Event.belongsToMany(Artist, { through: Event_Artist });

Event_Artist.belongsTo(Artist);
Event_Artist.belongsTo(Event);

exports.showArtistDetailsController = (req, res) => {
    const { artistId } = req.body;
    console.log(artistId);

    if (artistId) {
        Artist.findOne({
            where: {
                userId: artistId
            },
            attributes: ['userId', 'name', 'city', 'genre', 'bio', 'facebook', 'instagram', 'twitter', 'spotify', 'soundcloud', 'merchandise', 'promoVideo', 'otherLink', 'createdAt']
        }).then(artist => {
            if (artist) {
                Event_Artist.findAll({
                    attributes: [],
                    where: {
                        artistId: artistId
                    },
                    include: {
                        model: Event,
                        attributes: ['id', 'date', 'city', 'seats']
                    }
                }).then(events => {
                    if (events) {
                        return res.json({
                            events,
                            artist
                        })
                    } else {
                        res.status(400).json({
                            errors: "We could not find the rating information in the database for the event"
                        })
                    }
                })
            } else {
                res.status(400).json({
                    errors: "We could not find the artist information in the database"
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json({
                errors: "There was an issue finding the artist information in the system"
            })
        })
    } else {
        res.status(400).json({
            errors: "We were unable to grab the artist id from the frontend"
        })
    }
}

exports.createArtistProfileController = (req, res) => {
    const { userId, name, city, genre, bio, venmo, facebook, twitter, instagram, spotify, soundcloud, merchandise, other } = req.body;
    console.log(userId, name, city, genre, bio, venmo, facebook, twitter, instagram, spotify, soundcloud, merchandise, other);

    if (userId, name && city && genre && bio && venmo) {
        const newArtist = {
            userId,
            name,
            city,
            genre,
            bio,
            venmo,
            facebook,
            twitter,
            instagram,
            spotify,
            soundcloud,
            merchandise,
            otherLink: other
        }

        Artist.findOne({
            where: {
                [Op.or]: [
                    { userId: userId },
                    { name: name }
                ]
            }
        }).then(existingArtist => {
            if (!existingArtist) {
                Artist.create(newArtist)
                    .then(artist => {
                        return res.json({
                            artist
                        })
                    }).catch(err => {
                        console.log(err)
                        return res.status(400).json({
                            errors: "There was an issue creating the new artist profile in the system."
                        })
                    })
            } else {
                console.log("This user is already associated with an artist profile or the Artist profile already exists")
                return res.status(400).json({
                    errors: "This user is already associated with an artist profile or the Artist profile already exists"
                })
            }
        })
    }
}

exports.editArtistProfileController = (req, res) => {
    const { id } = req.body;
    const userId = id;
    console.log(userId);

    if (userId) {
        Artist.findOne({
            where: {
                userId: userId
            },
            attributes: ['userId', 'name', 'city', 'genre', 'bio', 'venmo', 'facebook', 'twitter', 'instagram', 'spotify', 'soundcloud', 'merchandise', 'otherLink']
        }).then(artist => {
            return res.json({
                artist
            })
        }).catch(err => {
            console.log(err)
            return res.status(400).json({
                errors: "There was an issue finding the artist profile in the system."
            })
        })
    } else {
        return res.status(400).json({
            errors: "We did not receive the userId from the frontend"
        })
    }
}