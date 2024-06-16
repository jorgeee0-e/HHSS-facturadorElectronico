const conexion = require('../models/conexion');
const registroClass = require('../models/registrarse_models');
const validarMetodos = require('../controlador/validaciones_encriptaciones');

async function insertarUsuario(req,res){

    const registro = new registroClass();
    const validar = new validarMetodos();

    try {
        const { Nombre_Registro, Apellidos_Registro, Gmail_Registro, Gmail_Registro_Sec, DUI_Registro, Usuario_Registro, Passw_Registro } = req.body;

        //Usamos los metodos Getter and Setter
        registro.Nombre_Registro = Nombre_Registro;
        registro.Apellidos_Registro = Apellidos_Registro;
        registro.Gmail_Registro = Gmail_Registro;
        registro.Gmail_Registro_Sec = Gmail_Registro_Sec;
        registro.DUI_Registro = DUI_Registro;
        registro.Usuario_Registro = Usuario_Registro;

        //Encriptacion de Constraseña
        const PassEncrypt = await validar.EncriptarCont(Passw_Registro);
        registro.Passw_Registro = PassEncrypt;
        let val =
        "Nombre: " + registro.Nombre_Registro +
        "\nApellidos: " + registro.Apellidos_Registro +
        "\nGmail: " + registro.Gmail_Registro +
        "\nGmail2: " + registro.Gmail_Registro_Sec +
        "\nDUI: " + registro.DUI_Registro +
        "\nUsuario: " + registro.Usuario_Registro +
        "\nPassword" + registro.Passw_Registro;

        console.log(val);

    const sql = `
        INSERT INTO t_usuario (nombre, apellidos, correo, correoSecundario, dui, codUsuario, llave)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const VerificacionUsuario = await solicitarUsuario(registro.DUI, registro.Usuario_Registro);
        
    if(VerificacionUsuario === false){
        try {
            conexion.query(sql, [registro.Nombre_Registro, registro.Apellidos_Registro, registro.Gmail_Registro, registro.Gmail_Registro_Sec, registro.DUI_Registro, registro.Usuario_Registro, registro.Passw_Registro]);
            res.redirect('/index');
        } catch (error) {
            console.error(error);
            res.status(500).send('Error en la inserción del usuario');
        } finally {
            conexion.end();
        }
    }else{
        res.send('El Usuario o DUI ya existen');
    }
} catch (error) {
    console.error(error);
    res.status(500).send('Error en el registro del usuario');
}
}

async function solicitarUsuario(DUI, Usuario) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM t_usuario WHERE DUI = ? AND CODUSUARIO = ?`;
        conexion.query(sql, [DUI, Usuario], (err, results) => {
            if (err) {
                return reject(err);
            }

            if (results.length > 0) {
                resolve(true);  // Usuario encontrado
            } else {
                resolve(false); // Usuario no encontrado
            }
        });
    });
}

//Se eporta el mmodulo o funcion necesaria para la ejecucion del codigo
module.exports = insertarUsuario;