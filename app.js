const express = require('express');
const res = require('express/lib/response');
const app = express()
const port = 3000

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
  res.render('index',{titulo:"mi titulo dinámico"})
})


app.get('/servicios', (req, res) => {
  res.render('servicios',{TituloServicios:"ServiciosTitulo"})
})




app.use((req,res,next) =>{
  res.status(404).render("404");
})

app.listen(port, () => {
  console.log(`Example app listening on port`, port)
})



