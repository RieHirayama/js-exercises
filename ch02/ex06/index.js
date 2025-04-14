export function fizzbuzz() {let str=""; for(let i=1;i<=100;i++){if(i%3==0 && i%5==0){str += "FizzBuzz"}else if(i%3==0){str += "Fizz"}else if(i%5==0){str += "Buzz"}else {str += i};str+="\n"} return str;};

//for(let i=1;i<=100;i++){if(i%3==0 && i%5==0){console.log("FizzBuzz")}else if(i%3==0){console.log("Fizz")}else if(i%5==0){console.log("Buzz")}else {console.log(i)}}