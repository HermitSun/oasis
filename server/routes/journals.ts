import { Router } from 'express';
import journals from '../mock/journals/journalsInfoMockData.json';

const router = Router();

router.get('/info', (req, res) => {
  if (Number(req.query.page) % 2 === 1) {
    res.json({
      code: 200,
      msg: 'Success',
      data: { journals: (journals as {}[]).slice(0, 5), size: 888 }
    });
  } else {
    res.json({
      code: 200,
      msg: 'Success',
      data: { journals: (journals as {}[]).slice(5), size: 888 }
    });
  }
});

router.put('/update', (req, res) => {
  console.log(req.body);
  res.json({ code: 200, msg: 'Success' });
});

export default router;
