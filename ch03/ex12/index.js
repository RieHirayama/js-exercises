class Example {
    valueOf() {
      return 1234;
    }
  
    toString() {
      return "test";
    }
}
  
let obj = new Example();
console.log("" + obj);
console.log(String(obj));