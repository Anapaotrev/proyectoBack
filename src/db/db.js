const mongoose = require('mongoose')

if (process.env.NODE_ENV === 'production') {
    var connectionURL = process.env.connectionURL
} else {
    const credentials = require('../credentials')
    var connectionURL = credentials.connectionURL
}

mongoose.connect(connectionURL, {
    useNewUrlParser: true,
    useCreateIndex: true
})
