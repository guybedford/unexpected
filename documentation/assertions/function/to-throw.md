Asserts that the function throws an error when called.

```javascript
function willThrow() {
  throw new Error('The error message');
}
expect(willThrow, 'to throw');
expect(willThrow, 'to throw error');
expect(willThrow, 'to throw exception');
```

In case of a failing expectation you get the following output:

```javascript
expect(function willNotThrow() {}, 'to throw');
```

```output
expected function willNotThrow() {} to throw
```

You can assert the error message is a given string if you provide a
string as the second parameter.

```javascript
expect(function () {
  throw new Error('The error message');
}, 'to throw', 'The error message');
```

In case of a failing expectation you get the following output:

```javascript
expect(function () {
  throw new Error('The error message!');
}, 'to throw', 'The error message');
```

```output
expected
function () {
  throw new Error('The error message!');
}
to throw 'The error message'
  expected 'The error message!' to equal 'The error message'

  -The error message!
  +The error message
```

By providing a regular expression as the second parameter you can
assert the error message matches the given regular expression.

```javascript
expect(function () {
  throw new Error('The error message');
}, 'to throw', /error message/);
```

In case of a failing expectation you get the following output:

```javascript
expect(function () {
  throw new Error('The error message!');
}, 'to throw', /catastrophic failure/);
```

```output
expected
function () {
  throw new Error('The error message!');
}
to throw /catastrophic failure/
  expected 'The error message!' to match /catastrophic failure/
```

You can also provide a function as the second parameter to do
arbitrary assertions on the error.

```javascript
expect(function () {
  this.foo.bar();
}, 'to throw', function (e) {
  expect(e, 'to be a', TypeError);
});
```

In case of a failing expectation you get the following output:

```javascript
expect(function () {
  throw new Error('Another error');
}, 'to throw', function (e) {
  expect(e, 'to be a', TypeError);
});
```

```output
expected Error({ message: 'Another error' }) to be a TypeError
```

This assertion can be negated using the `not` flag:

```javascript
expect(function () {
  // Do some work that should not throw
}, 'not to throw');
```

In case of a failing expectation you get the following output:

```javascript
expect(function () {
  throw new Error('threw anyway');
}, 'not to throw');
```

```output
expected
function () {
  throw new Error('threw anyway');
}
not to throw
  threw: Error({ message: 'threw anyway' })
```

You can also use the `not` flag in combination with matching the error
message.

```javascript
expect(function () {
  throw new Error('The correct error message');
}, 'not to throw', /great success/);
```

In case of a failing expectation you get the following output:

```javascript
expect(function () {
  throw new Error('The correct error message');
}, 'not to throw', /error/);
```

```output
expected
function () {
  throw new Error('The correct error message');
}
not to throw /error/
  expected 'The correct error message' not to match /error/

  The correct error message
```