// テンプレートオブジェクトに存在しないプロパティをあるオブジェクトから削除する restrict()関数
export function restrict(target, template) {
  for (const key of Object.keys(target)) {
    if (!template.hasOwnProperty(key)) {
      delete target[key];
    }
  }
  return target;
}

// あるオブジェクトのプロパティを別のオブジェクトから削除する substract() 関数
export function substract(target, ...sources) {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      delete target[key];
    }
  }
  return target;
}