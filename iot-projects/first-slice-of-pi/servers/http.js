let sensorRoutes = require('./../routes/sensors')

const express = require('express'),
	cors = require('cors');

let app = express()
app.use(cors())
app.use('/pi/sensors', sensorRoutes)

app.get('/', function(req, res){
	res.send("You've hit the root")
})
app.get('/pi', function(req, res){
	res.send("Entering gateway now...")
})

module.exports = app;
