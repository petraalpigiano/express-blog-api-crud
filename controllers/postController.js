import { posts } from "../data/db.js";

function index(req, res) {
  res.json(posts);
}

function show(req, res) {
  const id = parseInt(req.params.id);
  //   res.send(`Ecco il post numero: ${id}`);
  res.json(
    posts.find(function (currentPost) {
      const currentId = currentPost.id;
      return currentId === id;
    })
  );
}

function create(req, res) {
  res.send("Ho creato un nuovo post");
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
  //   RISPONDO CON LA LISTA DEI POST SENZA IL POSTO ELIMINATO
  //   res.json(
  //     posts.filter(function (currentPost) {
  //       const currentId = currentPost.id;
  //       return currentId !== id;
  //     })
  //   );
  // STAMPO NEL TERMINALE LA LISTA AGGIORNATA
  console.log(
    posts.filter(function (currentPost) {
      const currentId = currentPost.id;
      return currentId !== id;
    })
  );
  //   RISPONDO CON STATO 204
  res.sendStatus(204);
}

export { index, show, create, update, modify, destroy };
