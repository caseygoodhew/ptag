
Pixate.ApiTest = function() {
	
	var generateId = function(group, test) {
		return (group + '-' + test.name).replace(/\s/ig, '');
	}
	
	var testRunner = function(group, test, testId) {
		
		Pixate.Assets.reinit();
		Pixate.log('<span id="'+generateId(group, test)+'">' + group + ': ' + test.name + '</span>', true);

		test.test(Pixate.ApiTest.Assert);
		var assertions = Pixate.ApiTest.Assert.getAssertions();

		var el = document.getElementById(testId);
		if (el) {
			if (assertions.length) {
				el.className = 'test-fail';
				el.innerHTML = assertions.join(', ');
			} else {
				el.className = 'test-success';
				el.innerHTML = 'OK';
			}
		} else {
			if (!assertions.length) {
				assertions.push('OK');
			}

			Pixate.each(assertions, function(assertion) {
				console.log(group + '[' + test.name + ']: ' + assertion);
			});
		}
	};

	var testCounter = 0;

	return {

		run: function(tests) {

			if (Pixate.isArray(tests)) {
				tests = { Tests: tests };
			}

			var fullResult = [];
			fullResult.push('<div>Pixate Api Test Results</div>')

			for (var x in tests) {

				fullResult.push('<div class="test-group"><span class="test-group-title">'+x+'</span>')

				Pixate.each(tests[x], function(test) {
					
					var runTest = true;
					if (typeof test.when === 'function') {
						runTest = test.when();
					}

					if (runTest) {
						testCounter++;
						var testId = 'test-' + testCounter;

						var testResult = [];
						testResult.push('<div class="test">');
						testResult.push('<span class="test-name"><a href="#'+generateId(x, test)+'">'+test.name+'</a></span>');
						testResult.push('<span class="test-spacing">: </span>');
						testResult.push('<span id="'+testId+'" class="test-pending"></span>');
						testResult.push('</div>');
						
						fullResult.push(testResult.join(''));

						Pixate.delay(1, testRunner, [x, test, testId]);
					}
				});

				Pixate.delay(1, function() { 
					var els = document.getElementsByClassName('test-pending');
					for (var i = 0; i < els.length; i++) {
						var el = els[i];
						el.className = 'test-exception';
						el.innerHTML = 'Test failed to complete';
					};
				});

				if (Pixate.Api[x]) {
					Pixate.Api[x].tested = true;
				}

				fullResult.push('</div>')
			}

			Pixate.log(fullResult.join(''), true);
		}
	}
}();

Pixate.ApiTest.Assert = function() {

	var messages = [];

	var assert = function(result, message) {
		if (!result) {
			messages.push(message||'No message provided');
		}

		return result;
	}

	var stringify = function(arg) {
		if (arg === undefined) {
			return 'undefined';
		} else if (arg === null) {
			return 'null'	;
		} else if (typeof arg === 'string') {
			return '"'+arg+'"';
		} else if (typeof arg === 'object') {
			return JSON.stringify(arg);
		}

		return arg+'';
	};	

	return {
		areEqual: function(conditionA, conditionB, message) {
			return assert(stringify(conditionA) === stringify(conditionB), message);
		},

		areNotEqual: function(conditionA, conditionB, message) {
			return assert(stringify(conditionA) !== stringify(conditionB), message);
		},

		areSame: function(conditionA, conditionB, message) {
			return assert(conditionA === conditionB, message);
		},

		areNotSame: function(conditionA, conditionB, message) {
			return assert(conditionA !== conditionB, message);
		},

		isUndefined: function(condition, message) {
			return assert(condition === undefined, message);
		},

		isNotUndefined: function(condition, message) {
			return assert(condition !== undefined, message);
		},

		isNull: function(condition, message) {
			return assert(condition === null, message);
		},

		isNotNull: function(condition, message) {
			return assert(condition !== null, message);
		},

		isNullOrUndefined: function(condition, message) {
			return assert(condition === null || condition === undefined, message);
		},

		isNotNullOrUndefined: function(condition, message) {
			return assert(condition !== null && condition !== undefined, message);
		},

		isTrue: function(condition, message) {
			return assert(condition === true, message);
		},

		isFalse: function(condition, message) {
			return assert(condition === false, message);
		},

		getAssertions: function() {
			var result = [].concat(messages);
			messages = [];
			return result;
		}
	}
}();


