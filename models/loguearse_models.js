class loguear_models{

    loguear_models(UsuarioiIn, PasswIn){
        this.Usuario = UsuarioiIn,
        this.Passw = PasswIn
    }

    loguear_models(){}

    get Usuario_Login(){return this.Usuario;}
    set Usuario_Login(Usuario_Login_Set){this.Usuario = Usuario_Login_Set;}

    get Passw_Login(){return this.Passw;}
    set Passw_Login(Passw_Login_Set){this.Passw = Passw_Login_Set;}

}

module.exports = loguear_models;

