const { readFile } = require('node:fs/promises');

// IIFE (Immediately Invoked Function Expression) para usar async/await
(
  async () => {
    console.log('Leyendo el primer archivo...')
    const text = await readFile('./archivo.txt', 'utf-8')
    console.log('Primer texto:', text)

    console.log('Hacer cosas mientras se lee el archivo...')

    console.log('Leyendo el segundo archivo...')
    const secondText = await readFile('./archivo2.txt', 'utf-8')
    console.log('Segundo texto:', secondText)
  }
)()
