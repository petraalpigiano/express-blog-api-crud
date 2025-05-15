import express from "express";
import {
  index,
  show,
  create,
  update,
  modify,
  destroy,
} from "../controllers/postController.js";

// ROUTER
const router = express.Router();

// VARIE ROUTE
// INDEX
router.get("/", index);
// SHOW
router.get("/:id", show);
// CREATE
router.post("/", create);
// UPDATE
router.put("/:id", update);
// MODIFY
router.patch("/:id", modify);
// DELETE
router.delete("/:id", destroy);

export default router;
