var merge = function(a, b) {
  var aJSON = JSON.stringify(a);
  var bJSON = JSON.stringify(b);

  // take out trailing and leading curlies
  aJSON = aJSON.substr(0, aJSON.length - 1);
  bJSON = bJSON.substr(1);

  var joiner = '';
  if ((aJSON.length > 2) && (bJSON.length > 2)) {
    joiner = ',';
  }

  var cJSON = aJSON + joiner + bJSON;

  return JSON.parse(cJSON);
};

module.exports = merge;
