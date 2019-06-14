const http = require('http');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;

const publicPath = path.join(__dirname, '../public');

var app = express();
var server = http.createServer(app);
app.use(express.static(publicPath))

server.listen(port, () => {
  console.log(`The app is on port ${port}`)
})
