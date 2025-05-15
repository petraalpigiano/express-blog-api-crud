import { posts } from "../data/db.js";

// INDEX
function index(req, res) {
  // ex FILTRO L'INTERA LISTA CON 1 FILTRO
  const filterRecipe = req.query.recipe;
  //   res.json(posts);
  let filteredPost = posts;
  // ex SE IL FILTRO è PRESENTE RESTITUISCO I POST CHE RISPETTANO IL FILTRO
  if (filterRecipe) {
    filteredPost = posts.filter(function (currentPost) {
      return currentPost.tags.includes(filterRecipe);
    });
  }
  // ex RISPONDO CON TUTTI I POST O CON QUELLI FILTRATI
  res.json(filteredPost);
}
// SHOW
function show(req, res) {
  // ex PRENDO L'ID DALLA RICHIESTA
  const id = parseInt(req.params.id);
  //   res.send(`Ecco il post numero: ${id}`);
  // ex TROVO IL POST CON L'ID DELLA RICHIESTA
  const postFound = posts.find((currentPost) => {
    const currentId = currentPost.id;
    return currentId === id;
  });
  // ! SE NON TROVO IL POST
  if (!postFound) {
    return res.status(404).json({
      message: "Post non trovato",
    });
  }
  // ex RISPONDO CON IL POST CON L'ID RICHIESTO
  res.json(postFound);
}
// CREATE
function create(req, res) {
  // res.send("Ho creato un nuovo post");
  // ex CREO UN ID PER IL NUOVO POST
  let newId = 0;
  for (let i = 0; i < posts.length; i++) {
    newId += 1;
  }
  // ex CREO IL NUOVO POST CON I DATI DELLA RICHIESTA + NUOVO ID
  const newPost = {
    id: newId + 1,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  // ex INSERISCO IL NUOVO POST NEI POSTS
  posts.push(newPost);
  // ex RISPONDO CON 201 + LISTA DI TUTTI I POST
  res.status(201).json(posts);
}
// UPDATE
function update(req, res) {
  // ex PRENDO L'ID DALLA RICHIESTA
  const id = parseInt(req.params.id);
  // ex PRENDO I DATI DALLA RICHIESTA
  const { title, content, image, tags } = req.body;
  // res.send(`Ho modificato interamente il post numero: ${id}`);
  // ex TROVO IL POST CON L'ID DELLA RICHIESTA
  const postFound = posts.find((currentPost) => {
    const currentId = currentPost.id;
    return currentId === id;
  });
  // ! SE NON TROVO IL POST
  if (!postFound) {
    return res.status(404).json({
      message: "Post non trovato",
    });
  }
  // ! CONTROLLO SUI DATI DELLA RICHIESTA
  if (typeof title !== "string" || title.length < 3) {
    return res.status(400).json({
      message: "Titolo non corretto",
    });
  }
  if (typeof content !== "string" || content.length < 3) {
    return res.status(400).json({
      message: "Contenuto non corretto",
    });
  }
  if (!Array.isArray(tags)) {
    return res.status(400).json({
      message: "Deve essere un array",
    });
  }
  // ex MODIFICO COMPLETAMENTE I DATI DEL VECCHIO POST ECCETTO L'ID
  const updatedPost = { id, title, content, image, tags };
  // ex ELIMINO IL VECCHIO POST E INSERISCO IL NUOVO
  posts.splice(posts.indexOf(postFound), 1, updatedPost);
  // ex RISPONDO CON LA LISTA DEI POST
  res.json(posts);
}
// MODIFY
function modify(req, res) {
  // ex PRENDO L'ID DALLA RICHIESTA
  const id = parseInt(req.params.id);
  // ex PRENDO I DATI DALLA RICHIESTA
  const { title, content, image, tags } = req.body;
  // res.send(`Ho modificato parzialmente il post numero: ${id}`);
  // ex TROVO IL POST CON L'ID DELLA RICHIESTA
  const postFound = posts.find((currentPost) => {
    const currentId = currentPost.id;
    return currentId === id;
  });
  // ! SE NON TROVO IL POST
  if (!postFound) {
    return res.status(404).json({
      message: "Post non trovato",
    });
  }
  // ex VERIFICO SE IL DATO ESISTE E IN CASO RIASSEGNO IL VALORE
  if (title) {
    postFound.title = req.body.title;
  }
  if (content) {
    postFound.content = req.body.content;
  }
  if (image) {
    postFound.image = req.body.image;
  }
  if (tags) {
    postFound.tags = req.body.tags;
  }
  // ex RISPONDO CON LA LISTA DEI POST
  res.json(posts);
}
// DELETE
function destroy(req, res) {
  // ex PRENDO L'ID DALLA RICHIESTA
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
  // ex TROVO IL POST CON L'ID DELLA RICHIESTA
  const postFound = posts.find((currentPost) => {
    const currentId = currentPost.id;
    return currentId === id;
  });
  // ! SE NON TROVO IL POST
  if (!postFound) {
    return res.status(404).json({
      message: "Post non trovato",
    });
  }
  // ex ELIMINO IL POST
  postDeleted.splice(posts.indexOf(postFound), 1);
  // ex RISPONDO CON LA LISTA DI POST
  res.json(postDeleted);
  // STAMPO NEL TERMINALE LA LISTA AGGIORNATA
  //   console.log(
  //     posts.filter(function (currentPost) {
  //       const currentId = currentPost.id;
  //       return currentId !== id;
  //     })
  //   );
  //   RISPONDO CON STATO 204
  //   res.sendStatus(204);
}

export { index, show, create, update, modify, destroy };
