/*
 * Copyright (c) 2017 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
 */

var path         = require('path');
var fs           = require('fs');
var translate    = require('google-translate-api');
var _            = require('lodash');
var nyanProgress = require('nyan-progress');

var IS_IN_TESTING_MODE     = false;
var EXIT_TIME_INTERVAL     = 400;
var PROGRESS_TIME_INTERVAL = 200;
var SOURCE_LANG_LONG       = 'en-US';
var SOURCE_LANG_GOOGLE     = 'en';
var DEST_LANG_LONG         = 'it';
var DEST_LANG_GOOGLE       = 'it';
var FINISHED_MESSAGE       = 'Finished translating from "' + SOURCE_LANG_LONG + '" to "' + DEST_LANG_LONG + '"';
var ERROR_MESSAGE          = 'Failed to translate from "' + SOURCE_LANG_LONG + '" to "' + DEST_LANG_LONG + '".';
var DOWNLOADING_MESSAGE    = 'Translating from "' + SOURCE_LANG_LONG + '" to "' + DEST_LANG_LONG + '"...';

var sourceFilePath = path.join(__dirname, '../src/client/assets/i18n/' + SOURCE_LANG_LONG + '.json');
var destFilePath   = path.join(__dirname, '../src/client/assets/i18n/' + DEST_LANG_LONG + '.json');

