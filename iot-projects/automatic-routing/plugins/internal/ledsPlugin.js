const resources = require('./../../resources/model');

let actuator
let model = resources.pi.actuators.leds;
let pluginName = resources.pi.actuators.leds[1].name + ", " + resources.pi.actuators.leds[2].name;

exports.start = function (params) {
	connectHardware();
	console.log("starting " + pluginName + " plugin");
};

// TODO 1: Complete the ledsPlugin!

function connectHardware(){
	const Gpio = require('onoff').Gpio
	actuator = {
		one : new Gpio(model[1].gpio, 'out'),
		two : new Gpio(model[2].gpio, 'out')
	}
}

exports.stop = function() {
	actuator.one.write(0)
	actuator.two.write(0)
	actuator.one.unexport()
	actuator.two.unexport()
}

exports.switchOnOff = {
	1: function (value) {
		Switch(value, one)
	},
	2: function (value, value) {
		Switch(value, two)
	}
}


function Switch(value, led) {
	actuator[led].write(value ? 1 : 0)
}
