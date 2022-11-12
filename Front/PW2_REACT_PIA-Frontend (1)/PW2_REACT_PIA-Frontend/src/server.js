const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/api', (req, res) => { //Line 9
  res.send({ express: {hola:"aaaa"},
              Monica:'ta muy wapa' }); //Line 10
}); //Line 1