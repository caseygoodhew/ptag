
Pixate.ApiTest = function() {
	
	var testRunner = function(group, test, testId) {
		
		Pixate.Assets.reinit();

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
						testResult.push('<span class="test-name">'+test.name+'</span>');
						testResult.push('<span class="test-spacing">: </span>');
						testResult.push('<span id="'+testId+'" class="test-pending"></span>');
						testResult.push('</div>');
						
						fullResult.push(testResult.join(''));

						setTimeout(function() { 
							testRunner(x, test, testId);
						}, 1);
					}
				});

				setTimeout(function() { 
					var els = document.getElementsByClassName('test-pending');
					for (var i = 0; i < els.length; i++) {
						var el = els[i];
						el.className = 'test-exception';
						el.innerHTML = 'Test failed to complete';
					};
				}, 1);

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
			messages.push(message);
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

		areSame: function(conditionA, conditionB, message) {
			return assert(conditionA === conditionB, message);
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

		getAssertions: function() {
			var result = [].concat(messages);
			messages = [];
			return result;
		}
	}
}();


var tests = {
	createLayer: [{
		name: 'with no parameters fails',
		test: function(Assert) {
			
			var result = Pixate.createLayer();
			return result === undefined;
		},
		fail: 'Expected createLayer to fail'
	}, {
		name: 'with string succeeds',
		test: function(Assert) {
			
			var expected = { name: 'create layer test' };
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

	getSelectedLayer: [{
		name: 'return default Layer (when Test Harness)',
		when: Pixate.isNotPixateStudio,
		test: function(Assert) {
			var expected = Pixate.eval(Pixate.Api.getSelectedLayer.returns);
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNotUndefined(expected, 'Expected default layer object (expected)');
			Assert.isNotUndefined(layer, 'Expected default layer object (layer)');
			Assert.areEqual(expected, layer, 'Expected objects to be the same');
		}
	}, {
		name: 'return null (when Pixate Studio and nothing selected)',
		when: function() { 
			return Pixate.isPixateStudio() && getSelectedLayer() === null;
		},
		test: function(Assert) {
			
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNotUndefined(layer, 'Expected layer object (layer)');
			Assert.isNull(layer, 'Expected layer object (layer)');
			Assert.areEqual(expected, layer, 'Expected layer objects to be the same');
		}
	}, {
		name: 'return default Layer (when Pixate Studio and something selected)',
		when: function() { 
			return Pixate.isPixateStudio() && getSelectedLayer() !== null;
		},
		test: function(Assert) {
			var expected = getSelectedLayer();
			var layer = Pixate.getSelectedLayer();
			
			Assert.isNotUndefined(expected, 'Expected layer object (expected)');
			Assert.isNotUndefined(layer, 'Expected layer object (layer)');
			Assert.areEqual(expected, layer, 'Expected layer objects to be the same');
		}
	}]
};

Pixate.ApiTest.run(tests);
