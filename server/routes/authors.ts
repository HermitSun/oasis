import { Router } from 'express';
import authors from '../mock/authors/authorsInfoMockData.json';

const router = Router();

router.get('/info', (req, res) => {
  if (req.query.page === '1') {
    res.json({
      code: 200,
      msg: 'Success',
      data: { authors: (authors as {}[]).slice(0, 5), size: 666 }
    });
  } else {
    res.json({
      code: 200,
      msg: 'Success',
      data: { authors: (authors as {}[]).slice(5), size: 666 }
    });
  }
});

router.put('/merge', (req, res) => {
  console.log(req.body);
  res.json({ code: 200, msg: 'Success' });
});

export default router;
