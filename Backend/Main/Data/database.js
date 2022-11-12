const mongoose = require('mongoose');
const URI = 'mongodb+srv://CanvasCombatAdmin:YbgrF5tlRuiOo3WN@cluster0.folwqmw.mongodb.net/test';

mongoose.connect(URI)
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;
