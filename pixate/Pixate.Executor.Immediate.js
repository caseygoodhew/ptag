'use strict';
Pixate.Executor = Pixate.Executor || {};

Pixate.Executor.Immediate = function(config) {
	return {
		executeMany: function(commands) {
			Pixate.each(commands, function(command) {
				command.result = this.executeOne(command);
			}, this);
		},

		executeOne: function(command) {
			var func = Pixate.Api[command.command].custom || eval(command.command);
			command.result = func.apply(this, command.arguments);
			return command.result;
		}
	}
}();
