import { Router } from 'express';

const router = Router();

router.get('/api/user', (req, res, next) => {
  return res.status(200).json({
    message: 'Hey',
  });
});

export default router;
