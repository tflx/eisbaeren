var fs = require('fs');

/**
 * Read file, and detect all global assignments. Make sure these are exported correctly server side
 * @param fileIn
 * @param fileOut
 * @returns {string}
 */
function exportGlobalVars(fileIn, fileOut) {
  var exports = fs.readFileSync(fileIn, 'utf8');
  var globalRegx = /^global.(\w+)/gm;
  var globals = getMatches(exports, globalRegx, 1);

  var str = '\n';
  for (var i = 0; i < globals.length; i++) {
    str += 'var ' + globals[i] + ' = global.' + globals[i] + ';\n';
  }

  //Expose the global vars
  if (fileOut) {
    fs.appendFileSync(fileOut, str, 'utf8');
  }

  return str;
}

function getMatches(string, regex, index) {
  index || (index = 1); // default to the first capturing group
  var matches = [];
  var match;
  while (match = regex.exec(string)) {
    matches.push(match[index]);
  }
  return matches;
}

module.exports = exportGlobalVars;