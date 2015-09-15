'use strict';

Pixate.ApiTest.bundle({
	createRotateInteraction: [{
		name: 'createOnLayerSucceeds',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			Assert.isNullOrUndefined(layer.interactions.Rotate, 'Expected that Rotate interaction wouldnt exist');
			Assert.areEqual(0, layer.animations.length, 'Expected that the layer would not contain any animations');
			
			var interaction = Pixate.createRotateInteraction(layer);

			if (!Assert.isNotNullOrUndefined(interaction, 'Expected interaction to exist')) {
				return;
			}

			Assert.areEqual(Pixate.Api.Types.Interaction.Rotate.type, interaction.type, 'Expected interaction type to be rotate');

			if (Assert.areEqual(1, layer.animations.length, 'Expected that a default animation would have been created')) {
				var animation = layer.animations[0];
				var defaultAnimation = Pixate.Api.Types.Interaction.Rotate.events.rotate.defaultAnimation;
				Assert.areEqual(defaultAnimation.type, animation.type, 'Expected that a default animation of type ' + defaultAnimation.type + ' would have been created');
				Assert.areEqual(defaultAnimation.animates, animation.animates, 'Expected AnimationMode of ' + defaultAnimation.animates);
				Assert.areEqual(defaultAnimation.name, animation.name, 'Expected that a default animation would have been named ' + defaultAnimation.name);
				Assert.areEqual(interaction.type, animation.basedOn, 'Expected that a default animation would have been basedOn ' + interaction.type);
			}
		}
	},  {
		name: 'createWithoutLayerReturnsNothing',
		test: function(Assert) {
			var interaction = Pixate.createRotateInteraction();
			Assert.isUndefined(interaction, 'Expected interaction would not be created');
		}
	}, {
		name: 'createWithLayerNameReturnsNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interaction = Pixate.createRotateInteraction('layer');
			Assert.isUndefined(interaction, 'Expected interaction would not be created');
		}
	}, {
		name: 'createOnLayerTwiceDoesNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interactionOne = Pixate.createRotateInteraction(layer);
			var interactionTwo = Pixate.createRotateInteraction(layer);

			Assert.isNotNullOrUndefined(interactionOne, 'Expected interaction to exist');
			Assert.areSame(interactionOne, interactionTwo, 'Expected both interactions to be the same object');
		}
	}]
});
