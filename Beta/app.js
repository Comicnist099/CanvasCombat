
require('dotenv').config();
const express = require('express');
const cors =require('cors')
const res = require('express/lib/response');
const app = express();

const port = process.env.PORT||3000;
// getting-started.js

//Conectar a la base de datos
const mongoose = require('mongoose');
/*
const user='CanvasCombatAdmin';
const pass='YbgrF5tlRuiOo3WN';
const dbname='CanvasCombatDB'

const uri=`mongodb+srv://${user}:${pass}@cluster0.folwqmw.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(uri,
  {useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(()=>console.log('Se conecto A la base de datos'))
  .catch(e=>console.log(e))

*/
  //EJS
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

//Ruta raiz



app.use(cors());



app.use('/', require("./router/RutasWeb"));
app.use('/Dibujos', require("./router/RutasDashboard"));


app.use((req, res, next) => {
  res.status(404).render("404");
})

app.listen(port, () => {
  console.log(`Example app listening on port`, port)
})
