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

		isAnimation: function(animation, argument) {
			return this.fail(typeof(animation) === 'object' && animation.isAnimation, 'Argument is not an animation.');
		},

		isConfig: function(propertySetName, config, argument) {
			if (!config || typeof config !== 'object' || Pixate.isArray(config)) {
				return this.fail(false, argument, 'Argument must be a pure object');
			}

			var propertySet = Pixate.Properties[propertySetName];
			var aggregateResult = true;

			for (var x in config) {
				var subargument = argument + '["'+x+'"]';

				if (!propertySet[x]) {
				
					// don't aggregate warn
					this.warn(false, subargument, 'Attribute "'+x+'" is not defined in property set "'+propertySetName+'"');
				
				} else if (propertySet[x].readOnly) {
				
					aggregateResult = this.fail(false, subargument, 'Attribute "'+x+'" in property set "'+propertySetName+'" is read only') && aggregateResult;
				
				} else if (propertySet[x].type === 'Asset') {

					aggregateResult = this.isAsset(config[x], subargument) && aggregateResult;	

				} else if (_primitiveBaseTypes[propertySet[x].type]) {
				
					aggregateResult = this.fail(this.canTransform(config[x], propertySet[x].type), subargument, 'Attribute "'+x+'" is "'+(config[x] === null ? 'null' : typeof(config[x]))+'" - property set "'+propertySetName+'" expected "'+propertySet[x].type+'"') && aggregateResult;
				
				} else {
					
					aggregateResult = this.isEnumValue(propertySet[x].type, config[x], subargument, 'Attribute "'+x+'" ('+config[x]+') does not map to valid Pixate.'+propertySet[x].type+' value') && aggregateResult;
				}
			}

			return aggregateResult;
		},

		canTransform: function(from, toType) {
			
			var fromType = typeof from;

			var map = Pixate.apply({}, _primitiveBaseTypes);
			for (var x in map) { 
				map[x] = {}; 
				map[x][x] = true;
			}
			
			map.string.number = true;
			map.string[undefined] = false;
			map.string[null] = false;
			map.string[''] = false;
			
			if (!map[toType]) {
				return false;
			}

			if (map[toType][from] === false) {
				return false;
			}

			if (map[toType][fromType]) {
				return true;
			}

			if (map[toType][from] === true) {
				return true;
			}

			return false;
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