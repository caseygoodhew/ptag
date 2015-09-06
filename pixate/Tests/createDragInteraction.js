Pixate.ApiTest.bundle({
	createDragInteraction: [{
		name: 'createOnLayerSucceeds',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			Assert.isNullOrUndefined(layer.interactions.drag, 'Expected that drag interaction wouldnt exist');

			Pixate.createDragInteraction(layer);

			var interaction = layer.interactions.drag;

			if (!Assert.isNotNullOrUndefined(layer.interactions.drag, 'Expected drag interaction to exist')) {
				return;
			}

			Assert.areEqual('drag', interaction.type, 'Expected interaction type to be drag');
		}
	}, {
		name: 'createWithoutLayerDoesNotFail',
		test: function(Assert) {
			Pixate.createDragInteraction();
		}
	}, {
		name: 'createsDefaultAnimation',
		test: function(Assert) {
			Assert.isTrue(false, 'NOT IMPLEMENTED');
		}
	}]
});
