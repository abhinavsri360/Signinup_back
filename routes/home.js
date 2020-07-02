var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log(req.headers)
  res.statusCode = 200
  res.setHeader('Context-type', 'text/HTML')
  res.end('<html><body><h3>Hello!</h3></body></html>')
})

module.exports = router
