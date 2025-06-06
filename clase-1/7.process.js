// Argumentos de entrada
console.log(process.argv) // Comando: node 7.process.js hola -t dev

// Controlar el proceso y su salida
// process.exit(1)

// Controlar eventos del proceso
// process.on('exit', (code) => {
// console.log(`El proceso ha finalizado con el código: ${code}`)
// })

// Current working directory
console.log(`Directorio de trabajo actual: ${process.cwd()}`)

// Plataforma
console.log(`Plataforma: ${process.platform}`)

// Versión de Node.js
console.log(`Versión de Node.js: ${process.version}`)
