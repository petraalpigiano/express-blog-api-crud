import express from "express";
import { posts } from "../data/db.js";
const router = express.Router();

// INDEX
router.get("/", (req, res) => {
  //   res.send("Mostro tutti i post");
  res.json(posts);
});
// SHOW
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //   res.send(`Ecco il post numero: ${id}`);
  res.json(
    posts.find(function (currentPost) {
      const currentId = currentPost.id;
      return currentId === id;
    })
  );
});

// CREATE
router.post("/", (req, res) => {
  res.send("Ho creato un nuovo post");
});
// UPDATE
router.put("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Ho modificato interamente il post numero: ${id}`);
});
// MODIFY
router.patch("/:id", (req, res) => {
  const id = req.params.id;
  res.send(`Ho modificato parzialmente il post numero: ${id}`);
});
// DELETE
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  //   res.send(`Ho eliminato il post numero: ${id}`);
  res.json(
    posts.filter(function (currentPost) {
      const currentId = currentPost.id;
      return currentId !== id;
    })
  );
});

export default router;
