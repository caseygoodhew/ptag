'use strict';

Pixate.ApiTest.bundle({
	selectLayer: [{
		name: 'sets selectedLayer (Test Harness)',
		when: function() { return !Pixate.isPixateStudio(); },
		test: function(Assert) {
			var layer = Pixate.createLayer('test');
			Pixate.selectLayer(layer);
			
			var selected = Pixate.Assets.getSelectedLayer();
			Assert.areSame(layer, selected, 'Layer passed to "selectLayer" does not match "Pixate.Assets.getSelectedLayer()"');
		}
	}, {
		name: 'selectedLayer doesnt fail (Pixate Studio)',
		when: function() { return Pixate.isPixateStudio(); },
		test: function(Assert) {
			var layer = Pixate.createLayer('test');
			// just verifies that the command doesn't fail
			// deeper testing takes place further along
			Pixate.selectLayer(layer);
		}
	}]
});

