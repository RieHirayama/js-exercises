import { parse } from 'acorn';

const sourceCode1 = `let a
a
=
3
console.log(a)`

const sourceCode2 = "let a; a = 3; console.log(a);"

const exeCode = `1+1`

const ast1 = parse(sourceCode1, { ecmaVersion: 2022 });
console.log(ast1);

const ast2 = parse(sourceCode2, { ecmaVersion: 2022 });
console.log(ast2);

const exeast = parse(exeCode, { ecmaVersion: 2022 });
console.log(exeast);


console.log(JSON.stringify(ast1, null, 2)); // AST を詳細に表示
console.log(JSON.stringify(ast2, null, 2)); // AST を詳細に表示
console.log(JSON.stringify(exeast, null, 2)); // AST を詳細に表示