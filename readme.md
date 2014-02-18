# object-assign [![Build Status](https://travis-ci.org/sindresorhus/object-assign.png?branch=master)](http://travis-ci.org/sindresorhus/object-assign)

> ES6 [`Object.assign()`](http://www.2ality.com/2014/01/object-assign.html) ponyfill

Should be pretty close to the spec.

> Ponyfill: A polyfill that doesn't overwrite the native method


## Install

Download [manually](https://github.com/sindresorhus/object-assign/releases) or with a package-manager.

#### [npm](https://npmjs.org/package/object-assign)

```
npm install --save object-assign
```

#### [Bower](http://bower.io)

```
bower install --save object-assign
```

#### [Component](https://github.com/component/component)

```
component install sindresorhus/object-assign
```


## Example

```js
objectAssign({foo: 0}, {bar: 1});
//=> {foo: 0, bar: 1}

// multiple sources
[{bar: 1}, {baz: 2}].reduce(objectAssign, {foo: 0});
//=> {foo: 0, bar: 1, baz: 2}
```


## API

### objectAssign(target, source)

Assigns enumerable own properties of the `source` object to the `target` object and returns the `target` object.


## Multiple sources

Unfortunately support for multiple sources aren't defined in the Object.assign spec.

However, you can easily achieve it with `[target, source, source, ...].reduce(objectAssign)`.


## Resources

- [ES6 spec - Object.assign](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign)


## License

MIT © [Sindre Sorhus](http://sindresorhus.com)
