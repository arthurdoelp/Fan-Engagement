const Event = require('../models/event.model');
const Event_Artist = require('../models/event_artist.model');
const Artist = require('../models/artist.model');
const Tip = require('../models/tip.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createNewTipController = (req, res) => {
    const { tip, eventId, artistId } = req.body;

    if (tip && eventId && artistId) {
        console.log(tip, eventId, artistId)

        const recordInfo = {
            artistId: artistId,
            eventId: eventId,
            tip: tip
        }

        Tip.create(recordInfo)
            .then(record => {
                console.log(record)
                return res.json({
                    record
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    errors: "We were unable to create the tip record in the system"
                })
            })
    } else {
        res.status(400).json({
            errors: "We were unable to grab the tip/eventId/artistId from the frontend"
        })
    }
}