'use strict';
Pixate.apply = function(target, source) {
	
	for (var x in source) {
		target[x] = source[x];
	}

	return target;
};

Pixate.apply(Pixate, {
	
	isArray: function(object) {
		return Object.prototype.toString.call(object) === '[object Array]';
	},

	exclude: function(source, paramExclude) {

		var exclude = {};

		for (var i = 1; i < arguments.length; i++) {
			exclude[arguments[i]] = true;
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
			fn.call(scope||array, array[i], i);
		}
	},

	getExecutor: function() {
		if (!this.executor) {
			
			var isPixateStudio = false;
			try 
			{
				isPixateStudio = !!eval('createLayer');
			}
			catch (exception) {}

			this.executor = isPixateStudio ? Pixate.Executor.Immediate : Pixate.Executor.Logger;
		}

		return this.executor;
	},

	setExecutor: function(executor) {
		switch (executor) {
			case Pixate.Executor.Logger:
			case 'logger':
				this.executor = Pixate.Executor.Logger;
				break;
			
			case Pixate.Executor.Immediate:
			case 'immediate':
				this.executor = Pixate.Executor.Immediate;
				break;
			
			default:
				this.executor = null;
		}
	}
});

