const mongoose = require('mongoose')
const validator = require('validator')

const eventSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    start_date: {
        type: Date,
        required: true,
        validate(value) {
            if (value > this.ends) {
                throw new Error('Should be smaller than end date')
            }
        }
    }, 
    end_date: {
        type: Date,
        required: true,
        validate(value) {
            if (value < this.starts) {
                throw new Error('Should be bigger than start date')
            }
        }
    }
})

const Event = mongoose.model('Event', eventSchema)

module.exports = Event
