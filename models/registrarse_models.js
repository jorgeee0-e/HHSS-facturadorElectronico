class registrarse_model{

    registrarse_model(NombreIn, ApellidosIn, GmailIn, Gmail2In, DUIIn, UsuarioIn, PasswIn){
        this.Nombre = NombreIn;
        this.Apellidos = ApellidosIn;
        this.Gmail = GmailIn;
        this.Gmail2 = Gmail2In;
        this.DUI = DUIIn;
        this.Usuario = UsuarioIn;
        this.Passw = PasswIn;
    }

    registrarse_model(){}

    get Nombre_Registro(){return this.Nombre;}
    set Nombre_Registro(Nombre_Registro_Set){this.Nombre = Nombre_Registro_Set;}

    get Apellidos_Registro(){return this.Apellidos;}
    set Apellidos_Registro(Apellidos_Registro_Set){this.Apellidos = Apellidos_Registro_Set;}

    get Gmail_Registro(){return this.Gmail;}
    set Gmail_Registro(Gmail_Registro_Set){this.Gmail = Gmail_Registro_Set;}

    get Gmail_Registro_Sec(){return this.Gmail2;}
    set Gmail_Registro_Sec(Gmail_Registro_Sec_Set){this.Gmail2 = Gmail_Registro_Sec_Set;}

    get DUI_Registro(){return this.DUI;}
    set DUI_Registro(DUI_Registro_Set){this.DUI = DUI_Registro_Set;}

    get Usuario_Registro(){return this.Usuario;}
    set Usuario_Registro(Usuario_Registro_Set){this.Usuario = Usuario_Registro_Set;}

    get Passw_Registro(){return this.Passw;}
    set Passw_Registro(Passw_Registro_Set){this.Passw = Passw_Registro_Set;}

}

module.exports = registrarse_model;
