import { Router } from 'express';
import affiliations from '../mock/affiliations/affiliationsInfoMockData.json';

const router = Router();

router.get('/info', (req, res) => {
  if (req.query.page === '1') {
    res.json({
      code: 200,
      msg: 'Success',
      data: { affiliations: (affiliations as {}[]).slice(0, 5), size: 666 }
    });
  } else {
    res.json({
      code: 200,
      msg: 'Success',
      data: { affiliations: (affiliations as {}[]).slice(5), size: 666 }
    });
  }
});

router.put('/merge', (req, res) => {
  console.log(req.body);
  res.json({ code: 200, msg: 'Success' });
});

export default router;
