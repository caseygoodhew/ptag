'use strict';
Pixate.Assert = function() {
	
	var _assertions = [];
	
	var _baseTypes = {};
	var _primitiveBaseTypes = {};
	Pixate.each(['x', 1, true, undefined], function(x) { _baseTypes[typeof(x)] = _primitiveBaseTypes[typeof(x)] = true; });
	Pixate.each([{}, [], function(){}], function(x) { _baseTypes[typeof(x)] = true; });

	var _interactionTypes = {};
	for (var x in Pixate.Api.Types.Interaction) {
		_interactionTypes[Pixate.Api.Types.Interaction[x].type] = true;
	}

	var selectBestPropertySet = function(propertySetItem, context) {
		if (!Pixate.isArray(propertySetItem)) {
			return propertySetItem;
		}

		var scores = [];

		Pixate.each(propertySetItem, function(o, i) {
			var result = { forType: 0, forAnimationMode: 0, index: i };

			if (o.forType) {
				var forTypeMap = Pixate.map(o.forType);
				result.forType = forTypeMap[context.type] ? 1 : -1;
			}

			if (o.forAnimationMode) {
				var forAnimationModeMap = Pixate.map(o.forAnimationMode);
				result.forAnimationMode = forAnimationModeMap[context.animates] ? 1 : -1;
			}

			scores.push(result);
		});

		scores.sort(function(a, b) {	

			var aOnTop = -1;
			var bOnTop = 1;
			var noOption = 0;

			if (a.forType === 1 && a.forAnimationMode === 1) {
				return aOnTop;
			}

			if (b.forType === 1 && b.forAnimationMode === 1) {
				return bOnTop;
			}

			if (a.forType === 1 && a.forAnimationMode === 0) {
				return aOnTop;
			}

			if (b.forType === 1 && b.forAnimationMode === 0) {
				return bOnTop;
			}

			if (a.forType === 0 && a.forAnimationMode === 1) {
				return aOnTop;
			}

			if (b.forType === 0 && b.forAnimationMode === 1) {
				return bOnTop;
			}

			if (a.forType === 0 && a.forAnimationMode === 0) {
				return aOnTop;
			}

			if (b.forType === 0 && b.forAnimationMode === 0) {
				return bOnTop;
			}

			return noOption;
		});

		return propertySetItem[scores[0].index];
	}

	var assertPropertySet = function(propertySetName, attribute, propertySetX, configX, subargument, context) {

		var aggregateResult = true;

		if (!propertySetX) {
					
			// don't aggregate warn
			this.warn(false, subargument, 'Attribute "'+x+'" is not defined in property set "'+propertySetName+'"');
		
		} else if (propertySetX.readOnly) {
		
			aggregateResult = this.fail(false, subargument, 'Attribute "'+x+'" in property set "'+propertySetName+'" is read only') && aggregateResult;
		
		} else if (propertySetX.forType && !Pixate.contains(propertySetX.forType, (context||{}).type)) {

			aggregateResult = this.fail(false, subargument, 'Attribute "'+x+'" in property set "'+propertySetName+'" of type "'+(context||{}).type+'" is not in forType ('+propertySetX.forType.join()+')') && aggregateResult;

		} else if (propertySetX.forInteraction && !Pixate.contains(propertySetX.forInteraction, Pixate.resolveInteractionEvent((context||{ basedOn: {} }).basedOn.event).interaction.type)) {

			aggregateResult = this.fail(false, subargument, 'Attribute "'+x+'" in property set "'+propertySetName+'" of type "'+(context||{}).type+'" is not in forInteraction ('+propertySetX.forInteraction.join()+')') && aggregateResult;

		} else if (propertySetX.forAnimationMode && !Pixate.contains(propertySetX.forAnimationMode, (context||{}).animates)) {

			aggregateResult = this.fail(false, subargument, 'Attribute "'+x+'" in property set "'+propertySetName+'" of type "'+(context||{}).animates+'" is not in forAnimationMode ('+propertySetX.forAnimationMode.join()+')') && aggregateResult;

		} else {

			if (propertySetX.validator) {
				var result = propertySetX.validator(configX);

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
			} else if (_primitiveBaseTypes[propertySetX.type]) {
			
				var result = this.fail(typeof configX === propertySetX.type, subargument, 'Unexpected value type');
				aggregateResult = result && aggregateResult;

				if (result && propertySetX.min !== undefined) {
					aggregateResult = this.fail(!(configX < propertySetX.min), subargument, 'Value ' + configX + ' is less than min value of ' + propertySetX.min) && aggregateResult;
				} 

				if (result && propertySetX.max !== undefined) {
					aggregateResult = this.fail(!(configX > propertySetX.max), subargument, 'Value ' + configX + ' is greater than max value of ' + propertySetX.max) && aggregateResult;
				}
			
			} else if (propertySetX.type === 'Asset') {

				aggregateResult = this.isAsset(configX, subargument) && aggregateResult;	

			} else if (!_primitiveBaseTypes[propertySetX.type]) {
							
				aggregateResult = this.isEnumValue(propertySetX.type, configX, subargument, 'Attribute "'+x+'" ('+configX+') does not map to valid Pixate.'+propertySetX.type+' value') && aggregateResult;
			}
		}

		return aggregateResult;
	}

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
			
			return this.fail(
				interaction && 
				interaction.id && 
				_interactionTypes[interaction.type], 
				argument, 
				'Argument is not an interaction.')
		},

		isInteractionType: function(type, argument) {
			return this.fail(!!Pixate.resolveInteractionType(type), argument, 'Argument is not an interaction type.')
		},

		isAnimation: function(animation, argument) {
			return this.fail(!!Pixate.resolveAnimationType(animation.type), argument, 'Argument is not an animation.');
		},

		isConfig: function(propertySetName, context, config, argument, exclude) {
			if (!config || typeof config !== 'object' || Pixate.isArray(config)) {
				return this.fail(false, argument, 'Argument must be a pure object');
			}

			var exclude = Pixate.map(exclude);
			var propertySet = Pixate.Api.Properties[propertySetName];
			var aggregateResult = true;

			for (var x in config) {
				if (!exclude[x]) {

					var subargument = argument + '["'+x+'"]';

					var propertySetX = selectBestPropertySet(propertySet[x], context);

					assertPropertySet.call(this, propertySetName, x, propertySetX, config[x], subargument, context);
				}
			}

			if (propertySetName === 'Interaction' && context.type === 'drag') {
				var enteringDangerZone = config.min !== undefined || 
										 config.max !== undefined || 
										 config.stretchMin !== undefined || 
										 config.stretchMax !== undefined || 
										 config.minReferenceEdge !== undefined || 
										 config.maxReferenceEdge !== undefined;
				
				if (enteringDangerZone) {
					var configHasConcreteDirection = config.direction === Pixate.DragDirection.horizontal || config.direction === Pixate.DragDirection.vertical;
					var configHasNullifyingDirection = config.direction === Pixate.DragDirection.free;
					var contextHasConcreteDirection = context.direction === Pixate.DragDirection.horizontal || context.direction === Pixate.DragDirection.vertical;

					aggregateResult = this.fail(configHasConcreteDirection || (!configHasNullifyingDirection && contextHasConcreteDirection), 'direction', 'Direction must be set to horizontal or vertical when setting min/max/stretchMin/stretchMax/minReferenceEdge/maxReferenceEdge') && aggregateResult;
				}
			}

			if (propertySetName === 'Animation' && config.referenceEdge) {
				//if (config.referenceEdge === Pixate.Edge.top) { debugger; }
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

		basedOnIsValid: function(basedOn, argument) {

			if (!basedOn) {
				return this.fail(false, argument + '.basedOn', 'Attribute is not set')
			}

			if (typeof basedOn !== 'object') {
				return this.fail(false, argument + '.basedOn', 'Attribute is not an object')
			}

			var interactionEvent = Pixate.resolveInteractionEvent(basedOn.event || basedOn.basedOnEvent);
			var source = Pixate.Assets.findLayer(basedOn.source || basedOn.basedOnSource);

			var eventResult = this.fail(!!interactionEvent, argument + '.basedOn.event', 'Could not resolve interaction event');
			if (eventResult) { 
				eventResult = this.fail(interactionEvent.canAnimate !== false, argument + '.basedOn.event', 'Event ('+(interactionEvent.event.name||interactionEvent.event)+') cannot be used for animations');
			}

			var sourceResult = this.fail(!!source, argument + '.basedOn.source', 'Could not resolve source'); 
			if (sourceResult && eventResult) {
				sourceResult = this.fail(!!source.interactions[interactionEvent.interaction.type], argument + '.basedOn.source', 'Source layer does not have a '+interactionEvent.interaction.type+' interaction');
			}

			return eventResult && sourceResult;
		},

		hasAttributes: function(obj, argument, attributes) {

			var result = true;

			if (!obj) {
				result = this.fail(false, argument, 'Argument is not an object');
			}

			if (!attributes) {
				result = this.fail(false, argument, 'Attrributes are not defined');
			}

			if (result) {
				Pixate.each(attributes, function(attribute) {
					result = this.fail(!!obj[attribute], argument + '.' + attribute, 'Attribute is not set') && result;
				}, this);
			}

			return result;
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