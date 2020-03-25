import { Router } from 'express';
import conferences from '../mock/conferences/conferencesInfoMockData.json';

const router = Router();

router.get('/info', (req, res) => {
  if (Number(req.query.page) % 2 === 1) {
    res.json({
      code: 200,
      msg: 'Success',
      data: { conferences: (conferences as {}[]).slice(0, 5), size: 999 }
    });
  } else {
    res.json({
      code: 200,
      msg: 'Success',
      data: { conferences: (conferences as {}[]).slice(5), size: 999 }
    });
  }
});

router.put('/update', (req, res) => {
  console.log(req.body);
  res.json({ code: 200, msg: 'Success' });
});

export default router;
