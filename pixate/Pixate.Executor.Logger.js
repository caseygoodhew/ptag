'use strict';
Pixate.Executor = Pixate.Executor || {};

Pixate.Executor.Logger = function() {

	var container = document.createElement('div');
	var count = 1;

	var formatArgument = function(argument) {
		if (Pixate.Assets.isLayer(argument)) {
			return 'Layer['+Pixate.Assets.getLayerName(argument)+']';
		}

		return argument;
	}

	var commandCount = 0;

	var log = function(command) {

		commandCount++;

		var commandBlockTarget = document.createElement('div');
		commandBlockTarget.className = 'command-block';
		
		var markup = [];
		markup.push('<div class="command">');
			
			markup.push('<span class="command-number">' + commandCount + '</span>');
			markup.push('<span class="command-name">' + command.command + '</span>');
			markup.push('<span class="command-bracket"> ( </span>');
			
			Pixate.each(Pixate.Api[command.command].parameterNames, function(parameterName, index) {
				if (index) {
					markup.push('<span class="command-comma">, </span>');
				}

				markup.push('<span class="command-argument">'+parameterName+'</span>');
			});
			
			markup.push('<span class="command-bracket"> )</span>');

			markup.push('<span class="command-comment"> // ');

				Pixate.each(command.arguments, function(argument, index) {
					if (index) {
						markup.push('<span class="command-comma">, </span>');
					}

					markup.push('<span class="command-argument">'+formatArgument(argument)+'</span>');
				});
			
			markup.push('</span>');					

		markup.push('</div>');

		markup.push('<div class="assertions">');

			var hasFailure = false;

			Pixate.each(command.assertions, function(assertion) {
				hasFailure = hasFailure || !assertion.result;
				
				markup.push('<div class="assertion' + (assertion.result ? '' : ' fail') + '">');
					markup.push('<span class="assertion-argument">' + assertion.argument + '</span>');
					markup.push('<span class="assertion-spacing"> - </span>');
					markup.push('<span class="assertion-message">' + (assertion.result ? 'OK' : assertion.message) + '</span>');
				markup.push('</div>')
			});

		markup.push('</div>');

		commandBlockTarget.innerHTML = markup.join('');

		container.appendChild(commandBlockTarget);
	}

	var layer = function(command) {
		switch (command.command) {
			case 'createLayer':
				return Pixate.Assets.findLayer(command.arguments[0]);
		}
	}

	return {
		
		addMessage: function(message) {
			var messageEl = document.createElement('div');
			messageEl.className = "message";
			messageEl.innerHTML = message;
			container.appendChild(messageEl);
		},

		output: function(target, purge) {
			var rebuild = '';

			if (purge) {
				commandCount = 0;
			} else {
				rebuild = container.innerHTML;
			}

			while (container.childNodes.length) {
				target.appendChild(container.firstChild);
			}

			container.innerHTML = rebuild;
		},

		executeMany: function(commands) {
			Pixate.each(commands, function(command) {
				command.result = this.executeOne(command);
			}, this);
		},

		executeOne: function(command) {
			log(command);

			switch (Pixate.Api[command.command].returnType) {
				case 'Layer':
				case 'Layer or null':
					return layer(command);
			} 
		}
	};
}();

