node-postgres-named-function-arguments
===================

[![Build Status](https://travis-ci.org/snorkypie/node-postgres-named-function-arguments.svg?branch=master)](https://travis-ci.org/snorkypie/node-postgres-named-function-arguments)

Named function arguments for node-postgres

Install with [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/):

```bash
# via npm
$ npm install node-postgres-named-function-arguments

# via yarn (automatically saves the package to your `dependencies` in package.json)
$ yarn add node-postgres-named-function-arguments
```

## Usage

```javascript
import nfa from 'node-postgres-named-function-arguments';
client.query(...nfa('get_user', { _username: 'snorkypie' }));
```

and

```javascript
var nfa = require('node-postgres-named-function-arguments');
var sql = nfa('get_user', { _username: 'snorkypie' });
client.query(sql[0], sql[1]);
```

would be the same as...

```javascript
client.query('select * from get_user(_username := $1)', [ 'snorkypie' ]);
```

## Rationale

This package solves two major problems with a lot of the solutions out there.

1. Target a specific overloaded function
2. Target specific arguments where default values are used
