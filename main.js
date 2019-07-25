var name = require('./package.json').name;

module.exports = function (fn, args) {
  if (!arguments.length || arguments.length > 2) {
    throw Error(name + ': Pass a function name and a key/value pair object only');
  }

  if (typeof fn !== 'string') {
    throw TypeError(name + ': First argument is a function name (string)');
  }

  if (args !== undefined && args !== null && typeof args !== 'object') {
    throw Error(name + ': Second argument must be falsy or a key/value pair object');
  }

  var values = [], dups = {};
  var pairs = Object.keys(args || {}).sort().map(function (key) {
    var value = args[key];
    if (!dups.hasOwnProperty(value)) {
      values.push(value);
      dups[value] = values.length;
    }

    return key + ' := $' + dups[value];
  });

  return [
    'select * from ' + fn + '(' + pairs.join(', ') + ')',
    values
  ];
};
