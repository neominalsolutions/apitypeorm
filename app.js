var express = require('express');

// env tanımlamaları express altında init edelim.
// yoksa uygulamada env dosyalarını geç okuma bu sebeple env değişkenler undefined olarak gelebiliyor.

// process.env environment değişkenlere bağlanmamısı sağlar
const dotenv = require('dotenv');
dotenv.config({path:`.env.${process.env.NODE_ENV.trim()}`});
// console.log('JWT', process.env.JWT_KEY)

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var createError = require('http-errors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var postsRouter = require('./routes/posts');
var tokensRouter = require('./routes/tokens');

if(process.env.NODE_ENV === 'development') {
  const YAML = require('yamljs');
  const swaggerDocument = YAML.load('./swagger.yaml');
  const swaggerUi = require('swagger-ui-express');
}


var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// import swaggerDocument from './swagger.json';

// routedan önce api-docs dosyasını tanıtalım

if(process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve,   swaggerUi.setup(swaggerDocument));
}

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/posts', postsRouter);
app.use('/api/tokens', tokensRouter);


app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  if (err.name === "UnauthorizedError") {
    res.status(401).send("invalid token...");
  } else {
    next(err);
  }

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
