'use strict';

Pixate.ApiTest.bundle({
	clearLayerSelection: [{
		name: 'clears selected layer',
		test: function(Assert) {
			Pixate.selectLayer(Pixate.createLayer('test'));
			var selected = Pixate.getSelectedLayer();
			
			Pixate.clearLayerSelection();
			var cleared = Pixate.getSelectedLayer();

			Assert.isNotNullOrUndefined(selected, 'Expected layer object');
			Assert.isNull(cleared, 'Expected null');
		}
	}]
});

