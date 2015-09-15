'use strict';

Pixate.ApiTest.bundle({
	getSelectedLayers: [{
		name: 'returns array with selected layer',
		test: function(Assert) {
			Pixate.clearLayerSelection();
			var layer = Pixate.createLayer('test');
			Pixate.selectLayer(layer);
			var selected = Pixate.getSelectedLayers();
			
			Assert.isNotNullOrUndefined(layer, 'Expected layer object (layer)');
			Assert.isNotNullOrUndefined(selected, 'Expected layer array (selected)');
			
			if (!selected) { return; }

			Assert.isTrue(Pixate.isArray(selected), 'Expected array');
			Assert.areEqual(1, selected.length, 'Expected array length of 1');
			Assert.areSame(layer, selected[0], 'Expected array element is selected layer');
		}
	}, {
		name: 'returns empty array',
		test: function(Assert) {
			Pixate.clearLayerSelection();
			var selected = Pixate.getSelectedLayers();
			
			Assert.isNotNullOrUndefined(selected, 'Expected layer array (selected)');
			
			if (!selected) { return; }

			Assert.isTrue(Pixate.isArray(selected), 'Expected array');
			Assert.areEqual(0, selected.length, 'Expected array length of 0');
		}
	}, {
		name: 'only one layer can be selected',
		test: function(Assert) {
			Pixate.clearLayerSelection();
			var layerOne = Pixate.createLayer('test-one');
			var layerTwo = Pixate.createLayer('test-two');
			
			Pixate.selectLayer(layerOne);
			Pixate.selectLayer(layerTwo);

			var selectedLayer = Pixate.getSelectedLayer();
			var selectedLayerArray = Pixate.getSelectedLayers();
			
			Assert.isNotNullOrUndefined(layerOne, 'Expected layer (layerOne)');
			Assert.isNotNullOrUndefined(layerTwo, 'Expected layer (layerTwo)');
			Assert.areNotSame(layerOne, layerTwo, 'Expected different layers');

			Assert.isNotNullOrUndefined(selectedLayer, 'Expected layer');
			Assert.isNotNullOrUndefined(selectedLayerArray, 'Expected layer array');

			if (!selectedLayerArray) { return; }

			Assert.isTrue(Pixate.isArray(selectedLayerArray), 'Expected array');
			Assert.areEqual(1, selectedLayerArray.length, 'Expected array length of 1');

			Assert.areSame(layerTwo, selectedLayer, 'Expected layerTwo to be selected');
			Assert.areSame(selectedLayer, selectedLayerArray[0], 'Expected the same layer to be selected');
		}
	}]
});

