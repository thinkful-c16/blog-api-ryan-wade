'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

const blogPostRouter = require('./blogPostRouter');
app.use(morgan('common'));

app.get('/', (req, res) => {
  console.log('Your get request worked');
  res.json('hey');
});

app.use('/blog-posts', blogPostRouter);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});