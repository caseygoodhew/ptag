Pixate.ApiTest.bundle({
	createDragInteraction: [{
		name: 'createOnLayerSucceeds',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			Assert.isNullOrUndefined(layer.interactions.drag, 'Expected that drag interaction wouldnt exist');
			Assert.areEqual(0, layer.animations.length, 'Expected that the layer would not contain any animations');
			
			Pixate.createDragInteraction(layer);

			var interaction = layer.interactions.drag;

			if (!Assert.isNotNullOrUndefined(layer.interactions.drag, 'Expected drag interaction to exist')) {
				return;
			}

			Assert.areEqual('drag', interaction.type, 'Expected interaction type to be drag');

			if (Assert.areEqual(1, layer.animations.length, 'Expected that a default animation would have been created')) {
				var animation = layer.animations[0];
				var defaultAnimation = Pixate.Api.Types.Interaction.Drag.events.position.defaultAnimation;
				Assert.areEqual(defaultAnimation.type.type, animation.type, 'Expected that a default animation of type ' + defaultAnimation.type.type + ' would have been created');
				Assert.areEqual(defaultAnimation.animates, animation.animates, 'Expected AnimationMode of ' + defaultAnimation.animates);
				Assert.areEqual(defaultAnimation.name, animation.name, 'Expected that a default animation would have been named ' + defaultAnimation.name);
			}
		}
	}, {
		name: 'createWithoutLayerDoesNotFail',
		test: function(Assert) {
			Pixate.createDragInteraction();
		}
	}]
});
