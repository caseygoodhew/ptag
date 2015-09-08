Pixate.ApiTest.bundle({
	createInteraction: [{
		name: 'createInteractionByTypeCreatesExpected',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			
			var testCount = 0;

			for (var x in Pixate.Api.Types.Interaction) {
				
				var type = Pixate.Api.Types.Interaction[x];

				var interactionByType = Pixate.createInteraction(layer, type);
				Assert.areEqual(type.type, interactionByType.type, 'Expected intercation by type ' + type.type);
				testCount++;

				var interactionByTypeName = Pixate.createInteraction(layer, x);
				Assert.areEqual(type.type, interactionByType.type, 'Expected intercation by type name ' + type.type);
				testCount++;

				var interactionByTypeName = Pixate.createInteraction(layer, type.type);
				Assert.areEqual(type.type, interactionByType.type, 'Expected intercation by type type ' + type.type);
				testCount++;
			}

			Assert.areEqual(21, testCount, 'Expected 21 tests to be run, actual was '+testCount);
		}
	}, {
		name: 'createInteractionWithoutLayerReturnsNothing',
		test: function(Assert) {
			var interaction = Pixate.createInteraction(null, 'drag');
			Assert.isUndefined(interaction, 'Expected undefined to be returned')			;
		}
	}, {
		name: 'createInteractionWithoutLayerReturnsNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interaction = Pixate.createInteraction('layer', 'drag');
			Assert.isUndefined(interaction, 'Expected undefined to be returned')			;
		}
	}, {
		name: 'createInteractionWithoutInteractionReturnsNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interaction = Pixate.createInteraction(layer);
			Assert.isUndefined(interaction, 'Expected undefined to be returned')			;
		}
	}, {
		name: 'createInteractionWithUnknownInteractionReturnsNothing',
		test: function(Assert) {
			var layer = Pixate.createLayer('layer');
			var interaction = Pixate.createInteraction(layer, 'anything invalid');
			Assert.isUndefined(interaction, 'Expected undefined to be returned')			;
		}
	}]
});
