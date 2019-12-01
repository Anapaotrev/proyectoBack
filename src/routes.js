const express = require('express')
const router = express.Router()

const users = require('./controllers/users')
const events = require('./controllers/events.js')
const auth = require('./middleware/auth')

router.get('/users', auth, users.getUsers)
router.post('/login', users.login)
router.post('/logout', auth, users.logout)
router.post('/users', users.newUser)
// router.get('/users/:id', users.getUser)
router.patch('/users', auth, users.updateUser)
router.delete('/users', auth, users.deleteUser)

router.get('/events/:id', auth, events.getEvent)
router.get('/events', auth, events.getEvents)
router.post('/events', auth, events.newEvent)
router.patch('/events/:id', auth, events.updateEvent)
router.delete('/events/:id', auth, events.deleteEvent)

router.get('*', function(req, res) {
    res.send({
      error: 'This route does not exist, try /users or /events'
    })
})

module.exports = router