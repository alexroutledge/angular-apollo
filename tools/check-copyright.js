/*
 * Copyright (c) 2017-2018 Veritas Technologies LLC.
 * All rights reserved.
 *
 * Veritas and the Veritas Logo are trademarks
 * or registered trademarks of Veritas Technologies LLC
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * IV49-4028-9371-66-15-7
 */

var path   = require('path');
var fs     = require('fs');
var globby = require('globby');

var HEADER_HTML =
      '<!--\n' +
      ' * Copyright (c) 2018 Veritas Technologies LLC.\n' +
      ' * All rights reserved.\n' +
      ' *\n' +
      ' * Veritas and the Veritas Logo are trademarks\n' +
      ' * or registered trademarks of Veritas Technologies LLC\n' +
      ' * or its affiliates in the U.S. and other countries.\n' +
      ' * Other names may be trademarks of their respective owners.\n' +
      ' *\n' +
      ' * IV49-4028-9371-66-15-7\n' +
      '-->';

var HEADER_OTHERS =
      '/*\n' +
      ' * Copyright (c) 2018 Veritas Technologies LLC.\n' +
      ' * All rights reserved.\n' +
      ' *\n' +
      ' * Veritas and the Veritas Logo are trademarks\n' +
      ' * or registered trademarks of Veritas Technologies LLC\n' +
      ' * or its affiliates in the U.S. and other countries.\n' +
      ' * Other names may be trademarks of their respective owners.\n' +
      ' *\n' +
      ' * IV49-4028-9371-66-15-7\n' +
      ' */';

var HEADER_HTML_REGEX    = /^\/\*\r?\n \* Copyright \(c\) 201[78](-2018)? Veritas Technologies LLC.\r?\n \* All rights reserved.\r?\n \*\r?\n \* Veritas and the Veritas Logo are trademarks\r?\n \* or registered trademarks of Veritas Technologies LLC\r?\n \* or its affiliates in the U.S. and other countries.\r?\n \* Other names may be trademarks of their respective owners.\r?\n \*\r?\n \* IV49-4028-9371-66-15-7\r?\n \*\//;
var HEADER2_OTHERS_REGEX = /^<!--\r?\n \* Copyright \(c\) 201[78](-2018)? Veritas Technologies LLC.\r?\n \* All rights reserved.\r?\n \*\r?\n \* Veritas and the Veritas Logo are trademarks\r?\n \* or registered trademarks of Veritas Technologies LLC\r?\n \* or its affiliates in the U.S. and other countries.\r?\n \* Other names may be trademarks of their respective owners.\r?\n \*\r?\n \* IV49-4028-9371-66-15-7\r?\n-->/;

runProgram();

function runProgram() {
  return Promise.resolve()
    .then(function () {
      return Promise.resolve()
        .then(function () {
          return getAffectedFilePaths();
        })
        .then(function (filePaths) {
          return testFiles(filePaths);
        })
        .then(function (invalidFilePaths) {
          if (invalidFilePaths.length > 0) {
            generateAndThrowError(invalidFilePaths);
          }
          else {
            console.log('All of the files have valid copyright statements and watermarks.');
          }
        });
    })
    .then(
      function () {
        process.exit(0);
      },
      function (err) {
        console.error('ERROR: ', err);
        process.exit(1);
      }
    );
}

function getAffectedFilePaths() {
  var rootDirectory = path.resolve(__dirname + '/..');
  return globby([rootDirectory + '/{src,tools}/**/*.{ts,js,scss,html}']);
}

function testFiles(filePaths) {
  var invalidFilePaths = [];

  return filePaths.reduce(function (promise, path) {
      return promise
        .then(function () {
          return {
            path:      path,
            extension: path.match(/\w+$/)[0],
            contents:  fs.readFileSync(path, {
              encoding: 'utf8'
            })
          };
        })
        .then(function (file) {
          if (
            (file.extension === 'html' && !HEADER2_OTHERS_REGEX.test(file.contents)) ||
            (['ts', 'js', 'scss'].includes(file.extension) && !HEADER_HTML_REGEX.test(file.contents))
          ) {
            invalidFilePaths.push(path);
          }
        });
    }, Promise.resolve())
    .then(function () {
      return invalidFilePaths;
    });
}

function generateAndThrowError(invalidFilePaths) {
  var error;
  error = 'One or more files do not contain the copyright statement and/or watermark: \n';
  error = invalidFilePaths.reduce(function (acc, invalidFilePath) {
    return acc + invalidFilePath + '\n';
  }, error);
  error += '\n';
  error += 'Copy the following to the very top of the files mentioned above.\n';
  error += '\n';
  error += 'For TS/JS/SCSS files:\n';
  error += HEADER_OTHERS + '\n';
  error += '\n';
  error += 'For HTML files:\n';
  error += HEADER_HTML + '\n';
  throw error;
}
