'use strict';

Pixate.ApiTest.bundle({
	getSelectedLayer: [{
		name: 'return default Layer (Test Harness)',
		when: function() { return !Pixate.isPixateStudio(); },
		test: function(Assert) {
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNull(layer, 'Expected null layer object');
		}
	}, {
		name: 'return null (Pixate Studio, nothing selected)',
		when: function() { 
			return Pixate.isPixateStudio() && getSelectedLayer() === null;
		},
		test: function(Assert) {			
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNull(layer, 'Expected null');
		}
	}, {
		name: 'return default Layer (Pixate Studio, something selected)',
		when: function() { 
			return Pixate.isPixateStudio() && getSelectedLayer() !== null;
		},
		test: function(Assert) {
			var expected = getSelectedLayer();
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNotNullOrUndefined(expected, 'Expected layer object (expected)');
			Assert.isNotNullOrUndefined(layer, 'Expected layer object (layer)');
			Assert.areEqual(expected, layer, 'Expected layer objects to be the same');
		}
	}]
});

