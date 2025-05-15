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
  let newId = 0;
  for (let i = 0; i < posts.length; i++) {
    newId += 1;
  }

  const newPost = {
    id: newId + 1,
    title: req.body.title,
    content: req.body.content,
    image: req.body.image,
    tags: req.body.tags,
  };
  posts.push(newPost);

  res.status(201).json(posts);
}

function update(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image, tags } = req.body;
  // res.send(`Ho modificato interamente il post numero: ${id}`);
  const postId = posts.find((currentPost) => {
    const currentId = currentPost.id;
    return currentId === id;
  });

  if (!postId) {
    return res.status(404).json({
      message: "Post non trovato",
    });
  }
  const updatedPost = { id, title, content, image, tags };

  posts.splice(posts.indexOf(postId), 1, updatedPost);
  res.json(posts);
}

function modify(req, res) {
  const id = parseInt(req.params.id);
  const { title, content, image, tags } = req.body;
  // res.send(`Ho modificato parzialmente il post numero: ${id}`);
  const post = posts.find((currentPost) => {
    const currentId = currentPost.id;
    return currentId === id;
  });

  if (!post) {
    return res.status(404).json({
      message: "Post non trovato",
    });
  }
  if (title) {
    post.title = req.body.title;
  }
  if (content) {
    post.content = req.body.content;
  }
  if (image) {
    post.image = req.body.image;
  }
  if (tags) {
    post.tags = req.body.tags;
  }
  res.json(posts);
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
