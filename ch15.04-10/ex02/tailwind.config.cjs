module.exports = {
  // NOTE: 同じディレクトリ内で拡張子が .html と .js のファイルを元に CSS ファイルを生成する、という設定
  content: ["./*.{html,js}"],
  safelist: [  //たとえ content から検出できなくても、ここに記載のクラスだけは必ずCSSを出す
    "line-through",
    "text-slate-400",
    "italic",
    "opacity-75",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
