const express = require('express');
const router = express.Router();


const dibujo=('../models/dibujo');
//RUTAS WEB



router.get('/', (req, res) => {

  res.render("Dibujos_Dashboard", {
    DatosDibujos: [
      {
      id: "123",
      Nombre: "Homero",
      Propietario: "Monica",
      Dibujante: "Monica",
      Fecha_Publicación: "20/10/22",
      Team: "Azul"
    }]
  })
})



module.exports = router;