return Promise.resolve()
  .then(function () {
    if (!IS_IN_TESTING_MODE) {
      var sourceTranslations;
      var destTranslations;
      var addedTranslations;
      var removedTranslations;
      var destTranslationsAsJSONString;
      var progress;
      var counterCurrent;
      var counterTotal;

      return Promise.resolve()
        .then(function () {
          progress           = nyanProgress();
          counterCurrent     = 0;
          counterTotal       = 0;
          sourceTranslations = require(sourceFilePath);
          try {
            destTranslations = require(destFilePath);
          }
          catch (e) {}
        })
        .then(function () {
          if (_.isNil(destTranslations)) {
            destTranslations    = {};
            addedTranslations   = sourceTranslations;
            removedTranslations = {};
          }
          else {
            return Promise.resolve()
              .then(function () {
                return subtractMaps(sourceTranslations, destTranslations).then(function (result) {
                  addedTranslations = result;
                });
              })
              .then(function () {
                return subtractMaps(destTranslations, sourceTranslations).then(function (result) {
                  removedTranslations = result;
                });
              });
          }
        })
        .then(function () {
          return countElementsOfMap(addedTranslations).then(function (result) {
            counterTotal = result;
          });
        })
        .then(function () {
          progress.start({
            total:          counterTotal || 1,
            renderThrottle: PROGRESS_TIME_INTERVAL,
            message:        {
              downloading: DOWNLOADING_MESSAGE,
              error:       ERROR_MESSAGE,
              finished:    FINISHED_MESSAGE
            }
          }).then(function () {
            console.log('Output: ' + destFilePath);
          });

          if (counterTotal === 0) {
            progress.tick();
          }
        })
        .then(function () {
          return translateElementsOfMap(addedTranslations, function () {
            counterCurrent++;
            progress.tick();
          });
        })
        .then(function (addedTranslatedTranslations) {
          return Promise.resolve()
            .then(function () {
              return deepAsyncMap(addedTranslatedTranslations, function (item, path) {
                _.set(destTranslations, path, item);
              });
            })
            .then(function () {
              return deepAsyncMap(removedTranslations, function (item, path) {
                _.unset(destTranslations, path);
              });
            })
            .then(function () {
              destTranslationsAsJSONString = JSON.stringify(destTranslations, null, '\t');
              fs.writeFileSync(destFilePath, destTranslationsAsJSONString, { flag: 'w' });
            });
        });
    }
    else {
      var sourceStr                    = 'This is a {xxx { important } test } {another}.';
      var groups                       = ['{xxx { important } test }', '{another}'];
      var strippedStr                  = 'This is a {} {}.';
      var restoredStr                  = sourceStr;
      var multipleGroupTypeStr         = 'One < two { three } > <four> {five} { six < seven > } eight';
      var multipleGroupTypeStrippedStr = 'One <> <> {} {} eight';

      return Promise.resolve()
        .then(function () {
          var testName  = 'getGroupsWithinBrackets()';
          var actGroups = getGroupsWithinBrackets(sourceStr);
          var expGroups = groups;
          if (!_.isEqual(actGroups, expGroups)) {
            console.log('actGroups: ', JSON.stringify(actGroups));
            console.log('expGroups: ', JSON.stringify(expGroups));
            throw 'TEST FAILED: ' + testName;
          }
          else {
            console.log('TEST PASSED: ' + testName);
          }
        })
        .then(function () {
          var testName       = 'replaceGroupsWithinBrackets() with items to replace';
          var actRestoredStr = replaceGroupsWithinBrackets(strippedStr, groups);
          var expRestoredStr = restoredStr;
          if (!_.isEqual(actRestoredStr, expRestoredStr)) {
            console.log('actRestoredStr: ', JSON.stringify(actRestoredStr));
            console.log('expRestoredStr: ', JSON.stringify(expRestoredStr));
            throw 'TEST FAILED: ' + testName;
          }
          else {
            console.log('TEST PASSED: ' + testName);
          }
        })
        .then(function () {
          var testName       = 'replaceGroupsWithinBrackets() with no items to replace';
          var actStrippedStr = replaceGroupsWithinBrackets(sourceStr);
          var expStrippedStr = strippedStr;
          if (!_.isEqual(actStrippedStr, expStrippedStr)) {
            console.log('actStrippedStr: ', JSON.stringify(actStrippedStr));
            console.log('expStrippedStr: ', JSON.stringify(expStrippedStr));
            throw 'TEST FAILED: ' + testName;
          }
          else {
            console.log('TEST PASSED: ' + testName);
          }
        })
        .then(function () {
          var testName = 'prepareTranslation()';
          var actStr   = prepareTranslation(multipleGroupTypeStr).groomedSourceTranslation;
          var expStr   = multipleGroupTypeStrippedStr;
          if (!_.isEqual(actStr, expStr)) {
            console.log('actStr: ', JSON.stringify(actStr));
            console.log('expStr: ', JSON.stringify(expStr));
            throw 'TEST FAILED: ' + testName;
          }
          else {
            console.log('TEST PASSED: ' + testName);
          }
        })
        .then(function () {
          var testName        = 'prepareTranslation() and finalizeTranslation()';
          var translationPrep = prepareTranslation(multipleGroupTypeStr);
          var actStr          = finalizeTranslation(translationPrep.groomedSourceTranslation, translationPrep);
          var expStr          = multipleGroupTypeStr;
          if (!_.isEqual(actStr, expStr)) {
            console.log('actStr: ', JSON.stringify(actStr));
            console.log('expStr: ', JSON.stringify(expStr));
            throw 'TEST FAILED: ' + testName;
          }
          else {
            console.log('TEST PASSED: ' + testName);
          }
        })
        .then(function () {
          var testName        = 'deepAsyncMap()';
          var sourceMap       = {
            'TEST1': 'Test1',
            'TEST2': [
              'Test 21',
              'Test 22',
              {
                'TEST231': 'Test 231',
                'TEST232': 'Test 232'
              }
            ],
            'TEST3': {
              'TEST31': 'Test 31',
              'TEST32': 'Test 32',
              'TEST33': [
                'Test 331',
                'Test 332'
              ]
            }
          };
          var expProcessedMap = {
            'TEST1': 'xTest1',
            'TEST2': [
              'xTest 21',
              'xTest 22',
              {
                'TEST231': 'xTest 231',
                'TEST232': 'xTest 232'
              }
            ],
            'TEST3': {
              'TEST31': 'xTest 31',
              'TEST32': 'xTest 32',
              'TEST33': [
                'xTest 331',
                'xTest 332'
              ]
            }
          };
          return Promise.resolve()
            .then(function () {
              return deepAsyncMap(_.cloneDeep(sourceMap), function (item) {
                return 'x' + item;
              });
            })
            .then(function (actProcessedMap) {
              if (!_.isEqual(actProcessedMap, expProcessedMap)) {
                console.log('actProcessedMap: ', JSON.stringify(actProcessedMap));
                console.log('expProcessedMap: ', JSON.stringify(expProcessedMap));
                throw 'TEST FAILED: ' + testName;
              }
              else {
                console.log('TEST PASSED: ' + testName);
              }
            });
        })
        .then(function () {
          var testName  = 'countElementsOfMap()';
          var sourceMap = {
            'TEST1': 'Test1',
            'TEST2': [
              'Test 21',
              'Test 22',
              {
                'TEST241': 'Test 231',
                'TEST232': 'Test 232'
              }
            ],
            'TEST3': {
              'TEST31': 'Test 31',
              'TEST32': 'Test 32',
              'TEST33': [
                'Test 331',
                'Test 332'
              ]
            }
          };
          var expCount  = 9;
          return Promise.resolve()
            .then(function () {
              return countElementsOfMap(sourceMap);
            })
            .then(function (actCount) {
              if (!_.isEqual(actCount, expCount)) {
                console.log('actCount: ', JSON.stringify(actCount));
                console.log('expCount: ', JSON.stringify(expCount));
                throw 'TEST FAILED: ' + testName;
              }
              else {
                console.log('TEST PASSED: ' + testName);
              }
            });
        })
        .then(function () {
          var testName        = 'subtractMaps()';
          var sourceMap1      = {
            'TEST1': 'Test1',
            'TEST2': [
              'Test 21',
              {
                'TEST221': 'Test 221'
              }
            ],
            'TEST3': {
              'TEST31': 'Test 31',
              'TEST32': [
                'Test 321',
                'Test 322'
              ]
            }
          };
          var sourceMap2      = {
            'TEST1': 'Test1',
            'TEST2': [
              'Test 21',
              {
                'TEST222': 'Test 222'
              },
              'Test 23'
            ],
            'TEST3': {
              'TEST31': 'Test 31',
              'TEST32': [
                'Test 322'
              ]
            },
            'TEST4': 'Test4'
          };
          var expProcessedMap = {
            'TEST2': [
              {
                'TEST221': 'Test 221'
              }
            ],
            'TEST3': {
              'TEST32': [
                'Test 322'
              ]
            }
          };
          return Promise.resolve()
            .then(function () {
              return subtractMaps(_.cloneDeep(sourceMap1), _.cloneDeep(sourceMap2));
            })
            .then(function (actProcessedMap) {
              if (!_.isEqual(actProcessedMap, expProcessedMap)) {
                console.log('actProcessedMap: ', JSON.stringify(actProcessedMap));
                console.log('expProcessedMap: ', JSON.stringify(expProcessedMap));
                throw 'TEST FAILED: ' + testName;
              }
              else {
                console.log('TEST PASSED: ' + testName);
              }
            });
        })
        .then(function () {
          console.log('All tests passed.');
        });
    }
  })
  .then(
    function () {
      setTimeout(function () {
        process.exit(0);
      }, EXIT_TIME_INTERVAL);
    },
    function (err) {
      setTimeout(function () {
        console.error('ERROR: ', err);
        process.exit(1);
      }, EXIT_TIME_INTERVAL);
    }
  );

