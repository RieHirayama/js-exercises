// try-catch-finally の実行順序確認用コード

try {
  console.log('try start'); 
  throw new Error('エラーが発生しました');
}catch (e) {
  console.log('catch start'); 
  console.log(e.message); 
  console.log('catch end'); 
}
finally {
  console.log('finally start'); 
  console.log('finally end'); 
}

// try start
// catch start
// エラーが発生しました
// catch end
// finally start
// finally end