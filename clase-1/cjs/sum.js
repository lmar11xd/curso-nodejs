function sum (a, b) {
  return a + b
}

// CommonJS module exports

// 1. Forma
// module.exports = sum
// const sum = require('./sum');

// 2. Forma
module.exports = {
  sum // o sum: sum
}
