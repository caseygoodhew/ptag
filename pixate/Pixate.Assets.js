Pixate.Assets = function() {

	var layers = [];

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

		findLayer: function(name) {
			
			for (var i = 0; i < layers.length; i++) {
				if (layers[i].layer.name === name) {
					return layers[i];
				}
			}

			return null;
		},

		registerLayer: function(nameOrLayer) {
			
			var layer;

			if (typeof nameOrLayer === 'string'){
				layer = { name: nameOrLayer };
			} else {
				Pixate.Assert.assert(false, 'name', 'Argument is not type string');
			}

			layers.push({
				layer: layer
			});

			return layer;
		}
	}
}();