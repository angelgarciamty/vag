//cargar dependencias
const express = require("express");
const cors = require('cors');
const db = require("./db");
const app = express();
const PORT = 3002;

// cargar rutas de la API
const rutasutils=require("./utils/rutas-utils.js");
const routes=require("./network/routes");
require('dotenv').config();

db("mongodb://localhost:27017/prueba");

app.use(cors({
    origin:"*",
}));

app.use(express.static('public'));

routes(app);

//iniciar servidor
app.listen(PORT, () => console.log("Servidor iniciado en el puerto:" + PORT));
