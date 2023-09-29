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

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// İmport swaggerDocument from './swagger.json';

// routedan önce api-docs dosyasını tanıtalım

if (process.env.NODE_ENV === 'development') {
	const YAML = require('yamljs');
	const swaggerDocument = YAML.load('./swagger.yaml');
	const swaggerUi = require('swagger-ui-express');
	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}

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
