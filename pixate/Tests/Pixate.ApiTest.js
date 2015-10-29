'use strict';

Pixate.ApiTest = function() {
	
	var generateId = function(group, test) {
		return (group + '-' + test.name).replace(/\s/ig, '');
	}
	
	var testRunner = function(group, test, testId, context) {
		
		Pixate.Assets.reinit();
		Pixate.log('<span id="'+generateId(group, test)+'">' + group + ': ' + test.name + '</span>', true);

		test.test(Pixate.ApiTest.Assert, context);
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

	var bundledTests = {};

	return {

		run: function(tests) {

			if (Pixate.isArray(tests)) {
				tests = { Tests: tests };
			}

			var fullResult = [];
			fullResult.push('<div>Pixate Api Test Results</div>')

			for (var x in tests) {

				var context;
				Pixate.each(tests[x], function(test) {
					if (test.context) {
						context = test.context;
					}
				});

				fullResult.push('<div class="test-group"><span class="test-group-title">'+x+'</span>')

				Pixate.each(tests[x], function(test) {
					
					if (!test.context) {

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
							testResult.push('<span id="'+testId+'" class="test-pending">Test running...</span>');
							testResult.push('</div>');
							
							fullResult.push(testResult.join(''));

							Pixate.delay(1, testRunner, [x, test, testId, context]);
						}
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
		},

		bundle: function(tests) {
			
			for (var x in tests) {
				if (!bundledTests[x]) {
					bundledTests[x] = [];
				}
				bundledTests[x] = bundledTests[x].concat(tests[x]);
			}
		},

		runBundledTests: function() {
			this.run(bundledTests);
		}
	}
}();
