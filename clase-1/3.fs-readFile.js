const fs = require('node:fs') // A partir de Node.js v14, se recomienda usar 'node:fs' para módulos nativos

// Sincrónico
console.log('Leyendo el primer archivo...')
const text = fs.readFileSync('./archivo.txt', 'utf-8')
console.log(text)

// Asincrónico - Con callback
console.log('Leyendo el segundo archivo...')
fs.readFile('./archivo2.txt', 'utf-8', (err, text) => {
  if (err) {
    console.error('Error al leer el archivo:', err)
    return
  }

  console.log(text)
})
