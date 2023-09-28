var express = require('express');
const db = require('../database/db');
const UserEntity = require('../entities/user.entity');
var router = express.Router();
var userRepo = db.getRepository(UserEntity);


/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('users', req);
  res.send('respond with a resource');
});

router.post('/', (req,res) => {
  userRepo.save(req.body).then(response => {
    console.log('created', response);
    res.status(201).json(response);
  }).catch(err => {
    res.status(500).json(err);
  })
})

module.exports = router;
