export const text_truncate = function(str, length=75, ending = '...') {
    if (str.length > length) {
      let temp = length - ending.length
      while(str[temp]!=" "){
      temp++}
      return str.substring(0, temp) + ending;
    } else {
      return str;
    }
  };