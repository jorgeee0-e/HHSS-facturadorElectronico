const bcryptjs = require('bcrypt');
const conexion = require('../models/conexion');

class validarMetodos{

    async EncriptarCont(Passw){
        let passworHash = await bcryptjs.hash(Passw, 8);
        return passworHash;
    }

    async DesEncriptarCont(DesPassw){
        let passworHash = await bcryptjs.hash(DesPassw, 8);
        return passworHash;
    }

}

//Exportar Clases
module.exports = validarMetodos;