// Async y Await con Promesas solo funciona en ESM
// Así que, para este ejemplo, se utilizará el módulo 'fs/promises' de Node.js.
import { readFile } from 'node:fs/promises'

Promise.all([
  readFile('./archivo.txt', 'utf-8'),
  readFile('./archivo2.txt', 'utf-8')
])
  .then(([text, secondText]) => {
    console.log('Primer texto:', text)
    console.log('Segundo texto:', secondText)
  })
  .catch((err) => {
    console.error('Error al leer los archivos:', err)
  })
