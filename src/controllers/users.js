const User = require('../models/user')

const getUsers = function(req, res) {
    User.find({}).then(function(users) {
        res.send(users)
    }).catch(function(error){
        res.status(500).send(error)
    })
}

const login = function(req, res) {
    console.log(req.body.email)
    console.log(req.body.password)

    User.findByCredentials(req.body.email, req.body.password)
        .then(function(user) {  
            user.generateToken().then(function(token){
                console.log('generate')
                return res.send({ user, token })
            }).catch(function(error){
                console.log('cant generate')
                return res.status(401).send({ error: error })
            })
        }).catch(function(error) {
            console.log('cant find')
            return res.status(401).send({ error: error })
        })
}

const logout = function(req, res) {
    req.user.tokens = req.user.tokens.filter(function(token) {
      return token.token !== req.token
    })
    req.user.save().then(function() {
      return res.send()
    }).catch(function(error) {
      return res.status(500).send({ error: error } )
    })
}

const getUser = function(req, res) {
    User.findById(req.user._id).populate('events').then(function(user) {
        return res.send(user)
    }).catch(function(error) {
        return res.status(404).send({})
    })
}

const newUser = function(req, res) {
    const user = new User(req.body)
    user.save().then(function() {
      return res.send(user)
    }).catch(function(error) {
      return res.status(400).send(error)
    })
}

const updateUser = function(req, res) {
    const _id = req.user.id
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'password', 'email']
    // revisa que los updates enviados sean permitidos, que no envie una key que no permitimos
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

    if( !isValidUpdate ) {
        return res.status(400).send({
        error: 'Invalid update, only allowed to update: ' + allowedUpdates
        })
    }
    User.findByIdAndUpdate(_id, req.body ).then(function(user) {
        if (!user) {
            return res.status(404).send({})
        }
        return res.send(user)
    }).catch(function(error) {
        res.status(500).send(error)
    })
}

const deleteUser = function(req, res) {
    const _id = req.user.id
    User.findByIdAndDelete(_id).then(function(user){
        if(!user) {
            return res.status(404).send({})
        }
        return res.send(user)
    }).catch(function(error) {
        res.status(505).send(error)
    })
}

module.exports = {
    login,
    logout,
    getUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser
}
