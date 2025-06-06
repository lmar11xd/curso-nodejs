// Sistema de Archivos
const fs = require('node:fs') // A partir de Node.js v14, se recomienda usar 'node:fs' para módulos nativos

const stats = fs.statSync('./archivo.txt') // Sincrónico

console.log('Información del archivo:')
console.log('-----------------------------------')

console.log(
  stats.isFile(), // Si es un archivo
  stats.isDirectory(), // Si es un directorio
  stats.isSymbolicLink(), // Si es un enlace simbólico
  stats.size // Tamaño en bytes
)
