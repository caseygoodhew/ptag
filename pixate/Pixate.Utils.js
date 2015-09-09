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

	include: function(source, paramInclude) {

		var include = {};

		for (var i = 0; i < paramInclude.length; i++) {
			include[paramInclude[i]] = true;
		}

		var result = {};

		for (var x in source) {
			if (include[x]) {
				result[x] = source[x];
			}
		}

		return result;
	},

	exclude: function(source, paramExclude) {

		var exclude = {};

		for (var i = 0; i < paramExclude.length; i++) {
			exclude[paramExclude[i]] = true;
		}

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
			var result = fn.call(scope||array, array[i], i);

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

		/*Pixate.each(parameterValues, function(value, index) {
			var valueType = typeof value;
			
			if (value === undefined) {
				values.push('undefined');
			} else if (value === null) {
				values.push('null');
			} else if (valueType === 'string') {
				values.push('"'+value+'"');
			} else if (valueType === 'boolean') {
				values.push(value);
			} else if (valueType === 'number') {
				values.push(value);
			} else {
				Pixate.fail('EVAL PARAMETER VALUE (INDEX '+index+') IS UNSUPPORTED TYPE ' + valueType.toUpperCase());
				hasErrors = true;
			}
		});
		*/
		if (hasErrors) {
			return;
		}

		//return eval('(function('+names.join(', ')+') { return '+expression+'; })('+values.join(', ')+')');
		
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

	resolveInteraction: function(type) {


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

	contains: function(array, value) {
		var found = false;
		
		if (Pixate.isArray(array)) {
			for (var i = 0; !found && i < array.length; i++) {
				found = array[i] === value;
			}
		}
		
		return found;
	}
};

Pixate.Utils.apply(Pixate, Pixate.Utils);
