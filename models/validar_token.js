const axios = require('axios');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');
const conexion = require('../models/conexion');
const token = require('../controlador/token_controller');
const tokenClass = new token();

async function verificarValidar(nit, passw, req, res) {
    try {
        const url = 'https://apitest.dtes.mh.gob.sv/seguridad/auth';
        
        const data = {
            user: nit,
            pwd: passw
        };
    
        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'User-Agent': 'Facturador'
            }
        };

        const postData = querystring.stringify(data);
        const response = await axios.post(url, postData, config);
        console.log('Respond to:', response.data);

        if (response.data && response.data.body && response.data.body.token) {

            //Guardar el Json de manera local dentro de la aplicacion
            const data = response.data;
            const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
            const nombrearchivo = `data-${timestamp}.json`;
            const filepath = path.join(__dirname, 'Historial_Solicitud_Token', nombrearchivo);

            fs.mkdirSync(path.join(__dirname, 'Historial_Solicitud_Token'), { recursive: true });

            fs.writeFile(filepath, JSON.stringify(data, null, 2), (err) => {
                if (err) throw err;
                console.log(`Datos guardados en ${filepath}`);
            });

            const token = response.data.body.token;
            const tokenActual = token;
            const fechaGeneracion = new Date();
            const id_Usuario = res.locals.userId;

            // Llamar al método GuardarToken para guardar el token en la base de datos
            tokenClass.GuardarToken(tokenActual, fechaGeneracion, id_Usuario);
            
            const expires = 24 * 60 * 60;
            return { token: response.data.body.token, expires };
        } else {
            console.log("Hubo un error en la solicitud de respuesta del token");
            return null;
        }

    } catch (error) {
        console.error('Error al obtener el token', error.response ? error.response.data : error.message);
        throw error;
    }
}


module.exports = verificarValidar;
