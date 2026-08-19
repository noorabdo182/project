
import { Router } from 'express';

import {
  createBorrow,
  getBorrows,
  returnBook
} from '../controller/borrow controller';

const router = Router();

router.post(
  '/',
  createBorrow
);

router.get(
  '/',
  getBorrows
);

router.patch(
  '/:id/return',
  returnBook
);

export default router;