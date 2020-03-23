import express from 'express';
import { NuxtConfigurationServerMiddleware } from '@nuxt/types/config/server-middleware';
// 因为服务端不走webpack，所以只能使用相对路径
import basicSearchMockData from '../assets/mock/search/basicSearchMockData';
import searchFilterMockData from '../assets/mock/search/searchFilterMockData';

const app = express();

app.get('/echo/:what', (req, res) => {
  res.json(req.params);
});

app.get('/search/basic/mongo', (req, res) => {
  console.log(req.params);
  res.json(basicSearchMockData);
});

app.get('/search/basic/filter', (req, res) => {
  console.log(req.params);
  res.json(searchFilterMockData);
});
// const charts = require('./routes/charts');
// app.use(charts);

const expressMiddleware: NuxtConfigurationServerMiddleware = {
  path: '',
  handler: app
};

export default expressMiddleware;
