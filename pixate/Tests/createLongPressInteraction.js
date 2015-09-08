Pixate.ApiTest.bundle({
	createLongPressInteraction: [{
		name: 'createOnLayerSucceeds',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			Assert.isNullOrUndefined(layer.interactions.drag, 'Expected that drag interaction wouldnt exist');
			Assert.areEqual(0, layer.animations.length, 'Expected that the layer would not contain any animations');
			
			var interaction = Pixate.createLongPressInteraction(layer);

			if (!Assert.isNotNullOrUndefined(interaction, 'Expected LongPress interaction to exist')) {
				return;
			}

			Assert.areEqual(Pixate.Api.Types.Interaction.LongPress.type, interaction.type, 'Expected interaction type to be longpress');

			Assert.areEqual(0, layer.animations.length, 'Expected that no default animation would have been created');
		}
	}, {
		name: 'createWithoutLayerReturnsNothing',
		test: function(Assert) {
			var interaction = Pixate.createLongPressInteraction();
			Assert.isUndefined(interaction, 'Expected interaction would not be created');
		}
	}, {
		name: 'createWithLayerNameReturnsNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interaction = Pixate.createLongPressInteraction('layer');
			Assert.isUndefined(interaction, 'Expected interaction would not be created');
		}
	}, {
		name: 'createOnLayerTwiceDoesNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interactionOne = Pixate.createLongPressInteraction(layer);
			var interactionTwo = Pixate.createLongPressInteraction(layer);

			Assert.isNotNullOrUndefined(interactionOne, 'Expected interaction to exist');
			Assert.areSame(interactionOne, interactionTwo, 'Expected both interactions to be the same object');
		}
	}]
});
