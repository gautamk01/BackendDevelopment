const express = require('express');

const app = express();
const morgan = require('morgan'); //This is third Party for middleware

//Middleware :- Req -> Middleware -> response
/** */
app.use(express.json()); //Middleware 1
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// parse the JSON data into a JavaScript object.
app.use(express.static(`${__dirname}/public`)); //Static file from public

app.use((req, res, next) => {
  //Middleware
  req.requestTime = new Date().toISOString();
  next();
});

const tourRouter = require('./Routes/tourRouter');
const userRouter = require('./Routes/userRouter');

//For User

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
