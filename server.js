'use strict';

const express = require('express');
const morgan = require('morgan');

const app = express();

// const blogPostRouter = require('./blogPostRouter');
app.use(morgan('common'));

// app.use('/blog-posts', blogPostRouter);

app.get('/', (req, res) => {
  console.log('Your get request worked');
  res.json('hey');
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});