function translateElementsOfMap(map, progressFn) {
  return deepAsyncMap(map, function (sourceItem) {
    var translationPrep = prepareTranslation(sourceItem);
    return translate(translationPrep.groomedSourceTranslation, { from: SOURCE_LANG_GOOGLE, to: DEST_LANG_GOOGLE })
      .then(function (destItemResponse) {
        var destItem = destItemResponse.text;
        var result;
        return Promise.resolve()
          .then(function () {
            result = finalizeTranslation(destItem, translationPrep);
          })
          .then(function () {
            return progressFn(destItem);
          })
          .then(function () {
            return result;
          });
      });
  });
}

function prepareTranslation(sourceItem) {
  var groomedSourceTranslation = sourceItem;
  var bracketsGroups           = getGroupsWithinBrackets(groomedSourceTranslation);
  groomedSourceTranslation     = replaceGroupsWithinBrackets(groomedSourceTranslation);
  var htmlGroups               = getGroupsWithinHTMLTags(groomedSourceTranslation);
  groomedSourceTranslation     = replaceGroupsWithinHTMLTags(groomedSourceTranslation);
  return {
    groomedSourceTranslation: groomedSourceTranslation,
    bracketsGroups:           bracketsGroups,
    htmlGroups:               htmlGroups
  };
}

function finalizeTranslation(translation, translationPrep) {
  var result;
  result = translation;
  result = replaceGroupsWithinHTMLTags(result, translationPrep.htmlGroups);
  result = replaceGroupsWithinBrackets(result, translationPrep.bracketsGroups);
  return result;
}

