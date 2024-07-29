import express from "express";

import {
  CREATE_PACKAGE,
  GET_PACKAGES,
  GET_CURIER_PACKAGES,
  GET_PACKAGE_BY_ID,
  UPDATE_PACKAGE_BY_ID,
  DELETE_PACKAGE_BY_ID,
} from "../controller/package.js";
import auth from "../middleware/auth.js";

const router = express.Router();
router.post("/packages", auth, CREATE_PACKAGE);

router.get("/packages", GET_PACKAGES);

router.get("/packages/curier/:curierId", GET_CURIER_PACKAGES);

router.get("/packages/:id", GET_PACKAGE_BY_ID);

router.put("/packages/:id", auth, UPDATE_PACKAGE_BY_ID);

router.delete("/packages/:id", auth, DELETE_PACKAGE_BY_ID);

export default router;
