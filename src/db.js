import {createPool} from 'mysql2/promise'
import {
    DB_HOST,
    DB_PORT,
    DB_DATABASE,
    DB_USER,
    DB_PASSWORD
} from './config.js'

/**Esta es la configuracion que se hace
 * cuando nuestra base de datos esta en un 
 * hambiente local
 */
// export const pool = createPool({
//     host: 'localhost',
//     user: 'root',
//     password: 'password',
//     port: 3306,
//     database: 'companydb'
// })



/**Se instala una dependencia que se llama dotenv, paraque me 
 * permita leer un archivo llamado .env
 * npm i dotenv
 */

export const pool = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})



// INSERT INTO employee VALUES 
// (1,'Hugo',80000),
// (2,'Alan', 60000),
// (3,'Diana', 60000),
// (4,'Karla', 50000)