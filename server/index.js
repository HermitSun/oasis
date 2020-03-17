import express from 'express';
import basicSearchMockData from '../assets/mock/search/basicSearchMockData.ts';
import searchFilterMockData from '../assets/mock/search/searchFilterMockData.ts';

const app = express();

app.get('/echo/:what', (req, res) => {
  res.json(req.params);
});

app.get('/search/basic/mongo', (res) => {
  res.json(basicSearchMockData);
});

app.get('/search/basic/filter', (res) => {
  res.json(searchFilterMockData);
});
// const charts = require('./routes/charts');
// app.use(charts);

module.exports = {
  path: '',
  handler: app
};
