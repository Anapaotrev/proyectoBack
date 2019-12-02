const Event = require('../models/event')

const getEvents = function(req, res) {
    Event.find({ createdBy: req.user._id }).then(function(events) {
        res.send(events)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

const getEvent = function(req, res) {
    const _id = req.params.id
    Event.findOne({ _id, createdBy: req.user._id }).then(function(event) {
        if (!event) {
            return res.status(404).send({ error: `Event with id ${_id} not found.` })
        }
        return res.send(event)
    }).catch(function(error) {
        return res.status(404).send(error)
    })
}

const newEvent = function(req, res) {
    const event = new Event({
        createdBy: req.user._id,
        text: req.body.text,
        start_date: req.body.start_date,
        end_date: req.body.end_date

    })
    event.save().then(function() {
      return res.send(event)
    }).catch(function(error) {
      return res.status(400).send(error)
    })
}

const updateEvent = function(req, res) {
    const _id = req.params.id
    Event.findOneAndUpdate({ _id, createdBy: req.user._id }, req.body).then(function(event) {
        if (!event) {
            return res.status(404).send({ error: `Event with id ${_id} not found.`})
        }
        return res.send(event)
    }).catch(function(error) {
        res.status(500).send(error)
    })
}

const deleteEvent = function(req, res) {
    const _id = req.params.id
    Event.findByIdAndDelete({ _id, createdBy: req.user._id }).then(function(event){
        if (!event) {
            return res.status(404).send('Event not found')
        }
        return res.send(event)
    }).catch(function(error) {
        res.status(505).send(error)
    })
}

module.exports = {
    getEvents,
    getEvent,
    newEvent,
    updateEvent,
    deleteEvent
}