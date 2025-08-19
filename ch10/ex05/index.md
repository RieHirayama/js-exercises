# 問題

問題10.3, 10.4で作成したそれぞれのモジュールで、エクスポート元の関数・クラスをエディタのリファクタ機能で名前変更した際、インポート側で名前変更がどう追随されるか確認しなさい。
また、デフォルトエクスポート、名前変更を伴うインポート、再エクスポートについても名前変更時の挙動を確認すること。

# 回答

## ESM

### 名前変更を伴うインポート

実行操作：utils.jsのexport class DogのDogを選択してF2を押してAnimalDogに名前変更
結果：

- bridge.js：Dog部分がAnimalDogに自動更新（export { default as times2, AnimalDog as Puppy } from "./utils.js";）
- index.js：Dog部分がAnimalDogに自動更新(import dbl, { AnimalDog as DogClass } from "./utils.js";)

結論：import側・再エクスポート側まで自動追随。

### デフォルトエクスポート

実行操作：utils.jsのexport default function doubleのdoubleを選択してF2を押してtimesTwoに名前変更
結果：

- bridge.jsのdefault as times2は変わらない。
- index.jsのimport dbl from "./utils.js"のdblは変わらない。

結論：import側・再エクスポート側とも変化無し。

### 再エクスポート

実行操作：bridge.jsのdefault as times2のtimes2を選択してF2を押してtwiceに名前変更
結果：

- index.jsのtimes2部分がtwiceに自動更新（import { twice as t2, Puppy } from "./bridge.js";）

結論：import側まで自動追随。

## CommonJS

実行操作：simpleUtils.cjsの関数doubleをdblに、クラスDogをPetDogにF2で名前変更
結果：

- simpleUtils.js内のエクスポート文にキー名は変わらず対応付けが追加された。（module.exports = { double: dbl, Dog: PetDog };）
- index.jsには変化なし。

結論：simpleUtils.js内で内部名のリネームになった。
