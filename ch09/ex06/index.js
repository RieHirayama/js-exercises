// 継承を使ったTypedMapの実装
// class TypedMap extends Map {
//     constructor(KerType, valueType, entries){
//         if(entries){
//             for(let [k,v] of entries){
//                 if(typeof k !== KerType || typeof v !== valueType){ 
//                     throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
//                 }
//             }
//         }

//         super(entries);

//         this.KerType = KerType;
//         this.valueType = valueType;
//     }

//     set(key, value) {
//         if(this.keyType && typeof key !== this.keyType) {
//             throw new TypeError(`${key} is not of type ${this.keyType}`);
//         }
//         if(this.valueType && typeof value !== this.valueType) {
//             throw new TypeError(`${value} is not of type ${this.valueType}`);
//         }

//         return super.set(key, value);
//     }
// }

// コンポジションを使ったTypedMapの実装
export class TypedMap {
  constructor(keyType, valueType, entries) {
    this.keyType = keyType;
    this.valueType = valueType;
    this.map = new Map();

    if (entries) {
      for (const [k, v] of entries) {
        if (typeof k !== keyType || typeof v !== valueType) {
          throw new TypeError(`Wrong type for entry [${k}, ${v}]`);
        }
        this.map.set(k, v);
      }
    }
  }

  set(key, value) {
    if (this.keyType && typeof key !== this.keyType) {
      throw new TypeError(`${key} is not of type ${this.keyType}`);
    }
    if (this.valueType && typeof value !== this.valueType) {
      throw new TypeError(`${value} is not of type ${this.valueType}`);
    }
    this.map.set(key, value);
    return this;
  }

  get(key) {
    return this.map.get(key);
  }
}