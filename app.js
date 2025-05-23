import express from "express";
import { port } from "./data/db.js";
import postsRouter from "./routers/posts.js";
import errorHandler from "./middlewares/errorHandler.js";
import notFoundHandler from "./middlewares/notFoundHandler.js";

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

// MIDDLEWARE PER LA GESTIONE DEGLI ERRORI DEL SERVER
app.use(errorHandler);
// MIDDLEWARE PER LA GESTIONE DELLE ROTTE NON REGISTRATE
app.use(notFoundHandler);
