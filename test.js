const nfa = require('./main');
const expect = require('chai').expect;
const { name } = require('./package.json');

describe(name, () => {
  it('works with only function name', () => {
    const result = nfa('foo');
    expect(result).to.deep.equal([
      'select * from foo()',
      []
    ]);
  });

  it('works with one argument', function () {
    const result = nfa('foo', { a: 'a' });
    expect(result).to.deep.equal([
      'select * from foo(a := $1)',
      [ 'a' ]
    ]);
  });

  it('works with two arguments', function () {
    const result = nfa('foo', { a: 'a', b: 'b' });
    expect(result).to.deep.equal([
      'select * from foo(a := $1, b := $2)',
      [ 'a', 'b' ]
    ]);
  });

  it('deduplicates its arguments', function () {
    const result = nfa('foo', { a: 'a', b: 'a' });
    expect(result).to.deep.equal([
      'select * from foo(a := $1, b := $1)',
      [ 'a' ]
    ]);
  });

  it('works with `new Object`', function () {
    const args = new Object;
    args.a = 'a';
    args.b = 'b';
    const result = nfa('foo', args);
    expect(result).to.deep.equal([
      'select * from foo(a := $1, b := $2)',
      ['a', 'b']
    ]);
  });

  it('fails on zero arguments', function () {
    expect(nfa).to.throw();
  });

  it('fails on non-string function name', function () {
    expect(() => nfa(10)).to.throw();
    expect(() => nfa({ a: 'a' })).to.throw();
  });

  it('fails on more than two arguments', function () {
    expect(() => nfa('foo', {}, {})).to.throw();
  });

  it('fails on non-object as second argument', function () {
    expect(() => nfa('foo', 'bar')).to.throw();
  });
})
