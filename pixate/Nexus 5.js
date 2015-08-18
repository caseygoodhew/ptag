/***************************************************************************************
 * 
 ***************************************************************************************/
(function() {

Mock.enable();

var layer = Pixate.createLayer('casey');
Pixate.selectLayer(layer);
var selectedLayer = Pixate.getSelectedLayer();

Pixate.log(layer === selectedLayer ? 'selected layer is ' + selectedLayer.name : 'Unexpected selectedLayer');

return;

Pixate.log('Creating Flags');

Pixate.Loader.load({
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



})();