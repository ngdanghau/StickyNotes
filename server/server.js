require('dotenv').config();
var express = require('express'),
  app = express(),
  port = process.env.PORT,
  mongoose = require('mongoose'),
  Task = require('./api/models/stickyNotesModel'),
  bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
const options = { useMongoClient: true };

var url = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
if(process.env.DB_USER && process.env.DB_PASS)
var url = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;
mongoose.connect(url, options)


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/stickyNotesRoutes');
routes(app);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Sticky Notes RESTful API server started on: ' + port);
