'use strict';
Pixate.Executor = Pixate.Executor || {};

Pixate.Executor.Inspector = function() {

	var evalCommandReturns = function(command) {
		var apiCommand = Pixate.Api[command.command];
		return Pixate.eval(apiCommand.returns, apiCommand.parameterNames, command.arguments);
	}

	var execute = function(command) {
		switch (command.command) {
			case 'createLayer':
				return evalCommandReturns(command);

			case 'getSelectedLayer':
				var selectedLayer = Pixate.Assets.getSelectedLayer();

				if (selectedLayer !== undefined) {
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

			case 'getAllLayers':
				return Pixate.Assets.getAllLayers();

			case 'nestLayers':
				return Pixate.Assets.nestLayers.apply(Pixate.Assets.nestLayers, command.arguments);

		}
	}

	return {
		
		executeMany: function(commands) {
			Pixate.each(commands, function(command) {
				command.result = this.executeOne(command);
			}, this);
		},

		executeOne: function(command) {
			
			var container = Pixate.CommandLogger.logCommand(command);

			if (Pixate.Assert.aggregateAssertionResult(command.assertions)) {
				
				if (typeof Pixate.Api[command.command].custom === 'function') {
					command.result = Pixate.Api[command.command].custom.apply(Pixate.Api[command.command], command.arguments||[]);
				} else {
					command.result = execute(command);
				}
			}

			Pixate.CommandLogger.logResult(container, command);

			return command.result;
		}
	};
}();

