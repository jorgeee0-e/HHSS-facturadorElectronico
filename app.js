//Ocupamos Express

//NIT: 06142803901121
//CONT: Un!v3r$0/*
const Swal = require('sweetalert2');
const express = require('express');
const session = require('express-session');
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

//BCrypt
const bcryptjs = require('bcrypt');
const conexion = require('./models/conexion');

app.use(session({
    secret:'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

//Requerir Archivos externos para metodos y eventos
const insertarUsuario = require('./controlador/registrarse_controller');
const LoguearUsuario = require('./controlador/loguear_controller');
const bodyParser = require('body-parser');
const verificarValidar = require("./models/validar_token");
const VerificarUserTK = require("./controlador/verificar_usuario_controller");

const token = require("./controlador/token_controller");


const jwt = require('jsonwebtoken');

//llamar una nueva clase para eventos sobre token
const tokenClass = new token();
const VerificarUserTKClass = new VerificarUserTK;

//variables locales de sesion
app.use((req,res, next) =>{
    res.locals.username = req.session.username;
    res.locals.userId = req.session.userId;
    res.locals.tokenSession = req.session.tokenSession;
    res.locals.tokenAct = req.session.tokenAct;
    next();
});

//Direccion hacia Index o PagPrincipal
app.get('/',(req, res) =>{
    res.render("index");
});

app.get('/index',(req, res) =>{
    res.render("index");
});

//Eventos y Direccion de ruta sobre Registrarse
app.get('/registrarse',(req, res) =>{
    res.render("Registrarse");
});


//Middleware para verificar que el token este activo, se ocupa la funcion dentro de renderizado de paginar, en este caso los formularios
const verificarTokenMiddleware = (options = { blockIfInvalid: false }) => {
    return async (req, res, next) => {
        try {
            const ultimoRegistro = await tokenClass.UltimoRegistroToken();

            console.log('Última fecha de generación:', ultimoRegistro ? ultimoRegistro.fechaGeneracion : 'No hay registro');
            console.log('Token actual:', ultimoRegistro ? ultimoRegistro.tokenActual : 'No hay token');

            if (!ultimoRegistro) {
                console.log("No hay registros en la base de datos");
                req.token = null;
            } else {
                const validarActividadToken = await tokenClass.ComparaFechasToken(ultimoRegistro.fechaGeneracion);

                if (validarActividadToken) {
                    console.log("Token válido");
                    req.token = ultimoRegistro.tokenActual;
                } else {
                    console.log("Token no válido");
                    req.token = null;
                }
            }

            if (options.blockIfInvalid && !req.token) {
                res.redirect("/token");
            } else {
                next();
            }
        } catch (err) {
            console.error('Error en verificarTokenMiddleware:', err);
            res.status(500).send('Error al procesar la solicitud');
        }
    };
};

//Metodos Post
//Metodo de Registro Usuario

app.post('/registro', async (req, res) => {
    insertarUsuario(req,res);
});

app.post('/auth', async (req, res) => {
    const { Usuario_Login, Passw_Login } = req.body;
    const user = await LoguearUsuario(Usuario_Login, Passw_Login);

    if (user) {
        const keysession = user.codUsuario;
        const payload = {
            user: Usuario_Login
        };
        const options = {
            expiresIn: '30m'
        };
        const tokenSession = jwt.sign(payload, keysession, options);
        /* console.log('Token de sesion: ', tokenSession); */

        req.session.tokenSession = tokenSession;
        req.session.username = user.codUsuario;
        req.session.userId = user.idUsuario;
        res.status(200).json({ success: true });
        
    } else {
        res.status(401).json({ success: false });
        /* res.send('Credenciales inválidas'); */
    }
});

app.post('/authtoken', async (req, res) => {
    const { Id_Usuario_Token, Contrasena_Token } = req.body;

    console.log('Usuario:', Id_Usuario_Token, 'Contraseña:', Contrasena_Token);

    try {
        if (!Id_Usuario_Token || !Contrasena_Token) {
            console.log("Hubo un error: Datos incompletos");
            return res.redirect('/administrar');
        }

        const verificacion_token = await verificarValidar(Id_Usuario_Token, Contrasena_Token, req, res);

        console.log("la verificacion es: " + verificacion_token);

        if (verificacion_token) {
            console.log("Verificación Completa");
            return res.redirect('/administrar');
        } else {
            console.log("Hubo un error en la verificación");
            return res.redirect('/administrar');
        }
    } catch (error) {
        console.error('Error en el manejo de la solicitud:', error);
        return res.status(500).send('Error en el servidor');
    }
});


//Verificacion Global sobre el token de sesion
app.use(VerificarUserTKClass.verificarUsuario);

app.get('/administrar/tipo_dte', verificarTokenMiddleware({ blockIfInvalid: true }), async (req, res) => {
        res.render('Usuario/Enviar_DTE/Tipo_DTE');
});

app.get('/administrar/emisor', verificarTokenMiddleware({ blockIfInvalid: true }), async (req, res) => {
        res.render('Usuario/Enviar_DTE/Emisor');
});

app.get('/administrar/receptor', verificarTokenMiddleware({ blockIfInvalid: true }), async (req, res) => {
        res.render('Usuario/Enviar_DTE/Receptor');
});

app.get('/administrar/detalles', verificarTokenMiddleware({ blockIfInvalid: true }), async (req, res) => {
        res.render('Usuario/Enviar_DTE/Detalles');
});

app.get('/Menu_Lateral', (req, res) =>{
    try {
        res.render("/Usuario/Menu_Lateral");
    } catch (err) {
        console.error('Error en la ruta /administrar/tipo_dte:', err);
        res.status(500).send('Error al procesar la solicitud');
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/');
    });
});

app.get('/administrar', verificarTokenMiddleware({ blockIfInvalid: false }), async (req, res) => {
    if (req.token) {
        const tokenA = req.token;
        console.log('Token en la ruta:', tokenA);
        req.session.tokenAct = tokenA;
        res.render('Usuario/Administrar_DTE');
    } else {
        req.session.tokenAct = null;
        res.render('Usuario/Administrar_DTE');
    }
});


//Direccion de ruta a generacion Token
app.get('/token', (req,res) => {
    res.render('Usuario/Generacion_Token');
});

app.get('/token/historial', (req, res) => {
    const CargarToken = tokenClass.historial_token(req,res);
});

app.listen(3000, (req, res)=>{
    console.log('Servidor en Marcha acia la ruta http://localhost:3000');
})

