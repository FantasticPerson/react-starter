module.exports = function(str) {
  if(!str) return str;

  var s = '';

  var len = str.length;
  for(var i = 0; i < len; i++) {
    s += '\\u' + fillZero(str.charCodeAt(i).toString(16))
  }

  return s;
};

function fillZero(str) {
  while(str.length != 4) {
    str = '0' + str;
  }

  return str;
}
