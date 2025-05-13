// 初項と第 2 項を 1 とするフィボナッチ数列 (1, 1, 2, 3, ...) の最初の 10 個を配列として返す関数を、while 文によるループを使って書きなさい。

export function fibonacciWhile() {
    const result = [1, 1];
    let i = 2;
    while (i < 10) {
        result[i] = result[i - 1] + result[i - 2];
        i++;
    }
    return result;
}

// 同様に、do/while 文を使って書きなさい。
export function fibonacciDoWhile() {
    const result = [1, 1];
    let i = 2;
    do {
        result[i] = result[i - 1] + result[i - 2];
        i++;
    } while (i < 10);
    return result;
}

// 同様に、for 文を使って書きなさい。
export function fibonacciFor() {
    const result = [1, 1];
    for (let i = 2; i < 10; i++) {
        result[i] = result[i - 1] + result[i - 2];
    }
    return result;
}