import express from "express";
import { port } from "./data/db.js";
import postsRouter from "./routers/posts.js";

// .EXPRESS
const app = express();

// MIDDLEWARE PER ASSET STATICI
app.use(express.static("public"));
// MIDDLEWARE PER JSON
app.use(express.json());

// SERVER STA ASCOLTANDO
app.listen(port, () => {
  console.log(`Il server è in ascolto alla porta: ${port}`);
});

// POST ROUTER
app.use("/posts", postsRouter);
