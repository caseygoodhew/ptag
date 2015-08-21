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
						return layers[i];
					}
				}
			}

			return null;
		},

		registerLayer: function(layer) {
			
			if (typeof layer !== 'object' || !layer.name) {
				Pixate.Assert.assert(false, 'nameOrLayer', 'Argument is not an object or does not have a "name" attribute set');
				return null;
			}

			if (!this.isRegisteredLayer(layer)) {
				layers.push({
					layer: layer
				});
			}

			return layer;
		},

		setSelectedLayer: function(layer) {
			selectedLayers = [layer];
		},

		getSelectedLayer: function() {
			return selectedLayers.length ? selectedLayers[0] : null;
		},

		getSelectedLayers: function() {
			return [].concat(selectedLayers);
		},

		getAllLayers: function() {
			return [].concat(layers);
		}
	}
}();