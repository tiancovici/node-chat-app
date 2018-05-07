const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');
let port = process.env.PORT || 4200;
let app = express();

app.use(express.static(publicPath));

app.listen(port, ()=> {
  console.log(`Started on port ${port}`);
});