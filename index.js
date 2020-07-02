const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const cookieParser = require('cookie-parser')
require('dotenv/config')

const app = express()

app.use(passport.initialize())
app.use(passport.session())
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(express.static(`${__dirname}/public`))
app.use(cookieParser())

const dboptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}

const connect = mongoose.connect(process.env.DB_URL, dboptions)

connect.then((db) => {
  console.log('db connected')
}, (err) => { console.log(err) })

app.use(session({
  name: 'session-id',
  secret: process.env.SECRET,
  saveUninitialized: false,
  resave: false,
  store: new FileStore()
}))

const homeRouter = require('./routes/home')
const userRouter = require('./routes/user')

app.use('/', homeRouter)
app.use('/user', userRouter)

const server = http.createServer(app)

server.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server listening to port ${process.env.PORT}`)
})
/* mongod --dbpath=data --bind_ip 127.0.0.1 */
