import express from 'express';
import { NuxtConfigurationServerMiddleware } from '@nuxt/types/config/server-middleware';
// 因为服务端不走webpack，所以只能使用相对路径
import basicSearchMockData from './mock/search/basicSearchMockData';
import searchFilterMockData from './mock/search/searchFilterMockData';
import affiliationPortraitMockData from './mock/portrait/affiliation/affiliationPortraitMockData';
import affiliationPapersMockData from './mock/portrait/affiliation/affiliationPapersMockData';
import affiliationInterestMockData from './mock/portrait/affiliation/affiliationInterestMockData';
import authorAdvancedRankingMockData from './mock/ranking/author/authorAdvancedRankingMockData';
import affiliationDetailRankingMockData from './mock/ranking/affiliation/affiliationDetailRankingMockData';
import affiliationAdvancedMockData from './mock/ranking/affiliation/affiliationAdvancedRankingMockData';
import authorDetailRankingMockData from './mock/ranking/author/authorDetailRankingMockData';
import authorPortraitMockData from './mock/portrait/author/authorPortraitMockData';
import keywordPortraitMockData from './mock/portrait/keyword/keywordPortraitMockData';
import conferencePortraitMockData from './mock/portrait/conference/conferencePortraitMockData';
import journalPortraitMockData from './mock/portrait/journal/journalPortraitMockData';
import journalInterestMockData from './mock/portrait/journal/journalInterestMockData';

// 路由
import authors from './routes/authors';
import affiliations from './routes/affiliations';
import journals from './routes/journals';
import conferences from './routes/conferences';

const app = express();

app.get('/echo/:what', (req, res) => {
  res.json(req.params);
});

app.get('/search/basic/mongo', (req, res) => {
  console.log(req.params);
  res.json(basicSearchMockData);
});

app.get('/search/basic/es', (_, res) => {
  res.json(basicSearchMockData);
});

app.get('/search/basic/filter', (req, res) => {
  console.log(req.params);
  res.json(searchFilterMockData);
});

app.get('/rank/advanced/author', (req, res) => {
  console.log(req.params);
  res.json(authorAdvancedRankingMockData);
});

app.get('/rank/detail/author', (req, res) => {
  console.log(req.params);
  res.json(authorDetailRankingMockData);
});

app.get('/rank/advanced/affiliation', (req, res) => {
  console.log(req.params);
  res.json(affiliationAdvancedMockData);
});

// 12
app.get('/rank/detail/affiliation', (req, res) => {
  console.log(req.params);
  res.json(affiliationDetailRankingMockData);
});

// 13
app.get('/portrait/author', (req, res) => {
  console.log(req.params);
  res.json(authorPortraitMockData);
});

// 14
app.get('/paper/author', (req, res) => {
  console.log(req.params);
  res.json(affiliationPapersMockData);
});

// 16
app.get('/portrait/affiliation', (req, res) => {
  console.log(req.params);
  res.json(affiliationPortraitMockData);
});

// 17
app.get('/paper/affiliation', (req, res) => {
  console.log(req.params);
  res.json(affiliationPapersMockData);
});

// 18
app.get('/affiliation/interest', (req, res) => {
  console.log(req.params);
  res.json(affiliationInterestMockData);
});

// 19
app.get('/rank/affiliation/author', (req, res) => {
  console.log(req.params);
  res.json(authorAdvancedRankingMockData);
});

// 20
app.get('/portrait/keyword', (req, res) => {
  console.log(req.params);
  res.json(keywordPortraitMockData);
});

// 21
app.get('/paper/keyword', (req, res) => {
  console.log(req.params);
  res.json(affiliationPapersMockData);
});

// 22
app.get('/portrait/conference', (req, res) => {
  console.log(req.params);
  res.json(conferencePortraitMockData);
});

// 23
app.get('/conference/interest', (req, res) => {
  console.log(req.params);
  res.json(journalInterestMockData);
});

// 24
app.get('/portrait/journal', (req, res) => {
  console.log(req.params);
  res.json(journalPortraitMockData);
});

// 25
app.get('/journal/interest', (req, res) => {
  console.log(req.params);
  res.json(journalInterestMockData);
});

// 管理员部分
// 作者信息管理
app.use('/authors', authors);
// 机构信息管理
app.use('/affiliations', affiliations);
// 期刊信息管理
app.use('/journals', journals);
// 会议信息管理
app.use('/conferences', conferences);
// 论文信息管理
app.use('/papers', conferences);

const expressMiddleware: NuxtConfigurationServerMiddleware = {
  path: '/test',
  handler: app
};

export default expressMiddleware;
