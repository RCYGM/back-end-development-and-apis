let express = require("express");
const req = require("express/lib/request");
const res = require("express/lib/response");
let app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});
app.use("/public", express.static(__dirname + "/public"));

app.post("/name", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});

// Inicia un servidor Express
/*app.get("/", (req, res) => {
  res.send("Hello Express");
});
*/

// Sirve un archivo HTML
/*app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});*/

// Sirve recursos estáticos
/*app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});*/

// Sirve JSON en una ruta específica
/*app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});*/

// Usa el archivo .env
require("dotenv").config(); // Cargar variables de entorno
/*app.get("/json", (req, res) => {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});*/

//Implementa un Middleware de registro de peticiones a nivel raíz
/*app.use((req, res, next) => {
  const log = `${req.method} ${req.path} - ${req.ip}`; // Formatear cadena de registro
  console.log(log);
  next();
});

app.get("/json", (req, res) => {
  res.json({ message: "Hello json" });
});*/

//Encadenando Middlewares para crear un servidor horario
/* app.get(
  "/now",
  (req, res, next) => {
    req.time = new Date().toString();
    next();
  },
  (req, res) => {
    res.json({ time: req.time });
  }
);*/

// Obtén la entrada de parámetros de ruta del cliente
/*app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});*/

//Obtén la entrada de parámetros de consulta del cliente
/*app.get("/name", (req, res) => {
  const name = `${req.query.first} ${req.query.last}`;
  res.json({ name: name });
});*/

// Usa body-parser para analizar las peticiones POST
// const bodyParser = require("body-parser");
// app.use(bodyParser.urlencoded({ extended: false }));
/*app.post("/name", (req, res) => {
  const firstName = req.body.first; 
  const lastName = req.body.last; 
  const fullName = `${firstName} ${lastName}`; 

  res.json({ name: fullName });
});*/

// Obtén datos de las peticiones POST
/*const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const absolutePath = __dirname + "/views/index.html";
  res.sendFile(absolutePath);
});
app.use("/public", express.static(__dirname + "/public"));

app.post("/name", (req, res) => {
  const firstName = req.body.first;
  const lastName = req.body.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});*/
module.exports = app;
