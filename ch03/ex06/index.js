export function slice(str, indexStart, indexEnd) {
  let len = str.length;

  // スタート位置を決める
  if (indexStart === undefined || isNaN(indexStart)) {
    indexStart = 0;
  } else {
    indexStart = Math.floor(indexStart);
    if (indexStart < 0) {
      if(len + indexStart > 0){ 
        indexStart = len + indexStart;  
      } else { 
        indexStart = 0; 
      }
    } else {
      if(indexStart > len) {
        indexStart = len; 
      }
    }
  }

  // エンド位置を決める
  if (indexEnd === undefined) {
    indexEnd = len;
  } else if (isNaN(indexEnd)) {
    return "";
  } else {
    indexEnd = Math.floor(indexEnd);
    if (indexEnd < 0) {
      if(len + indexEnd > 0){ 
        indexEnd = len + indexEnd;  
      } else { 
        indexEnd = 0; 
      }
    } else {
      if(indexEnd > len) {
        indexEnd = len; 
      }
    }
  }

  // indexStart が indexEnd より大きい場合は空文字列を返す
  if (indexStart >= indexEnd) {
    return "";
  }

  let result = "";
  for (let i = indexStart; i < indexEnd; i++) {
    result += str[i];
  }
  return result;
}