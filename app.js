const express = require('express');

// Env tanımlamaları express altında init edelim.
// yoksa uygulamada env dosyalarını geç okuma bu sebeple env değişkenler undefined olarak gelebiliyor.

// process.env environment değişkenlere bağlanmamısı sağlar
const dotenv = require('dotenv');
dotenv.config({path: `.env.${process.env.NODE_ENV.trim()}`});
// Console.log('JWT', process.env.JWT_KEY)

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const tokensRouter = require('./routes/tokens');
const cors = require('cors');
const {rateLimit} = require('express-rate-limit');

const app = express();

// GET ve POST defaultda cors üzerinden engellenmez.
// PUT DELETE isteklerini cors ile engelleyebiliriz.
// allowedHeaders ise client göndereceği headerlerı kısıtmamış olduk.
// Kısıtlanmamsı gereken Headers Authorization, Content-Type
app.use(cors({origin: 'http://127.0.0.1:5500', methods: ['GET', 'POST'], allowedHeaders: ['Content-Type', 'Authorization']}));

// global olarak tüm istekleri 1 dakida boyunca sadece 5 istek atmaya açtık
// 429 rate limiting status code
// const limiter = rateLimit({
// 	windowMs: 1000 * 60, // 1 dakikada
// 	limit: 5, // Request limit sayısı
// 	message:
// 		'Too many accounts created from this IP, please try again after an hour',
// 	standardHeaders: 'draft-7',
// 	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// Helmet Header sızıntısını engellemek için (X-Powered-By, XSS ataklarına karşı korumanın açık olmasına, HTS SSL sertifikası ile şifrelenmiş bir formatta istek atılmasını zorunlu hale getirme, Content Security Policy ayarlarını dikkat etmeliyiz.)
// JWT Access Token üzerinden güvenli haberleşme
// CSRF Cross Site Request Forgery CSRUF paket kullanımı
// API isteklerini limitleme rate limiting işlemleri
// Cors ayalarını yapmalıyız, Methods, Origins, Headers

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// İmport swaggerDocument from './swagger.json';

// routedan önce api-docs dosyasını tanıtalım

// if (process.env.NODE_ENV === 'development') {
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const swaggerUi = require('swagger-ui-express');
const {default: helmet} = require('helmet');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// }
// global olarak uygulandığında localdaki rate limit yapılarını global dosya eziyor.
// app.use() her istekte limitter check yaptığı için route dosyalarında özel uygulamalara ait limitter tanımlamaları eziliyor.
// app.use(limiter);
app.use(helmet());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/tokens', tokensRouter);

app.use((req, res, next) => {
	next(createError(404));
});

// Error handler
app.use((err, req, res, next) => {
	// Set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	if (err.name === 'UnauthorizedError') {
		res.status(401).send('invalid token...');
	} else {
		next(err);
	}

	// Render the error page
	res.status(err.status || 500);
});

module.exports = app;
