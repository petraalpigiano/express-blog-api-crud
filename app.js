import express from "express";
import { posts, port } from "./data/db.js";
import postsRouter from "./routers/posts.js";

const app = express();
// ASSET STATICI
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Il server è in ascolto alla porta: ${port}`);
});
// ROUTER
app.use("/posts", postsRouter);

// app.get("/", (req, res) => {
//   res.send(posts);
// });
