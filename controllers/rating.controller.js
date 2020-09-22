const Event = require('../models/event.model');
const Event_Artist = require('../models/event_artist.model');
const Artist = require('../models/artist.model');
const Rating = require('../models/rating.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createNewRatingController = (req, res) => {
    const { rating, eventId, artistId } = req.body;

    if (rating && eventId && artistId) {
        console.log(rating, eventId, artistId)

        const recordInfo = {
            artistId: artistId,
            eventId: eventId,
            rating: rating
        }

        Rating.create(recordInfo)
            .then(record => {
                console.log(record)
                Rating.findAll({
                    where: {
                        artistId: artistId,
                        eventId: eventId
                    },
                    attributes: ['rating']
                })
                    .then(ratings => {
                        let ratingsList = [];

                        for (let i = 0; i < ratings.length; i++) {
                            ratingsList.push(ratings[i].rating)
                        }
                        let average = (array) => array.reduce((a, b) => a + b) / array.length;
                        let ratingsAverage = average(ratingsList).toFixed(2);

                        return res.json({
                            ratingsAverage
                        })
                    })
                    .catch(err => {
                        console.log(err)
                        res.status(400).json({
                            errors: "We were unable to find the ratings records in the system"
                        })
                    })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    errors: "We were unable to create the rating record in the system"
                })
            })
    } else {
        res.status(400).json({
            errors: "We were unable to grab the rating from the frontend"
        })
    }
}