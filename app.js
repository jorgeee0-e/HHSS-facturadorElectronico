//Ocupamos Express
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


app.use((req,res, next) =>{
    res.locals.username = req.session.username;
    next();
});


app.post('/auth', async (req, res) => {
    const { Usuario_Login, Passw_Login } = req.body;
    const user = await LoguearUsuario(Usuario_Login, Passw_Login);

    if (user) {
        req.session.username = Usuario_Login;
        res.redirect('/administrar');
    } else {
        res.send('Credenciales inválidas');
    }
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

//Direccion de ruta a generacion Token
app.get('/token', (req,res) => {
    res.render('Usuario/Generacion_Token');
});

app.get('/token/historial', (req,res) => {
    res.render('Usuario/Historial_TK');
});

app.get('/administrar', (req, res) => {
    res.render('Usuario/Administrar_DTE');
});

app.get('/administrar/tipo_dte', (req,res) => {
    res.render('Usuario/Enviar_DTE/Tipo_DTE');
});

app.get('/administrar/emisor', (req,res) => {
    res.render('Usuario/Enviar_DTE/Emisor');
});

app.get('/header',(req, res)=>{
    res.render('header');
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).send('Error al cerrar sesión');
        }
        res.redirect('/');
    });
});

//Metodos Post
//Metodo de Registro Usuario
app.post('/registro', async (req, res) => {
    insertarUsuario(req,res);
});

app.listen(3000, (req, res)=>{
    console.log('Servidor en Marcha acia la ruta http://localhost:3000');
})

