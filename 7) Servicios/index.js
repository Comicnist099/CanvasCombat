const express = require('express');
const routerApi = require('./routes/');
const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => res.send('Ruta principal'));
routerApi(app);
// eslint-disable-next-line no-console
app.listen(port, () => console.log('Mi puerto', port));
