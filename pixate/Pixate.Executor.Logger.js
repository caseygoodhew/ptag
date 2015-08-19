'use strict';
Pixate.Executor = Pixate.Executor || {};

Pixate.Executor.Logger = function() {

	var container = document.createElement('div');
	var count = 1;

	var formatArgument = function(argument) {
		var markup = [];

		switch (typeof argument) {
			case 'object': 
				if (argument === null) {
					markup.push('null');
				} else if (Pixate.isArray(argument)) {
					markup.push('[');
					Pixate.each(argument, function(arg) {
						markup.push(formatArgument(arg));
					});
					markup.push(']');
				} else {
					markup.push('{');
					var attributes = [];

					for (var x in argument) {
						attributes.push(' ' + x + ': ' + formatArgument(argument[x]));
					}
					markup.push(attributes.join(','));
					markup.push(' }');
				}

				break;
			case 'string':
				markup.push("'"+argument+"'");
				break;
			case 'number':
			case 'boolean':
				markup.push(argument);
				break;
			case 'undefined':
				markup.push('<span class="undefined">undefined</span>');
				break;
			default:
				markup.push(argument);
		}

		return markup.join('');
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

		markup.push('</div>');

		markup.push('<div class="arguments">');

			var map = [];
			var parameterNames = Pixate.Api[command.command].parameterNames;
			var args = command.arguments;

			for (var i = 0; i < Math.max(parameterNames.length, args.length); i++) {
				map.push({
					parameterName: i < parameterNames.length ? parameterNames[i] : '<span class="undefined">undefined</span>',
					argument: i < args.length ? args[i] : undefined
				});
			}

			Pixate.each(map, function(o) {
				markup.push('<div class="argument">');
					markup.push('<span class="argument-name">' + o.parameterName + '</span>');
					markup.push('<span class="argument-spacing"> - </span>');
					markup.push('<span class="argument-value">'+formatArgument(o.argument)+'</span>');
				markup.push('</div>');
			});

			if (Pixate.Api[command.command].returnType !== undefined) {
				markup.push('<div class="return">');
					markup.push('<span class="return-name">return</span>');
					markup.push('<span class="return-spacing"> </span>');
					markup.push('<span class="return-value">'+formatArgument(command.result)+'</span>');
					markup.push('<span class="return-semi-colon">;</span>');
				markup.push('</div>');
			}

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

	var evalCommandReturns = function(command) {
		var apiCommand = Pixate.Api[command.command];
		return Pixate.eval(apiCommand.returns, apiCommand.parameterNames, command.arguments);
	}

	var layer = function(command) {
		switch (command.command) {
			case 'createLayer':
				return evalCommandReturns(command);

			case 'getSelectedLayer':
				var selectedLayer = Pixate.Assets.getSelectedLayer();

				if (selectedLayer) {
					return selectedLayer;
				}

				selectedLayer = evalCommandReturns(command);
				return Pixate.Assets.findLayer(selectedLayer.name) || selectedLayer;

			case 'getSelectedLayers':
				var selectedLayers = Pixate.Assets.getSelectedLayers();

				if (selectedLayers) {
					return selectedLayers;
				}

				selectedLayers = []
				
				Pixate.each(evalCommandReturns(command), function(selectedLayer) {
					selectedLayers.push(Pixate.Assets.findLayer(selectedLayer.name) || selectedLayer);
				});

				return selectedLayers;

			case 'getLayerByName':
				return Pixate.Assets.findLayer(command.arguments[0]) || evalCommandReturns(command);
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
			switch (Pixate.Api[command.command].returnType) {
				case 'Layer':
				case 'Layer or null':
				case 'Layer[]':
					command.result = layer(command);
			} 

			log(command);

			return command.result;
		}
	};
}();

