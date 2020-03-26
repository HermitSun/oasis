import { Router } from 'express';

const router = Router();

router.put('/update', (req, res) => {
  console.log(req.body);
  res.json({ code: 200, msg: 'Success' });
});

export default router;
