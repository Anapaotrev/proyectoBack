const mongoose = require('mongoose')
const validator = require('validator')

const eventSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    allDay: {
        type: Boolean,
        default: false
    },
    starts: {
        type: Date,
        required: function() { return this.allDay != null; },
        validate(value) {
            if (value > this.ends) {
                throw new Error('Should be smaller than end date')
            }
        }
    }, 
    ends: {
        type: Date,
        required: function() { return this.allDay != null; },
        validate(value) {
            if (value < this.starts) {
                throw new Error('Should be bigger than start date')
            }
        }
    },
    repeat: {
        type: String,
        enum: ['Every Day', 'Every Week', 'Every Month', 'Every Year']
    },
    notes: {
        type: String,
        max: 150
    }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
