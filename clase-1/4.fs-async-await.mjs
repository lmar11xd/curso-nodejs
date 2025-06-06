// Async y Await con Promesas solo funciona en ESM
// Así que, para este ejemplo, se utilizará el módulo 'fs/promises' de Node.js.
import { readFile } from 'node:fs/promises'

console.log('Leyendo el primer archivo...')
const text = await readFile('./archivo.txt', 'utf-8')
console.log('Primer texto:', text)

console.log('Hacer cosas mientras se lee el archivo...')

console.log('Leyendo el segundo archivo...')
const secondText = await readFile('./archivo2.txt', 'utf-8')
console.log('Segundo texto:', secondText)
