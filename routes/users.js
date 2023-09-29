const express = require('express');
const db = require('../database/db');
const UserEntity = require('../entities/user.entity');
// eslint-disable-next-line new-cap
const router = express.Router();
const userRepo = db.getRepository(UserEntity);

/* GET users listing. */
router.get('/', (req, res) => {
	console.log('users', req);
	res.send('respond with a resource');
});

router.post('/', (req, res) => {
	userRepo.save(req.body).then(response => {
		console.log('created', response);
		res.status(201).json(response);
	}).catch(err => {
		res.status(500).json(err);
	});
});

module.exports = router;
