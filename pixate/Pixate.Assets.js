Pixate.Assets = function() {

	var layers;
	var selectedLayers;

	var init = function() {
		layers = [];
		selectedLayers = [];
	};

	init();

	return {
		
		reinit: function() {
			init();
		},

		isRegisteredLayer: function(layer) {
			if (typeof(layer) != 'object') {
				return false;
			}

			layer = layer.layer || layer;

			return !!this.findLayer(layer.name);
		},

		findLayer: function(nameOrLayer) {
			
			var name = typeof nameOrLayer === 'string' ? nameOrLayer : nameOrLayer.name;

			if (name) {
				for (var i = 0; i < layers.length; i++) {
					if (layers[i].layer.name === name) {
						return layers[i].layer;
					}
				}
			}

			return null;
		},

		registerLayer: function(layer, forceNew) {
			
			if (typeof layer !== 'object' || !layer.name) {
				Pixate.Assert.fail(false, 'nameOrLayer', 'Argument is not an object or does not have a "name" attribute set');
				return null;
			}

			if (forceNew || !this.isRegisteredLayer(layer)) {
				layers.push({
					layer: layer
				});
			}

			return layer;
		},

		setSelectedLayer: function(layer) {
			if (layer) {
				selectedLayers = [layer];
			} else {
				selectedLayers = [];
			}
		},

		getSelectedLayer: function() {
			return selectedLayers.length ? selectedLayers[0] : null;
		},

		getSelectedLayers: function() {
			return [].concat(selectedLayers);
		},

		getAllLayers: function() {
			var result = [];

			Pixate.each(layers, function(layer) {
				result.push(layer.layer);
			});
			
			return result;
		}
	}
}();