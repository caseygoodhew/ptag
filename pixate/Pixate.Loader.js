'use strict';
Pixate.Loader = function() {
	
	var Screen = {};

	var loadLayer = function(config) {
		var layer = Pixate.createLayer(config.name, Pixate.exclude(config, 'animation', 'children', 'name'));

		Pixate.each(config.children, function(child) {
			Pixate.nestLayers(layer, loadLayer(child));
		});

		Pixate.each(config.animation, function(animation) {
			applyAnimation(layer, animation);
		});

		return layer;
	};

	var applyAnimation = function(layer, config) {
		
		/*
		var animation;

		switch (config.type) {
			case 'move':
				animation = Pixate.createMoveAnimation(layer);
				break;
		}

		var referenceLayer = (config.basedOn.layer === 'screen') ? Screen : getLayerByName(config.basedOn.layer);
		animation.basedOn = referenceLayer[config.basedOn.interaction];
		animation.animates = config.animates || AnimationMode.withDuration;

		pTag.apply(animation, config, 'basedOn', 'type');
		*/
	};
	
	return {
		load: function(config) {
			Pixate.each(config, loadLayer);
		}
	}
}();

