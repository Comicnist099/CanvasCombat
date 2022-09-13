const express=require('express');
const router = express.Router();

//RUTAS WEB

router.get('/', (req, res) => {
  res.render('index',{titulo:"mi titulo dinámico"})
})


router.get('/servicios', (req, res) => {
  res.render('servicios',{TituloServicios:"ServiciosTitulo"})
})

module.exports=router;
