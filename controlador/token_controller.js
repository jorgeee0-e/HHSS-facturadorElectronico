const conexion = require('../models/conexion');

class Token {
    constructor() {}

    historial_token(req, res) {
        let sql = 'SELECT id, tokenActual, fechaGeneracion FROM t_registro_token WHERE idPersona = ?';
        const idUsuario = res.locals.userId;

        conexion.query(sql, [idUsuario], (err, results) => {
            if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return res.status(500).send('Error en el servidor');
            }
            res.render('Usuario/Historial_TK', { tokens: results });
        });
    }

    GuardarToken(tokenActual, fechaGeneracion, idPersona) {
        let sql = 'INSERT INTO t_registro_token (tokenActual, fechaGeneracion, idPersona) VALUES (?, ?, ?)';
        conexion.query(sql, [tokenActual, fechaGeneracion, idPersona], (err, results) => {
            if (err) throw err;
            console.log('Token guardado en la base de datos');
        });
    }

    UltimoRegistroToken() {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT fechaGeneracion, tokenActual FROM t_registro_token ORDER BY fechaGeneracion DESC LIMIT 1';
            conexion.query(sql, (err, results) => {
                if (err) {
                    return reject(err);
                } else {
                    if (results.length > 0) {
                        const ultimoRegistro = {
                            fechaGeneracion: results[0].fechaGeneracion,
                            tokenActual: results[0].tokenActual
                        };
                        resolve(ultimoRegistro);
                    } else {
                        resolve(null); // Resuelve con null si no hay registros
                    }
                }
            });
        });
    }

    // Verificar con la base de datos que no haya pasado más de un día desde el último token
    async ComparaFechasToken(ultimo_registro) {
        const fechaRegistro = new Date(ultimo_registro);

        if (!(fechaRegistro instanceof Date && !isNaN(fechaRegistro))) {
            throw new Error('La fecha de registro no es válida');
        }
        
        const fechaActual = new Date();
        
        console.log(fechaRegistro);
        console.log(fechaActual);
        
        const unDiaEnMilisegundos = 24 * 60 * 60 * 1000;
        const diferencia = fechaActual.getTime() - fechaRegistro.getTime();
        const diferenciaEnDias = diferencia / unDiaEnMilisegundos;
        
        return diferenciaEnDias < 1;
    }

    async verificarToken(req, res, next) {
        try {
            const ultimo_registro = await this.UltimoRegistroToken();
            
            console.log('Última fecha de generación:', ultimo_registro);
    
            if (ultimo_registro === null) {
                console.log("No hay registros en la base de datos");
                return false; // Devuelve falso si no hay registros
            }
    
            const validarActividadToken = await this.ComparaFechasToken(ultimo_registro);
    
            return validarActividadToken;
        } catch (err) {
            console.error('Error en verificarToken:', err);
            throw err;
        }
    }
}

module.exports = Token;
