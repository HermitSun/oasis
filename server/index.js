import express from 'express';
const app = express();

app.get('/echo/:what', (req, res) => {
  res.json(req.params);
});

// const charts = require('./routes/charts');
// app.use(charts);

module.exports = {
  path: '/api',
  handler: app
};
