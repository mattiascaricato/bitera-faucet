const express = require('express');
const app = express();
const path = require('path');

const port = 3000;

// Server static files from app folder
app.use(express.static(path.join(__dirname, 'app')));

// Serve web3 js from node_modules
app.get('/web3.min.js', function(req, res) {
  res.sendFile(`${__dirname}/node_modules/web3/dist/web3.min.js`);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
