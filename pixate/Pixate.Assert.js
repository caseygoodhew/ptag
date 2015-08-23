'use strict';
Pixate.Assert = function() {
	
	var _assertions = [];

	return {

		getAssertions: function(purge) {
			var result = [].concat(_assertions);
			
			if (purge) {
				_assertions = [];
			}

			return result;
		},

		isText: function(text, argument) {
			return this.assert(typeof(text) === 'string', argument, 'Argument is not a string.');
		},

		isLayer: function(layer, argument) {
			return this.assert(Pixate.Assets.isRegisteredLayer(layer), argument, 'Argument is not a layer or layer is not registered.');
		},

		isAnimation: function(animation, argument) {
			return this.assert(typeof(animation) === 'object' && animation.isAnimation, 'Argument is not an animation.');
		},

		isConfig: function(propertySet, config, argument) {
			if (!config || typeof config !== 'object' || Pixate.isArray(config)) {
				return this.assert(false, argument, 'Argument must be a pure object');
			}

			return this.assert(false, argument, 'isConfig IS NOT FULLY IMPLEMENTED');
		},

		assert: function(result, argument, message) {
			_assertions.push({
				result: result,
				argument: argument,
				message: message
			});

			return result;
		},

		aggregateAssertionResult: function(assertions) {
		
			var result = true;

			Pixate.each(assertions || _assertions, function(o) {
				result = result && o.result;
			});

			return result;
		}
	}
}();