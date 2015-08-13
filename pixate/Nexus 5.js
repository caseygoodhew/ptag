/***************************************************************************************
 * 
 ***************************************************************************************/
var pTag = {
	
	applyToLayer: function(layer, config) {
		pTag.apply(layer, config, 'animation', 'children', 'name');
	},

	applyAnimation: function(layer, config) {
		
		var animation;

		switch (config.type) {
			case 'move':
				animation = createMoveAnimation(layer);
				break;
		}

		var referenceLayer = (config.basedOn.layer === 'screen') ? Screen : getLayerByName(config.basedOn.layer);
		animation.basedOn = referenceLayer[config.basedOn.interaction];
		animation.animates = config.animates || AnimationMode.withDuration;

		pTag.apply(animation, config, 'basedOn', 'type');
	},

	write: function(config) {
		var layer = createLayer(config.name);
		pTag.applyToLayer(layer, config);

		pTag.each(config.animation, function(animation) {
			pTag.applyAnimation(layer, animation);
		});

		pTag.each(config.children, function(child) {
			nestLayers(layer, pTag.write(child));
		});

		return layer;
	}
};

pTag.write({
	name: 'Flags',
	x: -400,
	y: -300,
	width: 50,
	height: 100,
	backgroundColor: 'rgb(36, 37, 38)',
	children: [{
	    name: 'show mini fab',
	    width: 50,
	    height: 10,
	    backgroundColor: 'rgb(255, 255, 255)',
	    animation: [{
	        type: 'move',
	        name: 'Initial Move with Delay',
	        duration: 0,
	        delay: 5,
	        basedOn: { layer: 'screen', interaction: 'loaded' },
	        toX: 1
	    }]
	}]
});




