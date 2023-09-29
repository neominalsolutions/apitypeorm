const {rateLimit} = require('express-rate-limit');
// Const RedisStore = require('rate-limit-redis');
// const redisClient = require('../database/redis');

const postDetailLimiter = rateLimit({
	windowMs: 1000 * 60 * 2, // 2 dakikada
	limit: 10, // Request limit sayısı
	message:
		'Post Detay endpointe çok falza istek yapıldı. istek kısıtlandı',
	standardHeaders: 'draft-7',
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const postListLimiter = rateLimit({
	windowMs: 1000 * 60 * 2, // 2 dakikada
	limit: 10, // Request limit sayısı
	message:
		'Post Detay endpointe çok falza istek yapıldı. istek kısıtlandı',
	standardHeaders: 'draft-7',
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
	// store: new RedisStore(
	// 	{
	// 		sendCommand: (...args) => redisClient.sendCommand(args),
	// 	},
	// ),
});

// Birden fazla limtter aynı dosyadan çıkar
// normalde sunucunun session kullanır. rate-limit işlemleri için
// Canlı sistemlerde redis üzerinde tutmamız önerilir.
module.exports = {postListLimiter, postDetailLimiter};
