# NodeJS
https://www.youtube.com/watch?v=yB4n_K7dZV8&list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7

# Crear Proyecto Node
```
npm init -> Paso a paso
npm init -y -> Todo por defecto

```

# RestClient
Para Probar endpoints de una api instalar la extensión de RestClient en VSCode.  

Crear un archivo "api.http" y agregar los endpoints (METHOD URL)  

`Ejemplo:` GET http://localhost:3000/pokemon/ditto

# Express
Instalar express modo exacto (-E) sin caret (^) -> package.json: para que la dependencia no se actualice cuando sale una nueva version
```
npm i express -E
```

# Validaciones
```
npm i zod -E
```

# Despligue en netlify
https://app.netlify.com/

1. npm i -g netlify-cli
2. npm i serverless

3. Crear un archivo netlify.toml  
```
[build]
  functions = "functions"
```