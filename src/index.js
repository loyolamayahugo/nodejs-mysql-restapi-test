import express from 'express'
import employeesRoutes from './routes/employees.routes.js'
import indexRoutes from './routes/index.routes.js'

import {PORT} from './config.js'

const app = express()

app.use(express.json())

app.use(indexRoutes)

app.use('/api',employeesRoutes)

/**Esto nos sirve para indicar que, una ves que el cliente intento acceder a las rutas
 * y ninguna coincide entonces vamos a regresar un 404
 */
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Endpoint Not Found'
    })
})

//app.listen(3000)
app.listen(PORT)

console.log('Server running on port', PORT)

//Ro medina
//Eder diaz
//David sol
//loli delgado lara
//Victor torres
//tech-frontend