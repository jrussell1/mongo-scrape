// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var expressHandlebars = require("express-handlebars");
var bodyParser = require("body-parser");
//Define port
var PORT = process.env.PORT || 3000;

var app = express();

var router = express.Router();


//require routes 
require("./config/routes")(router);

app.use(express.static(__dirname + "/public"));

//connect handlebars
app.engine("handlebars", expressHandlebars({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//use bodyparser
app.use(bodyParser.urlencoded({
  extended: false
}));

//every request go through middleware
app.use(router);

//if depoloyed use deployed DB - otherwise local host
var db = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//connect mongoose to db
mongoose.connect(db, function(error) {
  if (error) {
    console.log(error);
  }
  else {
    console.log("mogoose connection is successful");
  }
});
//listen on port 3000
app.listen(PORT, function() {
  console.log("Listening on port:" + PORT);
});