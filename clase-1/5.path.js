const path = require('node:path')

// Barra separadora de directorios según SO
console.log(path.sep)

// Unión de rutas
const filePath = path.join('carpeta1', 'carpeta2', 'archivo.txt')
console.log(filePath)

const base = path.basename(filePath)
console.log(base)

const fileName = path.basename(filePath, '.txt')
console.log(fileName)

const extension = path.extname(filePath)
console.log(extension)
