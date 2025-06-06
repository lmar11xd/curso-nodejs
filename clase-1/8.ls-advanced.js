const fs = require('node:fs/promises')
const path = require('node:path')
const pc = require('picocolors')

const folder = process.argv[2] ?? '.' // Comando: node 8.ls-advanced.js ./cjs

async function listFiles (folder) {
  let files
  try {
    files = await fs.readdir(folder)
  } catch (err) {
    console.error('Error al leer el directorio:', err)
    process.exit(1) // 1 indica un error - 0 indica éxito
  }

  const filesPromises = files.map(async (file) => {
    const filePath = path.join(folder, file)
    try {
      const stats = await fs.stat(filePath)
      return {
        name: file,
        size: stats.size.toString(),
        type: stats.isDirectory() ? 'D' : 'f',
        modified: stats.mtime.toLocaleString()
      }
    } catch (err) {
      console.error(`Error al obtener información de ${file}:`, err)
      return null
    }
  })

  const filesInfo = await Promise.all(filesPromises)
  filesInfo
    .filter((file) => file !== null) // Filtrar archivos que no se pudieron leer
    .forEach((file) => {
      console.log(
        `${pc.bgGreen(file.type)} ${pc.blue(
          file.name.padEnd(30)
        )} ${file.size.padStart(10)} bytes ${file.modified}`
      )
    })
}

listFiles(folder)

/*
fs.readdir(folder)
    .then(files => {
        console.log('Archivos en el directorio:')
        files.forEach(file => {
            console.log(file)
        })
    })
    .catch(err => {
        console.error('Error al leer el directorio:', err)
    }) */
