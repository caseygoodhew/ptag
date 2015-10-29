'use strict';

Pixate.ApiTest.bundle({
	createDoubleTapInteraction: [{
		name: 'createOnLayerSucceeds',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			Assert.isNullOrUndefined(layer.interactions.drag, 'Expected that drag interaction wouldnt exist');
			Assert.areEqual(0, layer.animations.length, 'Expected that the layer would not contain any animations');
			
			var interaction = Pixate.createDoubleTapInteraction(layer);

			if (!Assert.isNotNullOrUndefined(interaction, 'Expected DoubleTap interaction to exist')) {
				return;
			}

			Assert.areEqual(Pixate.Api.Types.Interaction.DoubleTap.type, interaction.type, 'Expected interaction type to be doubletap');

			Assert.areEqual(0, layer.animations.length, 'Expected that no default animation would have been created');
		}
	}, {
		name: 'createWithoutLayerReturnsNothing',
		test: function(Assert) {
			var interaction = Pixate.createDoubleTapInteraction();
			Assert.isUndefined(interaction, 'Expected interaction would not be created');
		}
	}, {
		name: 'createWithLayerNameReturnsNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interaction = Pixate.createDoubleTapInteraction('layer');
			Assert.isUndefined(interaction, 'Expected interaction would not be created');
		}
	}, {
		name: 'createOnLayerTwiceDoesNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interactionOne = Pixate.createDoubleTapInteraction(layer);
			var interactionTwo = Pixate.createDoubleTapInteraction(layer);

			Assert.isNotNullOrUndefined(interactionOne, 'Expected interaction to exist');
			Assert.areSame(interactionOne, interactionTwo, 'Expected both interactions to be the same object');
		}
	}]
});
