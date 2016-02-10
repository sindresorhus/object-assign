# object-assign [![Build Status](https://travis-ci.org/sindresorhus/object-assign.svg?branch=master)](https://travis-ci.org/sindresorhus/object-assign)

> ES6 [`Object.assign()`](http://www.2ality.com/2014/01/object-assign.html) ponyfill

> Ponyfill: A polyfill that doesn't overwrite the native method


## Install

```sh
$ npm install --save object-assign
```


## Usage

### Node.js

```js
var objectAssign = require('object-assign');

objectAssign({foo: 0}, {bar: 1});
//=> {foo: 0, bar: 1}

// multiple sources
objectAssign({foo: 0}, {bar: 1}, {baz: 2});
//=> {foo: 0, bar: 1, baz: 2}

// overwrites equal keys
objectAssign({foo: 0}, {foo: 1}, {foo: 2});
//=> {foo: 2}

// ignores null and undefined sources
objectAssign({foo: 0}, null, {bar: 1}, undefined);
//=> {foo: 0, bar: 1}
```


### Browser

If `Object.assign` is undefined in the browser, it will be reassigned with the polyfill. It can be used as follows:

```js
var myObject = { foo: 0, bar: 1 };
Object.assign({}, myObject, { foo: 1, baz: 3 });
// => Object { foo: 1, bar: 1, baz: 3 }
```


## API

### objectAssign(target, source, [source, ...])

Assigns enumerable own properties of `source` objects to the `target` object and returns the `target` object. Additional `source` objects will overwrite previous ones.

## Tests

Run ES Lint and Mocha tests:

```
npm test
```

Run JSHint:

```
npm run jshint
```


## Resources

- [ES6 spec - Object.assign](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign)


## Related

- [deep-assign](https://github.com/sindresorhus/deep-assign) - Recursive `Object.assign()`


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
