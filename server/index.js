import express from 'express';
import basicSearchMockData from '../assets/mock/basicSearchMockData';

const app = express();

app.get('/echo/:what', (req, res) => {
  res.json(req.params);
});

app.get('/search/basic/mongo', (req, res) => {
  console.log(req.params);
  res.json(basicSearchMockData);
});

// const charts = require('./routes/charts');
// app.use(charts);

module.exports = {
  path: '',
  handler: app
};
