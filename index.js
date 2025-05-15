import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;
var blogs = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true}));


function addBlog(req, res, next) {
    // Crea diccionario y lo agrega al array blogs
    let blog = {
        titulo: req.body.titulo,
        contenido: req.body.contenido
    };
    blogs.push(blog);
    next();
}

app.get("/", (req, res) => {
    res.render("index.ejs", {blogs});
});

app.get("/edit", (req, res) => {
    res.render("edit.ejs", {blogs});
});

app.post("/createBlog", addBlog, (req, res) => {
    res.render("index.ejs", {blogs});
});

app.post("/editar", (req, res) => {
    const num = parseInt(req.body.numBlog);
    res.render("editar.ejs", {
        blog: blogs[num],
        numBlog: num
    });
});

app.post("/editarBlog", (req, res) => {
    const num = parseInt(req.body.numBlog);
    blogs[num].titulo = req.body.titulo;
    blogs[num].contenido = req.body.contenido;
    
    res.redirect("/");
});

app.post("/eliminar", (req, res) => {
    const num = parseInt(req.body.confirmacion);
    blogs.splice(num, 1);
    res.redirect("/edit");
})

app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}`);
});