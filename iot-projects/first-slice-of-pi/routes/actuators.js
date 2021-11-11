const express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model');

router.route('/').get(function(res, req, next){
	res.send(resources.pi.actuators)
})
router.route('/leds').get(function(req, res, next){
	res.send(resources.pi.acuators.leds)
})
router.route('/leds/:id').get(function(req, res, next){
	res.send(resources.pi.actuator.leds[req.params.id])
})

module.exports = router;
