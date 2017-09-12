const path = require('path');
const express = require('express');

//better way of specifying path
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3000;
var app = express();

//setting up static directory
app.use(express.static(publicPath));

app.listen(port,()=>{
  console.log("Server is up on ", port);
});
