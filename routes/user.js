var express = require('express')
var bodyParser = require('body-parser')
var router = express.Router()
var User = require('../models/user')
var passport = require('passport')
require('../authenticate')

router.use(bodyParser.json())

router.route('/')
  .get((req, res, next) => {
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
    res.statusCode = 200
    res.setHeader('Content-type', 'application/json')
    res.json({ success: true, status: 'You are successfully logged in!' })
  })

module.exports = router
