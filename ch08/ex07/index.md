## 問題 8.7

https://www.ricoh.co.jp を開き、ロードされている js ファイル中で名前空間としての関数の即時関数実行式を使っている js ファイルを 1 つ以上見つけて URL を記載しなさい。

ヒント: ロードされている js ファイル一覧は Chrome ではデベロッパーツールを開き"ソース"タブから確認できる

### 回答

- https://www.ricoh.co.jp/-/Media/Ricoh/Common/cmn_g_header_footer/js/template.js  
  ((win, doc) => { ... })(window, document);  
  アロー関数によるIIFE

- https://www.ricoh.co.jp/-/Media/ScAssets/System/JS/common.js  
  (function($){ ... })(jQuery);  
  function型によるIIFE
