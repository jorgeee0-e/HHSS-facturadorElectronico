const loguearClass = require('../models/loguearse_models');
const verificarClass = require('./validaciones_encriptaciones');
const conexion = require('../models/conexion');
const bcryptjs = require('bcrypt');
const util = require('util');

// Promisificar la función de consulta de la base de datos
const query = util.promisify(conexion.query).bind(conexion);

async function LoguearUsuario(Usuario_Login, Passw_Login) {
    const loguear = new loguearClass();
    const verificar = new verificarClass();

    loguear.Usuario_Login = Usuario_Login;
    loguear.Passw_Login = Passw_Login;
    let user = loguear.Usuario_Login;
    let pass = loguear.Passw_Login;

    console.log(Usuario_Login, Passw_Login);

    // Encriptar la contraseña ingresada
    const PassEncrypt = await verificar.EncriptarCont(pass);
    loguear.Passw_Login = PassEncrypt;

    if (user && pass) {
        try {
            const results = await query('SELECT * FROM t_usuario WHERE CODUSUARIO = ?', [user]);
            if (results.length === 0) {
                console.log("Usuario Incorrecto");
                return null;
            }
            const isMatch = await bcryptjs.compare(pass, results[0].LLAVE);
            if (!isMatch) {
                console.log("Contraseña Incorrecta");
                return null;
            }
            if (isMatch) {
                return user;
            }
        } catch (error) {
            console.log("Error en la BDD", error);
            return null;
        }
    } else {
        console.log("El Usuario y Contraseña es requerido");
        return null;
    }
}

async function VerificarSesion(){
    if (req.session.username) {
        
        retrun 
    } else {
        res.redirect('/'); // Redirige al login si no hay usuario en la sesión
    }
}

module.exports = LoguearUsuario;
