export function fib(n) {
    let previous1 = 1;
    let previous2 = 1;
    if(n <= 0) {
        return 0; // 0以下を入力されたときは0を返すようにした
    }
    else if(n <= 2) {
        return 1;
    }
    else {
        for(let i = 3; i <= n; i++) {
            let temp = previous1;
            previous1 += previous2;
            previous2 = temp;
        }
        return previous1;
    }

}