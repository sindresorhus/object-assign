'use strict';
var assert = require('assert');
var assign = require('./');

it('should have the correct length', function () {
	assert.equal(assign.length, 2);
});

it('should throw when target is not an object', function () {
	assert.throws(function () { assign(null); }, TypeError);
	assert.throws(function () { assign(undefined); }, TypeError);
});

it('should assign own enumerable properties from source to target object', function () {
	assert.deepEqual(assign({foo: 0}, {bar: 1}), {foo: 0, bar: 1});
	assert.deepEqual(assign({foo: 0}, null, undefined), {foo: 0});
	assert.deepEqual(assign({foo: 0}, null, undefined, {bar: 1}, null), {foo: 0, bar: 1});
});

it('should throw on null/undefined target', function () {
	assert.throws(function () {
		assign(null, {});
	});

	assert.throws(function () {
		assign(undefined, {});
	});

	assert.throws(function () {
		assign(undefined, undefined);
	});
});

it('should not throw on null/undefined sources', function () {
	assert.doesNotThrow(function () {
		assign({}, null);
	});

	assert.doesNotThrow(function () {
		assign({}, undefined);
	});

	assert.doesNotThrow(function () {
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

it('should return the modified target object', function () {
	var target = {};
	var returned = assign(target, { a: 1 });
	assert.equal(returned, target);
});
