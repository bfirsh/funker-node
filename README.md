# Funker for Node.js

A Node.js implementation of [Funker](https://github.com/bfirsh/funker).

## Installation

    $ npm install --save funker

## Usage

Defining functions:

```javascript
var funker = require('funker');

funker.handle(function(args, callback) {
  callback(args.x + args.y);
});
```

Calling functions:

```javascript
var funker = require('funker');
funker.call("add", {x: 1, y: 2}, function(err, result) {
  console.log(result);
});
```
