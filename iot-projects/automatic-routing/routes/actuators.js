const express = require('express'),
	router = express.Router(),
	resources = require('./../resources/model'),
	ledsPlugin = require('./../plugins/internal/ledsPlugin')

router.route('/leds/:id').put(function(req, res, next){
	let led = resources.pi.actuators.leds
	led.value = req.body.value
	req.result = led
	ledsPlugin.switchOnOff[req.params.id](req.body.value)
	next()
})

module.exports = router;
