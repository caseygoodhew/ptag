Pixate.Assets = function() {

	var layers = [];
	var selectedLayer;

	return {
		
		isLayer: function(layer) {
			if (typeof(layer) != 'object') {
				return false;
			}

			layer = layer.layer || layer;

			return !!this.findLayer(layer.name);
		},

		getLayerName: function(layer) {
			if (typeof(layer) != 'object') {
				return null;
			}

			layer = layer.layer || layer;

			return layer.name;
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

		registerLayer: function(nameOrLayer) {
			
			var layer;

			if (typeof nameOrLayer === 'string'){
				layer = { name: nameOrLayer };
			} else if (typeof nameOrLayer === 'object' && nameOrLayer.name) {
				layer = nameOrLayer;
			} else {
				Pixate.Assert.assert(false, 'nameOrLayer', 'Argument is not type string or object');
			}

			layers.push({
				layer: layer
			});

			return layer;
		},

		getSelectedLayer: function() {
			return selectedLayer;
		},

		setSelectedLayer: function(layer) {
			selectedLayer = layer;
		}
	}
}();