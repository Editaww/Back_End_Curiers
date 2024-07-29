import express from "express";

import {
  LOGIN,
  SIGN_UP,
  GET_CURIERS,
  GET_CURIER_BY_ID,
  DELETE_CURIER_BY_ID,
} from "../controller/curier.js";

const router = express.Router();
router.post("/signup", SIGN_UP);
router.post("/login", LOGIN);
router.get("/curiers", GET_CURIERS);
router.get("/curiers/:id", GET_CURIER_BY_ID);
router.delete("/curiers/:id", DELETE_CURIER_BY_ID);

export default router;
