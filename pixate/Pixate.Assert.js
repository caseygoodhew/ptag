'use strict';
Pixate.Assert = function() {
	
	var _assertions = [];

	var _baseTypes = {};
	var _primitiveBaseTypes = {};
	Pixate.each(['x', 1, true, undefined], function(x) { _baseTypes[typeof(x)] = _primitiveBaseTypes[typeof(x)] = true; });
	Pixate.each([{}, [], function(){}], function(x) { _baseTypes[typeof(x)] = true; });

	return {

		FAIL: 'fail',
		WARN: 'warn',

		getAssertions: function(purge) {
			var result = [].concat(_assertions);
			
			if (purge) {
				_assertions = [];
			}

			return result;
		},

		isText: function(text, argument) {
			return this.fail(typeof(text) === 'string', argument, 'Argument is not a string.');
		},

		isAsset: function(asset, argument) {
			return this.fail(true, argument, 'isAsset IS NOT IMPLMENETED', 'isAsset IS NOT IMPLMENETED');
		},

		isLayer: function(layer, argument) {
			return this.fail(Pixate.Assets.isRegisteredLayer(layer), argument, 'Argument is not a layer or layer is not registered.');
		},

		isInteraction: function(interaction, argument) {
			
			return this.fail(!!Pixate.resolveInteraction(interaction), argument, 'Argument is not an interaction.')
		},

		isAnimation: function(animation, argument) {
			return this.fail(typeof(animation) === 'object' && animation.isAnimation, 'Argument is not an animation.');
		},

		isConfig: function(propertySetName, context, config, argument) {
			if (!config || typeof config !== 'object' || Pixate.isArray(config)) {
				return this.fail(false, argument, 'Argument must be a pure object');
			}

			var propertySet = Pixate.Api.Properties[propertySetName];
			var aggregateResult = true;

			for (var x in config) {
				var subargument = argument + '["'+x+'"]';
				var attributeType = typeof config[x];

				if (!propertySet[x]) {
				
					// don't aggregate warn
					this.warn(false, subargument, 'Attribute "'+x+'" is not defined in property set "'+propertySetName+'"');
				
				} else if (propertySet[x].readOnly) {
				
					aggregateResult = this.fail(false, subargument, 'Attribute "'+x+'" in property set "'+propertySetName+'" is read only') && aggregateResult;
				
				} else if (propertySet[x].forType && !Pixate.contains(propertySet[x].forType, (context||{}).type)) {

					aggregateResult = this.fail(false, subargument, 'Attribute "'+x+'" in property set "'+propertySetName+'" of type "'+(context||{}).type+'" is not in forType ('+propertySet[x].forType.join()+')') && aggregateResult;

				} else {

					if (propertySet[x].validator) {
						var result = propertySet[x].validator(config[x]);

						if (result === true) {
							// do nothing
						} else if (result === false) {
							aggregateResult = this.fail(false, subargument, 'Invalid value') && aggregateResult;
						} else if (typeof result === 'string') {
							aggregateResult = this.fail(false, subargument, result) && aggregateResult;
						} else if (typeof result === 'object' && result.fail) {
							aggregateResult = this.fail(false, subargument, result.fail) && aggregateResult;
						} else if (typeof result === 'object' && result.warn) {
							this.warn(false, subargument, result.warn);
						} else {
							this.warn(false, subargument, 'Validitor was indeterminate');
						} 
					} else if (_primitiveBaseTypes[propertySet[x].type]) {
					
						var result = this.fail(typeof config[x] === propertySet[x].type, subargument, 'Unexpected value type');
						aggregateResult = result && aggregateResult;

						if (result && propertySet[x].min !== undefined) {
							this.warn(config[x] < propertySet[x].min, subargument, 'Value ' + config[x] + ' is less than min value of ' + propertySet[x].min);
						} 

						if (result && propertySet[x].max !== undefined) {
							this.warn(config[x] > propertySet[x].max, subargument, 'Value ' + config[x] + ' is greater than max value of ' + propertySet[x].max);
						}
					
					} else if (propertySet[x].type === 'Asset') {

						aggregateResult = this.isAsset(config[x], subargument) && aggregateResult;	

					} else if (!_primitiveBaseTypes[propertySet[x].type]) {
									
						aggregateResult = this.isEnumValue(propertySet[x].type, config[x], subargument, 'Attribute "'+x+'" ('+config[x]+') does not map to valid Pixate.'+propertySet[x].type+' value') && aggregateResult;
					}
				}
			}

			return aggregateResult;
		},

		isEnumValue: function(enumType, value, argument, message) {

			if (!Pixate[enumType]) {
				return this.fail(false, argument, 'EnumType Pixate["'+enumType+'"] is not defined.');
			}

			var enumMap = {};
			for (var x in Pixate[enumType]) {
				if (_primitiveBaseTypes[typeof Pixate[enumType][x]]) {
					enumMap[Pixate[enumType][x]] = x;
				}
			}

			return this.fail(enumMap[value], argument, message);
		},

		fail: function(result, argument, failMessage, successMessage) {
			return this.assert(result, argument, Pixate.Assert.FAIL, failMessage, successMessage);
		},

		warn: function(result, argument, failMessage, successMessage) {
			return this.assert(result, argument, Pixate.Assert.WARN, failMessage, successMessage);
		},

		assert: function(result, argument, failLevel, failMessage, successMessage) {
			_assertions.push({
				result: !!result,
				argument: argument,
				failLevel: failLevel,
				failMessage: failMessage,
				successMessage: successMessage
			});

			return result;
		},

		aggregateAssertionResult: function(assertions, minimumFailLevel) {
		
			var includeLevels = {};
			switch (minimumFailLevel) {
				case Pixate.Assert.WARN:
					includeLevels[Pixate.Assert.WARN] = true;
				default:
					includeLevels[Pixate.Assert.FAIL] = true;
			}
			
			var result = true;

			Pixate.each(assertions || _assertions, function(o) {
				if (includeLevels[o.failLevel]) {
					result = result && o.result;
				}
			});

			return result;
		}
	}
}();