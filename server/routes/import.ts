import { Router } from 'express';
import tasks from '../mock/import/crawlTaskInfoMockData.json';

const router = Router();

router.get('/info', (_, res) => {
  res.json({
    code: 200,
    msg: 'Success',
    data: tasks
  });
});

export default router;
