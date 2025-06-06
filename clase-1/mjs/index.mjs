// .js -> por defecto utiliza CommonJS
// .mjs -> por defecto utiliza ESM
// .cjs -> pora utilizar CommonJS

import { sum, sub, mul } from './sum.mjs'

console.log(sum(1, 2))
console.log(sub(5, 3))
console.log(mul(4, 2))
