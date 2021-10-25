express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const bodyParser = require("body-parser");
const Post = require("./models/Post");

//config.bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Config.handlebars
// template Engine
app.engine("handlebars", handlebars({ defautLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  Post.findAll({ order: [["id", "DESC"]] }).then((posts) => {
    res.render("home", { post: posts });
  });
});

app.get("/cad", (req, res) => {
  res.render("formulario");
});

app.post("/add", (req, res) => {
  Post.create({
    titulo: req.body.titulo,
    conteudo: req.body.conteudo,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      res.send("Ocorreu um erro: " + err);
    });
});

app.get("/deletar/:id", (req, res) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() => {
      res.send("postagem deletada com sucesso");
    })
    .catch((err) => {
      res.send(`ERRO, essa postagem não existe: ${err}`);
    });
});

app.listen(8081, () => console.log("server Index rodando"));
