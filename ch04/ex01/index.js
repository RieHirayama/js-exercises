// 実部と虚部をプロパティとして持つ 2 つの複素数オブジェクトを引数として四則演算の結果を返す関数 `add`、`sub`、`mul`、`div` を実装

export function add(c1, c2) {
    return { real: c1.real + c2.real, imag: c1.imag + c2.imag };
}

export function sub(c1, c2) {
    return { real: c1.real - c2.real, imag: c1.imag - c2.imag };
}

export function mul(c1, c2) {
    return { real: c1.real * c2.real - c1.imag * c2.imag, imag: c1.real * c2.imag + c1.imag * c2.real };
}

export function div(c1, c2) {
    return { real: (c1.real * c2.real + c1.imag * c2.imag) / (c2.real**2 + c2.imag**2), imag: (c1.imag * c2.real - c1.real * c2.imag) / (c2.real**2 + c2.imag**2) };
}  