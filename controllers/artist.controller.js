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