const mysql = require('mysql');
const conexion = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

conexion.connect((error)=>{
    if(error){
        console.log('Hubo un error en la conexion :' +error);
        return;
    }
    console.log('Coneccion a la base de datos exitosa')
});

module.exports = conexion;