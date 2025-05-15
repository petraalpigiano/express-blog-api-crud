import { posts } from "../data/db.js";

function index(req, res) {
  const recipeFilter = req.query.recipe;
  //   res.json(posts);
  let filteredPost = posts;

  if (recipeFilter) {
    filteredPost = posts.filter(function (currentPost) {
      return currentPost.tags.includes(recipeFilter);
    });
  }
  res.json(filteredPost);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  //   res.send(`Ecco il post numero: ${id}`);
  const postId = posts.find((currentPost) => {
    const currentId = currentPost.id;
    return currentId === id;
  });

  if (!postId) {
    return res.status(404).json({
      message: "Post non trovato",
    });
  }

  res.json(postId);
}

function create(req, res) {
  // res.send("Ho creato un nuovo post");
  const newPost = req.body;
  res.json(newPost);
  console.log(newPost);
}

function update(req, res) {
  const id = req.params.id;
  res.send(`Ho modificato interamente il post numero: ${id}`);
}

function modify(req, res) {
  const id = req.params.id;
  res.send(`Ho modificato parzialmente il post numero: ${id}`);
}

function destroy(req, res) {
  const id = parseInt(req.params.id);
  //   res.send(`Ho eliminato il post numero: ${id}`);
  // RISPONDO CON LA LISTA DEI POST SENZA IL POSTO ELIMINATO
  //   res.json(
  //     posts.filter(function (currentPost) { // con filter fa piu sforzo computazionale che con splice
  //       const currentId = currentPost.id;
  //       return currentId !== id;
  //     })
  //   );
  // RISPONDO CON LA LISTA DEI POST MA USANDO SPLICE
  let postDeleted = [...posts]; // con questo elimina dalla deep copy e non dall'originale, ma nella realta modifichiamo l'originale
  const postId = posts.find((currentPost) => {
    const currentId = currentPost.id;
    return currentId === id;
  });

  if (!postId) {
    return res.status(404).json({
      message: "Post non trovato",
    });
  }
  postDeleted.splice(posts.indexOf(postId), 1);
  res.json(postDeleted);
  // STAMPO NEL TERMINALE LA LISTA AGGIORNATA
  //   console.log(
  //     posts.filter(function (currentPost) {
  //       const currentId = currentPost.id;
  //       return currentId !== id;
  //     })
  //   );
  //   //   RISPONDO CON STATO 204
  //   res.sendStatus(204);
}

export { index, show, create, update, modify, destroy };
