/***************************************************************************************
 * 
 ***************************************************************************************/
var pTag = {
	each: function(array, fn) {
		
		array = array || [];

		for (var i = 0; i < array.length; i++) {
			fn.call(array, array[i], i);
		}
	},
		/* function(dest, source, params[] exclude) */
	apply: function() {
	
		var dest = arguments[0];
		var source = arguments[1];
		var exclude = {};
			
		for (var i = 2; i < arguments.length; i++) {
			exclude[arguments[i]] = true;
		}

		for (var x in source) {
			if (!exclude[x]) {
				dest[x] = source[x];
			}
		}

		return dest;
	},

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




