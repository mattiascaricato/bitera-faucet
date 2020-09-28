const compression = require('compression')
const express = require('express');
const path = require('path');
const app = express();

const port = 3000;

// Server static files from app folder
app.use(express.static(path.join(__dirname, '../app')));
app.use(compression());

// Serve web3 js from node_modules
//app.get('/web3.min.js', function(req, res) {
//  res.sendFile(`${__dirname}/node_modules/web3/dist/web3.min.js`);
//});

app.listen(port, () => console.log(`App listening on port ${port}!`));
