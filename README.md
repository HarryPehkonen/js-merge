# js-merge

Merge two JavaScript objects via JSON.

The idea is to only retain simple things like strings and numbers -- at most, what JSON supports.

This implementation probably embodies the opposite of efficiency.  But it's simple, and, as
long as you appreciate JSON, there shouldn't be any surprises.

## Usage

### Install

    $ npm install js-merge

### Code

    var jsmerge = require('js-merge');
    var a = {'a': {'b': {'c': 123}}};
    var b = {'timestamp': new Date()};
    var c = jsmerge(a, b);

## Inspiration

Inspired by [a StackOverflow answer](http://stackoverflow.com/a/2344174/1157037).
