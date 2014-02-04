'use strict';
var assert = require('assert');
var assign = require('./object-assign');

it('should assign own enumerable properties from source to target object', function () {
	assert.deepEqual(assign({foo: 0}, {bar: 1}), {foo: 0, bar: 1});
});

it('should throw on `null` and `undefined`', function () {
	assert.throws(function () {
		assign(null, {});
		assign({}, null);
		assign(undefined, {});
		assign({}, undefined);
	});
});
