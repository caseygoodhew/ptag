'use strict';

Pixate.Utils = {
	apply: function(target, source) {
		
		for (var x in source) {
			target[x] = source[x];
		}

		return target;
	},

	isArray: function(object) {
		return Object.prototype.toString.call(object) === '[object Array]';
	},

	map: function(params) {
		var map = {};

		Pixate.each(params, function(p) {
			map[p] = true;
		});

		return map;
	},

	toAttributeArray: function(obj, func, scope) {
		func = func || function(obj, attr, value) { return value; }

		var result = [];
		for (var attr in obj) {
			result.push(func.call(scope || this, obj, attr, obj[attr]));
		}

		return result;
	},

	include: function(source, paramInclude) {

		var include = Pixate.map(paramInclude);

		var result = {};

		for (var x in source) {
			if (include[x]) {
				result[x] = source[x];
			}
		}

		return result;
	},

	exclude: function(source, paramExclude) {

		var exclude = Pixate.map(paramExclude);

		var result = {};

		for (var x in source) {
			if (!exclude[x]) {
				result[x] = source[x];
			}
		}

		return result;
	},

	each: function(array, fn, scope) {
		
		array = array == null ? [] : Pixate.isArray(array) ? array : [array];

		for (var i = 0; i < array.length; i++) {
			var result = fn.call(scope||array, array[i], i, array);

			if (result !== undefined) {
				return result;
			}
		}
	},

	isPixateStudio: function() {
		var isPixateStudio = false;
		try 
		{
			isPixateStudio = !!Pixate.eval('createLayer');
		}
		catch (exception) {}

		return isPixateStudio;
	},

	getExecutor: function() {
		if (!this.executor) {
			
			this.executor = this.isPixateStudio() ? Pixate.Executor.Immediate : Pixate.Executor.Inspector;
		}

		return this.executor;
	},

	setExecutor: function(executor) {
		switch (executor) {
			case Pixate.Executor.Inspector:
			case 'inspector':
				this.executor = Pixate.Executor.Inspector;
				break;
			
			case Pixate.Executor.Immediate:
			case 'immediate':
				this.executor = Pixate.Executor.Immediate;
				break;
			
			default:
				this.executor = null;
		}
	},

	fail: function(message) {
		if (!this.isPixateStudio()) {
			Pixate.log('<span class="fail">'+message+'</span>');
		} else {
			Pixate.log('FAIL: ' + message);
		}
	},

	log: function(message, noConsole) {
		if (!this.isPixateStudio()) {
			Pixate.CommandLogger.addMessage(message);
		} else if (!noConsole) {
			console.log(message);
		}
	},

	important: function(message) {
		if (this.isPixateStudio()) {
			Pixate.log('*** ' + message + ' ***');
		} else {
			Pixate.log('<span class="important">'+message+'</span>');
		}	
	},

	eval: function(expression, parameterNames, parameterValues) {
		if (typeof expression !== 'string') {
			Pixate.fail('EVAL EXPRESSION IS NOT A STRING');
			return;
		}

		var hasErrors = false;
		var names = [];
		var values = [];

		Pixate.each(parameterNames, function(name, index) {
			if (typeof name !== 'string') {
				Pixate.fail('EVAL PARAMETER NAME (INDEX '+index+') IS NOT A STRING');
				hasErrors = true;
			}

			names.push(name);
		});

		if (hasErrors) {
			return;
		}

		return function() { return eval('(function('+names.join(', ')+') { return '+expression+'; }).apply(this, this)'); }.call(parameterValues);
	},

	delay: function(interval, func, args) {
		setTimeout(function() { 
			if (Pixate.isArray(args)) {
				func.apply(this, args);
			} else {
				func.call(this, args);
			}
		}, interval);
	},

	id: function() {
		var hexMap = ['0', '1', '2', '3', '4', '5', '6', '7', '8', 'a', 'b', 'c', 'd', 'e', 'f']; 
		
		var result = [];  
		for (var i = 0; i < 20; i++) {  
			result.push(hexMap[Math.floor(Math.random() * hexMap.length)]); 
		}  
	
		return result.join('');  
	}, 

	resolveInteractionType: function(type) {

		if (typeof type === 'string') {
			if (Pixate.Api.Types.Interaction[type]) {
				return Pixate.Api.Types.Interaction[type];
			} else {
				for (var x in Pixate.Api.Types.Interaction) {
					if (type === Pixate.Api.Types.Interaction[x].type) {
						return Pixate.Api.Types.Interaction[x];
					}
				}
			}
		} else if (typeof type === 'object') {
			for (var x in Pixate.Api.Types.Interaction) {
				if (type === Pixate.Api.Types.Interaction[x]) {
					return type;
				}
			}
		}
	},

	resolveInteractionEvent: function(event) {
		if (typeof event !== 'string') {
			return;
		}

		for (var type in Pixate.Api.Types.Interaction) {
			for (var x in Pixate.Api.Types.Interaction[type].events) {
				
				var interactionEvent = Pixate.Api.Types.Interaction[type].events[x];
				
				if (interactionEvent === event || interactionEvent.name === event) {
					return { 
						interaction: Pixate.Api.Types.Interaction[type], 
						event: Pixate.Api.Types.Interaction[type].events[x], 
						canAnimate: interactionEvent.canAnimate !== false 
					};
				}
			}
		}
	},

	resolveAnimationType: function(type) {

		if (typeof type === 'string') {
			if (Pixate.Api.Types.Animation[type]) {
				return Pixate.Api.Types.Animation[type];
			} else {
				for (var x in Pixate.Api.Types.Animation) {
					if (type === Pixate.Api.Types.Animation[x].type) {
						return Pixate.Api.Types.Animation[x];
					}
				}
			}
		} else if (typeof type === 'object') {
			for (var x in Pixate.Api.Types.Animation) {
				if (type === Pixate.Api.Types.Animation[x]) {
					return type;
				}
			}
		}
	},

	contains: function(array, value) {
		var found = false;
		
		if (Pixate.isArray(array)) {
			for (var i = 0; !found && i < array.length; i++) {
				found = array[i] === value;
			}
		}
		
		return found;
	},

	isEnumValue: function(_enum, value) {
		for (var x in _enum) {
			if (_enum[x] === value) {
				return true;
			}
		}

		return false;
	},

	basedOn: function(source, event) {
		return { basedOn: { source: source, event: event } };
	}
};

Pixate.Utils.apply(Pixate, Pixate.Utils);