var tests = {
/******************** CREATELAYER ********************/
	createLayer: [{
		name: 'with no parameters fails',
		test: function(Assert) {
			var layer = Pixate.createLayer();
			Assert.isUndefined(layer, 'Expected undefined');
		}
	}, {
		name: 'with string succeeds',
		test: function(Assert) {
			
			var expected = { name: 'create layer testX' };
			var layer = Pixate.createLayer(expected.name);
			
			Assert.areEqual(expected, layer, 'Expected layer object with name set');
		}
	}, {
		name: 'with Layer fails',
		test: function(Assert) {
			
			var firstLayer = Pixate.createLayer('create layer test');
			var result = Pixate.createLayer(firstLayer);
			
			Assert.isUndefined(result, 'Expected createLayer to fail');
		},
	}],
/******************** SELECTLAYER ********************/
	selectLayer: [{
		name: 'sets selectedLayer (Test Harness)',
		when: function() { return !Pixate.isPixateStudio(); },
		test: function(Assert) {
			var layer = Pixate.createLayer('test');
			Pixate.selectLayer(layer);
			
			var selected = Pixate.Assets.getSelectedLayer();
			Assert.areSame(layer, selected, 'Layer passed to "selectLayer" does not match "Pixate.Assets.getSelectedLayer()"');
		}
	}, {
		name: 'selectedLayer doesnt fail (Pixate Studio)',
		when: function() { return Pixate.isPixateStudio(); },
		test: function(Assert) {
			var layer = Pixate.createLayer('test');
			// just verifies that the command doesn't fail
			// deeper testing takes place further along
			Pixate.selectLayer(layer);
		}
	}],
/******************** GETSELECTEDLAYER ********************/
	getSelectedLayer: [{
		name: 'return default Layer (Test Harness)',
		when: function() { return !Pixate.isPixateStudio(); },
		test: function(Assert) {
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNull(layer, 'Expected null layer object');
		}
	}, {
		name: 'return null (Pixate Studio, nothing selected)',
		when: function() { 
			return Pixate.isPixateStudio() && getSelectedLayer() === null;
		},
		test: function(Assert) {			
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNull(layer, 'Expected null');
		}
	}, {
		name: 'return default Layer (Pixate Studio, something selected)',
		when: function() { 
			return Pixate.isPixateStudio() && getSelectedLayer() !== null;
		},
		test: function(Assert) {
			var expected = getSelectedLayer();
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNotNullOrUndefined(expected, 'Expected layer object (expected)');
			Assert.isNotNullOrUndefined(layer, 'Expected layer object (layer)');
			Assert.areEqual(expected, layer, 'Expected layer objects to be the same');
		}
	}],
/******************** CLEARLAYERSELECTION ********************/
	clearLayerSelection: [{
		name: 'clears selected layer',
		test: function(Assert) {
			Pixate.selectLayer(Pixate.createLayer('test'));
			var selected = Pixate.getSelectedLayer();
			
			Pixate.clearLayerSelection();
			var cleared = Pixate.getSelectedLayer();

			Assert.isNotNullOrUndefined(selected, 'Expected layer object');
			Assert.isNull(cleared, 'Expected null');
		}
	}],
/******************** GETSELECTEDLAYERS ********************/
	getSelectedLayers: [{
		name: 'returns array with selected layer',
		test: function(Assert) {
			Pixate.clearLayerSelection();
			var layer = Pixate.createLayer('test');
			Pixate.selectLayer(layer);
			var selected = Pixate.getSelectedLayers();
			
			Assert.isNotNullOrUndefined(layer, 'Expected layer object (layer)');
			Assert.isNotNullOrUndefined(selected, 'Expected layer array (selected)');
			
			if (!selected) { return; }

			Assert.isTrue(Pixate.isArray(selected), 'Expected array');
			Assert.areEqual(1, selected.length, 'Expected array length of 1');
			Assert.areSame(layer, selected[0], 'Expected array element is selected layer');
		}
	}, {
		name: 'returns empty array',
		test: function(Assert) {
			Pixate.clearLayerSelection();
			var selected = Pixate.getSelectedLayers();
			
			Assert.isNotNullOrUndefined(selected, 'Expected layer array (selected)');
			
			if (!selected) { return; }

			Assert.isTrue(Pixate.isArray(selected), 'Expected array');
			Assert.areEqual(0, selected.length, 'Expected array length of 0');
		}
	}, {
		name: 'only one layer can be selected',
		test: function(Assert) {
			Pixate.clearLayerSelection();
			var layerOne = Pixate.createLayer('test-one');
			var layerTwo = Pixate.createLayer('test-two');
			
			Pixate.selectLayer(layerOne);
			Pixate.selectLayer(layerTwo);

			var selectedLayer = Pixate.getSelectedLayer();
			var selectedLayerArray = Pixate.getSelectedLayers();
			
			Assert.isNotNullOrUndefined(layerOne, 'Expected layer (layerOne)');
			Assert.isNotNullOrUndefined(layerTwo, 'Expected layer (layerTwo)');
			Assert.areNotSame(layerOne, layerTwo, 'Expected different layers');

			Assert.isNotNullOrUndefined(selectedLayer, 'Expected layer');
			Assert.isNotNullOrUndefined(selectedLayerArray, 'Expected layer array');

			if (!selectedLayerArray) { return; }

			Assert.isTrue(Pixate.isArray(selectedLayerArray), 'Expected array');
			Assert.areEqual(1, selectedLayerArray.length, 'Expected array length of 1');

			Assert.areSame(layerTwo, selectedLayer, 'Expected layerTwo to be selected');
			Assert.areSame(selectedLayer, selectedLayerArray[0], 'Expected the same layer to be selected');
		}
	}],
/******************** GETLAYERBYNAME ********************/
	getLayerByName: [{
		name: 'returns null when layer does not exist',
		test: function(Assert) {
			var layer = Pixate.getLayerByName('dxfghgftyuhgfdsder56uikloiuytfde56yuikiuytrdfrtyui');
			Assert.isNull(layer, 'Expected null');
		}
	}, {
		name: 'returns null with no parameters',
		test: function(Assert) {
			var originalReturns = Pixate.Api.getLayerByName.returns;
			Pixate.Api.getLayerByName.returns = '{}';

			var layer = Pixate.getLayerByName();
			Assert.isNull(layer, 'Expected null');

			Pixate.Api.getLayerByName.returns = originalReturns;

		}
	}, {
		name: 'returns expected layer',
		test: function(Assert) {
			var layerOne = Pixate.createLayer('test-one');
			var layerTwo = Pixate.createLayer('test-two');

			Assert.isNotNullOrUndefined(layerOne, 'Expected layer (layerOne)');
			Assert.isNotNullOrUndefined(layerTwo, 'Expected layer (layerTwo)');

			var layer = Pixate.getLayerByName(layerOne.name);
			Assert.isNotNullOrUndefined(layer, 'Expected layer');

			Assert.areSame(layer, layerOne, 'Expected layer to be layerOne');

			layer = Pixate.getLayerByName(layerTwo.name);
			Assert.isNotNullOrUndefined(layer, 'Expected layer');
			Assert.areSame(layer, layerTwo, 'Expected layer to be layerTwo');
		}
	}, {
		name: 'returns first layer of name',
		test: function(Assert) {
			var layerOne = Pixate.createLayer('test');
			var layerTwo = Pixate.createLayer('test');

			Assert.isNotNullOrUndefined(layerOne, 'Expected layer (layerOne)');
			Assert.isNotNullOrUndefined(layerTwo, 'Expected layer (layerTwo)');
			Assert.areEqual(layerOne, layerTwo, 'Expected layers to be equal');
			Assert.areNotSame(layerOne, layerTwo, 'Expected layers not to be the same');

			var layer = Pixate.getLayerByName(layerOne.name);
			Assert.isNotNullOrUndefined(layer, 'Expected layer (layer)');
			Assert.areSame(layerOne, layer, 'Expected layer to be layerOne');
			Assert.areNotSame(layerTwo, layer, 'Expected layer not to be layerTwo');
		}
	}],
	/******************** GETLAYERBYNAME ********************/
	getAllLayers: [{
		name: 'returns array',
		test: function(Assert) {
			var layers = Pixate.getAllLayers();

			Assert.isNotNullOrUndefined(layers, 'Expected layer array');
			Assert.isTrue(Pixate.isArray(layers), 'Expected array');

			if (layers && !Pixate.isPixateStudio()) {
				Assert.areEqual(0, layers.length);
			}
		}
	}, {
		name: 'returns sane result',
		test: function(Assert) {
			var layerOne = Pixate.createLayer('test');
			var layerTwo = Pixate.createLayer('test');
			var layerThree = Pixate.createLayer('test-three');
			
			layerOne.layer = 'one';
			layerTwo.layer = 'two';
			layerThree.layer = 'three';

			var layers = Pixate.getAllLayers();

			Assert.isNotNullOrUndefined(layers, 'Expected layer array');
			Assert.isTrue(Pixate.isArray(layers), 'Expected array');

			if (layers) {
				var map = {};
				Pixate.each(layers, function(layer) {
					if (layer.layer) {
						map[layer.layer] = layer;
					}
				});

				Assert.isNotNullOrUndefined(map.one, 'Expected layerOne in map');
				Assert.isNotNullOrUndefined(map.two, 'Expected layerTwo in map');
				Assert.isNotNullOrUndefined(map.three, 'Expected layerThree in map');
				
				if (map.one && map.two && map.three) {
					Assert.areSame(layerOne, map.one, 'Expected map.one to be layerOne');
					Assert.areSame(layerTwo, map.two, 'Expected map.one to be layerTwo');
					Assert.areSame(layerThree, map.three, 'Expected map.one to be layerThree');
				} else {
					Assert.isTrue(false, 'Test not finisehd');
				}
			}
		}
	}],
	/******************** GETLAYERBYNAME ********************/
	setLayerConfig: [{
		name: 'only sets pixate properties',
		test: function(Assert) {
			
			var rand = function() { return Math.floor((Math.random() * 1000) + 1); }

			var config = {};

			for (var x in Pixate.Properties.Layer) {
				if (!Pixate.Properties.Layer[x].readOnly) {
					switch (Pixate.Properties.Layer[x].type) {
						case 'string':
							config[x] = rand()+'-'+rand()+'-'+rand();
							break;
						case 'number':
							config[x] = rand();
							break;
						case 'Asset':
							config[x] = {};
							break;
						case 'ClippingType':
							config[x] = rand()%2 ? Pixate.ClippingType.none : Pixate.ClippingType.bounds;
					}
				}
			}

			config.anyOther = 'value';

			var layer = Pixate.createLayer(config.name);

			Assert.isNotNullOrUndefined(layer, 'Expected layer');
			
			Pixate.setLayerConfig(layer, config);

			var result = Pixate.getLayerByName(config.name);

			for (var x in Pixate.Properties.Layer) {
				if (!Pixate.Properties.Layer[x].readOnly) {
					Assert.areEqual(config[x], result[x], 'Attribute "'+x+'" is not equal');
				}
			}

			Assert.isUndefined(result.anyOther, 'Expected "anyOther" to be undefined');
		}
	}]
};

//Mock.enable();

Pixate.ApiTest.run(tests);
