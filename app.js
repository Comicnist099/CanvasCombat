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
  res.send("Estas en la pagina de servicios")

})

app.listen(port, () => {
  console.log(`Example app listening on port`, port)
})


app.use((req,res,next) =>{
  res.status(404).sendFile(__dirname + "/public/404.html");
})
