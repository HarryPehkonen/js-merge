var jsmerge = require ('../js-merge.js');
var expect = require('chai').expect;

describe('merge', function() {

  it('two empty objects should result in another empty object', function() {
    var a = {};
    var b = {};
    var c = jsmerge(a, b);
    expect(c).to.be.an('object');
    expect(Object.keys(c)).to.have.length(0);
  });

  it("merging with an empty object doesn't change much", function() {
    var a = {'a': 1};
    var b = {};
    var c = jsmerge(a, b);
    expect(Object.keys(c)).to.have.length(1);
    expect(c).to.have.property('a');

    // the other way
    c = jsmerge(b, a);
    expect(Object.keys(c)).to.have.length(1);
    expect(c).to.have.property('a');
  });

  it('merging two simple objects', function() {
    var a = {'a': 6};
    var b = {'b': 12};
    var c = jsmerge(a, b);
    expect(Object.keys(c)).to.have.length(2);
    expect(c).to.have.property('a');
    expect(c).to.have.property('b');
  });

  it("having sub-objects shouldn't be a problem", function() {
    var a = {'a': {'aa': 1}};
    var b = {'b': {'bb': {'bbb': 27}}};
    var c = jsmerge(a, b);
    expect(Object.keys(c)).to.have.length(2);
    expect(c).to.have.property('a');
    expect(c).to.have.property('b');
    expect(c.a).to.have.property('aa');
    expect(c.b).to.have.property('bb');
    expect(c.b.bb).to.have.property('bbb');
    expect(c.b.bb.bbb).to.equal(27);
  });

  it("functions don't get duplicated", function() {
    var a = {'a': function() {}};
    var b = {};
    var c = jsmerge(a, b);
    expect(Object.keys(c)).to.have.length(0);
    expect(c).to.be.an('object');
  });

  it("Dates get stringified via .toJSON()", function() {
    var d = new Date();
    d.setUTCFullYear(2014);
    d.setUTCMonth(0);
    d.setUTCDate(1);
    d.setUTCHours(2);
    d.setUTCMinutes(34);
    d.setUTCSeconds(56);
    d.setUTCMilliseconds(789);
    var a = {'a': d};
    var b = {};
    var c = jsmerge(a, b);
    expect(Object.keys(c)).to.have.length(1);
    expect(c.a).to.equal('2014-01-01T02:34:56.789Z');
    expect(c.a).to.equal(d.toJSON());
  });

  it("throwing in an array should blow things up", function() {
    var a = {};
    var b = [];
    expect(function() {jsmerge(a, b)}).to.throw(SyntaxError);;
    expect(function() {jsmerge(b, a)}).to.throw(SyntaxError);;
  });
});
