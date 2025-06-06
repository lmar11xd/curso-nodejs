// Sistema de Módulos de JavaScript (ESM)
// moderno y lo que es recomendable utilizar

export function sum (a, b) {
  return a + b
}

export function sub (a, b) {
  return a - b
}

export function mul (a, b) {
  return a * b
}

export function div (a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed')
  }
  return a / b
}