function countElementsOfMap(map) {
  var counter = 0;
  return Promise.resolve()
    .then(function () {
      return deepAsyncMap(map, function () {
        counter++;
      });
    })
    .then(function () {
      return counter;
    });
}

function subtractMaps(mapWithMoreItems, mapOther) {
  var subtractMap = {};
  return Promise.resolve()
    .then(function () {
      return deepAsyncMap(mapWithMoreItems, function (item, currentPath) {
        if (_.isNil(_.get(mapOther, currentPath))) {
          _.set(subtractMap, currentPath, item);
          var currentPathSplit = currentPath.match(/\[.*?\]/g);
          _.times(currentPathSplit.length - 1, function (i) {
            i++;
            var ancestorPath = _.slice(currentPathSplit, 0, i).join('');
            var ancestor     = _.get(subtractMap, ancestorPath);
            if (_.isArray(ancestor)) {
              _.set(subtractMap, ancestorPath, _.compact(ancestor));
            }
          });
        }
      });
    })
    .then(function () {
      return subtractMap;
    });
}

function deepAsyncMap(item, mapFn, currentPath) {
  if (!currentPath) {
    currentPath = '';
  }
  return Promise.resolve()
    .then(function () {
      if (_.isArray(item) || _.isPlainObject(item)) {
        return Promise.all(
          _.map(item, function (childItem, childItemKey, item) {
            return Promise.resolve()
              .then(function () {
                var newPath = currentPath + '[' +
                  (_.isString(childItemKey) ? '"' + childItemKey + '"' : childItemKey) +
                  ']';
                return deepAsyncMap(childItem, mapFn, newPath);
              })
              .then(function (result) {
                if (!_.isUndefined(result)) {
                  item[childItemKey] = result;
                }
              });
          })
        ).then(function () {
          return item;
        });
      }
      else if (_.isString(item)) {
        return mapFn(item, currentPath);
      }
      else {
        throw 'Unexpected input for path "' + currentPath + '".';
      }
    });
}

function getGroupsWithinBrackets(string) {
  return getGroups(string, '{', '}');
}

function getGroupsWithinHTMLTags(string) {
  return getGroups(string, '<', '>');
}

function getGroups(string, sepStart, sepEnd) {
  var result      = [];
  var charCounter = 0;
  var indexStart;
  for (var i = 0; i < string.length; i++) {
    var charCurr = string[i];
    if (charCurr === sepStart) {
      if (charCounter === 0) {
        indexStart = i;
      }
      charCounter++;
    }
    else if (charCurr === sepEnd) {
      if (charCounter === 1) {
        result.push(string.substring(indexStart, i + 1));
      }
      if (charCounter > 0) {
        charCounter--;
      }
    }
  }
  if (charCounter > 0) {
    throw 'Failed to find groups for string: ' + string;
  }
  return result;
}

function replaceGroupsWithinBrackets(string, itemsToReplaceWith) {
  return replaceGroups(string, '{', '}', itemsToReplaceWith, '{}');
}

function replaceGroupsWithinHTMLTags(string, itemsToReplaceWith) {
  return replaceGroups(string, '<', '>', itemsToReplaceWith, '<>');
}

function replaceGroups(string, sepStart, sepEnd, itemsToReplaceWith, replaceWithDefault) {
  var nrOfItemsToReplace;
  if (!_.isUndefined(itemsToReplaceWith)) {
    nrOfItemsToReplace = itemsToReplaceWith.length;
  }
  var result         = string;
  var replaceCounter = 0;
  var charCounter    = 0;
  var indexStart;
  for (var i = 0; i < string.length && (!nrOfItemsToReplace || replaceCounter < nrOfItemsToReplace); i++) {
    var charCurr = string[i];
    if (charCurr === sepStart) {
      if (charCounter === 0) {
        indexStart = i;
      }
      charCounter++;
    }
    else if (charCurr === sepEnd) {
      if (charCounter === 1) {
        var charDiff          = string.length - result.length;
        var itemToReplaceWith = !_.isUndefined(itemsToReplaceWith) ? itemsToReplaceWith[replaceCounter] : replaceWithDefault;
        result                = result.substring(0, indexStart - charDiff) + itemToReplaceWith + result.substring(i + 1 - charDiff);
        replaceCounter++;
      }
      if (charCounter > 0) {
        charCounter--;
      }
    }
  }
  if (charCounter > 0) {
    throw 'Failed to replace groups for string: ' + string;
  }
  return result;
}
