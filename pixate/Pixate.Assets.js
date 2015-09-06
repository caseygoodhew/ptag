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
			if (!layer || typeof(layer) != 'object') {
				return false;
			}

			return !!this.findLayer(layer.name);
		},

		findLayer: function(nameOrLayer) {
			
			if (!nameOrLayer) {
				return null;
			}

			var name = typeof nameOrLayer === 'string' ? nameOrLayer : nameOrLayer.name;

			if (name) {
				for (var i = 0; i < layers.length; i++) {
					if (layers[i].name === name) {
						return layers[i];
					}
				}
			}

			return null;
		},

		registerLayer: function(layer, forceNew) {
			
			if (!layer || typeof layer !== 'object' || !layer.name) {
				Pixate.Assert.fail(false, 'nameOrLayer', 'Argument is not an object or does not have a "name" attribute set');
				return null;
			}

			if (forceNew || !this.isRegisteredLayer(layer)) {
				layers.push(layer);
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
			return [].concat(layers);
		},

		// parent, params children[]
		nestLayers: function() {
			
			var parent = arguments[0];
			Pixate.each(Array.prototype.splice.call(arguments, 1), function(child) {
				child.parentId = parent._id;
			});
			
		}
	}
}();