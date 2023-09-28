var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('home')
  res.status(200).json('home page');
});

module.exports = router;
