cssm
=======

A node.js module that minimize CSS files.
It uses a port of YUICompressor made in JavaScript by Stoyan Stefanov based on Isaac Schlueter work.
For more informations about YUICompressor → https://github.com/yui/yuicompressor

## Install

```bash
$ npm install cssm -g
```

## Usage

### Command line

```bash
$ cssm css/*.css -s -min -c gbk
```

### Module

```js
var CSSM = require( 'cssm' );
var cssList = [ 'a,css', 'b.css' ];  // Or, just use 'a.js' for single file.
var charset = 'gbk';
var suffix = '-min';

CSSM.compress({
    input: cssList,
    charset: charset,
    suffix: suffix
});
```
### Help

use `cssm --help` to see all the params:

```bash
  Usage: cssm [options]

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -c, --charset [value]  The charset encoding to use when compress your file.
    -s, --suffix [value]   Suffix that the compressed file will be add.
```


