//const sensorRoutes = require('./../routes/sensors');
const actuatorRoutes = require('./../routes/actuators'),
	converter = require('./../middleware/converter'),
	createRouter = require('./../routes/automate'),
	resources = require('./../resources/model'),
	bodyParser = require('body-parser');

const express = require('express'),
	cors = require('cors');

let app = express();
app.use(bodyParser.json())
app.use(cors());
//app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);

/*
app.get('/', function(req, res){
	res.send("You've hit the root");
});
app.get('/pi', function(req, res){
	res.send("Entering gateway now...");
});
*/

app.use('/', createRouter(resources))
app.use(converter())

module.exports = app;
