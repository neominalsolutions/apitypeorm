const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	console.log('home');
	res.status(200).json('home page');
});

module.exports = router;
