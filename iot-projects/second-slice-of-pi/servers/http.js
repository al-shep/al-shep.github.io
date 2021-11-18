const sensorRoutes = require('./../routes/sensors');
const actuatorRoutes = require('./../routes/actuators');
const converter = require('./../middleware/converter')

const bodyParser = require('body-parser'
app.use(bodyParser.json())

const express = require('express'),
	cors = require('cors');

let app = express();
app.use(cors());
app.use('/pi/sensors', sensorRoutes);
app.use('/pi/actuators', actuatorRoutes);

app.get('/', function(req, res){
	res.send("You've hit the root");
});
app.get('/pi', function(req, res){
	res.send("Entering gateway now...");
});

app.use(converter())

module.exports = app;
