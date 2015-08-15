'use strict';
Pixate.Assert = function() {
	
	var assertions = [];

	return {

		getAssertions: function(purge) {
			var result = [];
			Pixate.each(assertions, function(o) { result.push(o); });

			if (purge) {
				assertions = [];
			}

			return result;
		},

		isText: function(text, argument) {
			this.assert(typeof(text) === 'string', argument, 'Argument is not a string.');
		},

		isLayer: function(layer, argument) {
			this.assert(Pixate.Assets.isLayer(layer), argument, 'Argument is not a layer or layer is not registered.');
		},

		isAnimation: function(animation, argument) {
			this.assert(typeof(animation) === 'object' && animation.isAnimation, 'Argument is not an animation.');
		},

		assert: function(result, argument, message) {
			assertions.push({
				result: result,
				argument: argument,
				message: message
			});
		}
	}
}();