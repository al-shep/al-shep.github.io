const express = require('express'),
	cors = require('cors');

let app = express()
app.use(cors())
app.get('/', function(req, res){
	res.send("You've hit the root")
}
app.get('/pi', function(req, res){
	res.sent("Entering gateway now...")
}

module.exports = app;
