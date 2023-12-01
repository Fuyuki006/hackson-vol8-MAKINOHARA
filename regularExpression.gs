function regularExpression(inputString) {
  var regex = /^[^,]+/;
  var match = inputString.match(regex);
  
  if (match) {
    return match[0];
  } else {
    return ''; 
  }
}