const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const jwt = require('jsonwebtoken');
const moment = require('moment/moment');
const db = require('../database/db');
const UserEntity = require('../entities/user.entity');
const userRepo = db.getRepository(UserEntity);

router.post('/', async (req, res) => {
	console.log('req.body', req.body);

	// Const user = await userRepo.findOne({where:{username:req.body.username}})

	const user = await userRepo.findOneBy({username: req.body.username});

	if (user) {
		// Payload değerleri token içerisinde taşınacak olan değerler
		// user ait tokenda hassas olmayan ama kullanıcıya ait ekranlarda göstereceğimiz bilgiler.
		// sub: subject => token sahibi
		// username: token sahibi hesap
		// roles: ['admin']
		const token = jwt.sign({sub: user.id, username: user.username, roles: ['admin', 'manager']}, process.env.JWT_KEY, {algorithm: 'HS512', expiresIn: '1h'});

		console.log('token', token);

		// 1 saaatlik expire time

		res.status(200).json({accessToken: token, exp: moment().add(1, 'hours').toISOString(), type: 'jwt'});
	} else {
		res.status(401).sendDate('Invalid User Account');
	}
});

module.exports = router;
