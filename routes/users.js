var express = require('express')
var bodyParser = require('body-parser')
var cors = require('./cors')

const Users = require('../models/user')

var userRouter = express.Router()

userRouter.use(bodyParser.json())

userRouter.route('/')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
  .get(cors.cors, (req, res, next) => {
    Users.find({})
      .then((users) => {
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(users)
      }, (err) => next(err))
      .catch((err) => next(err))
  })

userRouter.route('/signup')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
  .post(cors.corsWithOptions, (req, res, next) => {
    Users.create(req.body)
      .then((user) => {
        console.log(user)
        res.statusCode = 200
        res.setHeader('Content-type', 'application/json')
        res.json(user)
      }, (err) => next(err))
      .catch((err) => next(err))
  })

userRouter.route('/login')
  .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200) })
  .get(cors.corsWithOptions, (req, res, next) => {
    Users.findOne({ email: req.body.email })
      .then((user) => {
        if (user.password === req.body.password) {
          res.statusCode = 200
          res.setHeader('Content-type', 'application/json')
          res.json(user)
        } else { next(err) }
      }, (err) => next(err))
      .catch((err) => next(err))
  })

module.exports = userRouter
