const express = require( 'express' );
var bodyParser = require('body-parser');
const path = require("path");
const app = express();
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
const publicDirectoryPath = path.join(__dirname, 'public');
app.use(express.static(publicDirectoryPath));
app.use(express.json());

app.get('/', ( req, res ) => {
    res.render( 'index' );
});

app.listen(5000, ()=>{
  console.log("Server is running on port 5000");
});