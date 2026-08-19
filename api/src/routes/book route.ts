
import {
  Router
} from "express";

import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook
} from "../controller/book controller";

const router = Router();

router.post(
  "/",
  createBook
);

router.get(
  "/",
  getBooks
);

router.get(
  "/:id",
  getBookById
);

router.patch(
  "/:id",
  updateBook
);

router.delete(
  "/:id",
  deleteBook
);

export default router;