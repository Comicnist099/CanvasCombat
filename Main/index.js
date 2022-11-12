if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const routerApi = require('./routes');
const morgan = require('morgan');
const path=require('path');
const cors = require('cors');
const app = express();
const port = 5000;
const { mongoose } = require('./Data/database');
const bodyParser = require('body-parser');



app.use(bodyParser.json({limit: '999mb'})); //UTILIZAMOS JSON COMO FORMATO DE DATOS 
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cors());
//ejecuta comandos de la consola para ver las llamada de datos
app.use(morgan('dev'));
const {
  logErrors,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');

/*
app.use(
  express.json({
    extended: false, // permite codificar matrices y objetos enriquecidos en formato codificado en url
  })
);*/

app.use( express.json());

routerApi(app);
//app.use('/api',require('./routes/index'));
const hola={hola:"hola"};
app.get('/api', (req,res)=>{
  res.json(hola)
})
//statics screen
//app.use(express.static(path.join(__dirname, 'src/public')));



//statics


//routerApi(app);
//ruta

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
// eslint-disable-next-line no-console
app.listen(port, () => console.log('Mi puerto', port));
