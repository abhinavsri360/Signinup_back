var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
var authenticate = require('../authenticate')

router.use(bodyParser.json())

router.route('/')
  .get(authenticate.verifyUser, (req, res, next) => {
    User.find()
      .then((users) => {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.json(users)
      })
      .catch(err => { console.log(err) })
  })

router.route('/register')
  .post((req, res, next) => {
    User.register(new User({ username: req.body.username }),
      req.body.password, (err, user) => {
        if (err) {
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.json({ err: err })
        } else {
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200
            res.setHeader('Content-Type', 'application/json')
            res.json({ success: true, status: 'Registration Successful!' })
          })
        }
      })
  })

router.route('/login')
  .post(passport.authenticate('local'), (req, res, next) => {
    var token = authenticate.getToken({ _id: req.user._id })
    res.statusCode = 200
    res.setHeader('Content-type', 'application/json')
    res.json({ success: true, token: token, status: 'You are successfully logged in!' })
  })

router.get('/logout', (req, res, next) => {
  if (req.session) {
    req.session.destroy()
    res.clearCookie('session-id')
    res.redirect('/')
  } else {
    var err = new Error('You are not logged in!')
    err.status = 403
    next(err)
  }
})

module.exports = router
