const Event = require('../models/event.model');
const Event_Artist = require('../models/event_artist.model');
const Artist = require('../models/artist.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// const { validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');

Artist.belongsToMany(Event, { through: Event_Artist });
Event.belongsToMany(Artist, { through: Event_Artist });

Event_Artist.belongsTo(Artist);
Event_Artist.belongsTo(Event);

exports.showEventDetailsController = (req, res) => {
    const { eventId } = req.body;

    if (eventId) {
        Event.findOne({
            where: {
                id: eventId
            },
            attributes: ['id', 'date', 'city', 'address', 'seats']
        }).then(event => {
            if (event) {
                Event_Artist.findAll({
                    attributes: [],
                    where: {
                        eventId: eventId
                    },
                    include: {
                        model: Artist,
                        attributes: ['userId', 'name', 'venmo', 'facebook', 'instagram', 'twitter', 'spotify', 'soundcloud']
                    }
                }).then(artists => {
                    console.log(artists)
                    return res.json({
                        artists,
                        event
                    })
                })
            } else {
                res.status(400).json({
                    errors: "We could not find the event information in the database"
                })
            }
        }).catch(err => {
            console.log(err);
            res.status(400).json({
                errors: "There was an issue finding the event information in the system"
            })
        })
    } else {
        res.status(400).json({
            errors: "We were unable to grab the event id from the frontend"
        })
    }
}

exports.showAllEventsController = (req, res) => {
    Event.findAll({
        attributes: ['id', 'date', 'city', 'seats']
    }).then(events => {
        return res.json({
            events
        })
    }).catch(err => {
        console.log(err)
        res.status(400).json({
            errors: "There was an issue finding all of the events in the system"
        })
    })
}

exports.createEventController = (req, res) => {
    const { userId, date, city, address, seats, performers } = req.body;
    console.log(userId, date, city, address, seats, performers);

    const eventData = {
        date,
        city,
        address,
        seats: Math.round(seats),
        createdBy: userId,
        updatedBy: userId
    }

    Event.create(eventData).then(event => {
        Artist.findAll({
            attributes: ['userId'],
            where: {
                [Op.or]: [
                    { name: performers }
                ]
            }
        }).then(artists => {
            console.log(artists)
            console.log(artists.length)
            const eventArtistData = [];
            for (let i = 0; i < artists.length; i++) {
                eventArtistData.push({
                    artistUserId: artists[i].userId,
                    eventId: event.dataValues.id
                })
            }
            console.log(eventArtistData)
            Event_Artist.bulkCreate(eventArtistData).then(eventArtists => {
                return res.json({
                    event
                })
            }).catch(err => {
                console.log(err)
                return res.status(400).json({
                    errors: "There was an issue bulk creating the event artists records in the system"
                })
            })

        }).catch(err => {
            console.log(err)
            return res.status(400).json({
                errors: "There was an issue finding all of the artist ids in the system"
            })
        })
    }).catch(err => {
        console.log(err)
        return res.status(400).json({
            errors: "There was an issue creating the new event"
        })
    })
}
