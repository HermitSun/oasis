import express from 'express';
import { NuxtConfigurationServerMiddleware } from '@nuxt/types/config/server-middleware';
// 因为服务端不走webpack，所以只能使用相对路径
import basicSearchMockData from './mock/search/basicSearchMockData';
import searchFilterMockData from './mock/search/searchFilterMockData';
import affiliationPortraitMockData from './mock/portrait/affiliation/affiliationPortraitMockData';
import affiliationPapersMockData from './mock/portrait/affiliation/affiliationPapersMockData';
import affiliationInterestMockData from './mock/portrait/affiliation/affiliationInterestMockData';

// 路由
import authors from './routes/authors';
import affiliations from './routes/affiliations';
import journals from './routes/journals';
import conferences from './routes/conferences';
import authorAdvancedRankingMockData from '~/server/mock/rankings/author/authorAdvancedRankingMockData';
import affiliationDetailRankingMockData from '~/server/mock/rankings/affiliation/affiliationDetailRankingMockData';
import affiliationAdvancedMockData from '~/server/mock/rankings/affiliation/affiliationAdvancedRankingMockData';
import authorDetailRankingMockData from '~/server/mock/rankings/author/authorDetailRankingMockData';

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

app.get('/rank/advanced/affiliation', (req, res) => {
  console.log(req.params);
  res.json(affiliationDetailRankingMockData);
});

app.get('/portrait/affiliation', (req, res) => {
  console.log(req.params);
  res.json(affiliationPortraitMockData);
});

app.get('/paper/affiliation', (req, res) => {
  console.log(req.params);
  res.json(affiliationPapersMockData);
});

app.get('/affiliation/interest', (req, res) => {
  console.log(req.params);
  res.json(affiliationInterestMockData);
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
