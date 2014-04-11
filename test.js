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
		assign({}, undefined, null);
	});
});

it('should support multiple sources', function () {
	assert.deepEqual(assign({foo: 0}, {bar: 1}, {bar: 2}), {foo: 0, bar: 2});
	assert.deepEqual(assign({}, {}, {foo: 1}), {foo: 1});
});

it('should only iterate own keys', function () {
	var Unicorn = function () {};
	Unicorn.prototype.rainbows = 'many';
	var unicorn = new Unicorn();
	unicorn.bar = 1;

	assert.deepEqual(assign({foo: 1}, unicorn), {foo: 1, bar: 1});
});
