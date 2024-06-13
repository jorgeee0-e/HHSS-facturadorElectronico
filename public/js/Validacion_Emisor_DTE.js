document.addEventListener("DOMContentLoaded", function() {
    const campos = [
        "Nombre_Emisor",
        "Nombre_Comercial_Emisor",
        "Actividad_Emisor",
        "NIT_Emisor",
        "NCR_Emisor",
        "Departamento_Emisor",
        "Municipio_Emisor",
        "Complemento_Emisor",
        "Telefono_Emisor",
        "Correo_Emisor"
    ];

    var error_reenvio = document.getElementById("error_reenvio");
    const Btn_Siguiente_Tipo_DTE = document.getElementById("Btn_Siguiente_Tipo_DTE");

    Btn_Siguiente_Tipo_DTE.addEventListener("click", function(event) {
        event.preventDefault();
        
        let camposLlenos = true;
        let campoVacio = "";

        for (let campo of campos) {
            let input = document.getElementById(campo);
            if (input.value === "") {
                camposLlenos = false;
                campoVacio = campo;
                break;
            }
        }

        if (camposLlenos) {

            const TipoCorreo = document.getElementById("Correo_Emisor").value;
            const TipoTelefono = document.getElementById("Telefono_Emisor").value;
            const TipoNIT = document.getElementById("NIT_Emisor").value;
    
            const esValido = ValidarCorreo(TipoCorreo);
            const TelefonoValido = ValidarTelefono(TipoTelefono);
            const NITValido = ValidarNIT(TipoNIT);

    
            if (esValido && TelefonoValido && NITValido) {
                document.getElementById("Tipo_DTE_Detalles_Form").submit();
            } else {
                /* Mostrar sus alertas específicas */
                if (!esValido) {
                    alert("Correo inválido");
                }
                if (!TelefonoValido) {
                    alert("El teléfono es incorrecto");
                }
                if(!NITValido){
                    alert("El NIT no esta en formato correcto");
                }
            }
        } else {
            error_reenvio.innerHTML = `<p style="color:red;font-size20px;">El campo "` + campoVacio.replace(/_/g, " ") + `" Es Requerido</p>`;
            setTimeout(function() {
                error_reenvio.innerHTML = "";
            }, 2000);
        }
    });
});

function ValidarNIT(TipoNIT){
    const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/;
    return regexNIT.test(TipoNIT);
}

function ValidarCorreo(TipoCorreo) {
    const regexCorreo = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return regexCorreo.test(TipoCorreo);
}

function ValidarTelefono(TipoTelefono){
    const expR = /^\+\d{3} \d{4}-\d{4}$/;
    const expR2 = /\d{8}$/;
    const expR3 = /\d{4}-\d{4}$/;
    
    if(expR.test(TipoTelefono)){
        return expR.test(TipoTelefono);
    }
    if(expR2.test(TipoTelefono)){
        return expR2.test(TipoTelefono);
    }
    if(expR3.test(TipoTelefono)){
        return expR3.test(TipoTelefono);
    }
}