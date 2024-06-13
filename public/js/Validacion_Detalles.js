document.addEventListener("DOMContentLoaded", function() {
    const campos = [
        "Nombre_Detalles",
        "Precio_Unitario_Detalles",
        "Ventas_Sujetas_Detalles",
        "Ventas_Externas_Detalles",
        "Descripcion_Detalles",
        "Tipo_Documento_Detalles",
        "N_Documento_Detalles",
        "Departamento_Detalles",
        "Municipio_Detalles",
        "Complemento_Detalles",
        "Actividad_Detalles",
        "Telefono_Detalles",
        "Correo_Detalles"
    ];

    var error_reenvio = document.getElementById("error_reenvio");
    const Btn_Siguiente_Detalles_DTE = document.getElementById("Btn_Siguiente_Detalles_DTE");

    /*Se evita que se envie el formulario mediante la tecla "Enter"*/
    this.addEventListener('keypress', function(event) {
        if (event.key === 'Enter'){
            event.preventDefault();
        }
    });

    Btn_Siguiente_Detalles_DTE.addEventListener("click", function EnviarForm(event) {
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
        
            const TipoCorreo = document.getElementById("Correo_Detalles").value;
            const TipoTelefono = document.getElementById("Telefono_Detalles").value;
            const Precio_Unitario_Detalles = document.getElementById("Precio_Unitario_Detalles").value;
            const Ventas_Sujetas_Detalles = document.getElementById("Ventas_Sujetas_Detalles").value;
            const Ventas_Externas_Detalles = document.getElementById("Ventas_Externas_Detalles").value;
    
            const esValido = ValidarCorreo(TipoCorreo);
            const TelefonoValido = ValidarTelefono(TipoTelefono);
            const PrecioUnitarioValido = ValidarNumero(parseFloat(Precio_Unitario_Detalles));
            const VentasSujetasValidas = ValidarNumero(parseFloat(Ventas_Sujetas_Detalles));
            const VentasExternasValida = ValidarNumero(parseFloat(Ventas_Externas_Detalles));
    
            if (esValido && TelefonoValido && PrecioUnitarioValido !== null && VentasSujetasValidas !== null && VentasExternasValida !== null) {
                document.getElementById("Tipo_DTE_Detalles_Form").submit();
            } else {
                /* Mostrar sus alertas específicas */
                if (!esValido) {
                    alert("Correo inválido");
                }
                if (!TelefonoValido) {
                    alert("El teléfono es incorrecto");
                }
                if (PrecioUnitarioValido === null) {
                    alert("El precio unitario debe estar en un rango de 0 - 9999");
                }
                if (VentasSujetasValidas === null){
                    alert("Las Ventas Sujetas deben estar en un rango de 0 - 9999");
                }
                if(VentasExternasValida === null){
                    alert("Las Ventas Externas deben estar en un rango de 0 - 9999");
                }
            }
        } else {
            
            error_reenvio.innerHTML = `<p style="color:red;font-size20px;">El campo "` + campoVacio.replace(/_/g, " ").replace(/Detalles/g, "") + `" Es Requerido</p>`;
            setTimeout(function() {
                error_reenvio.innerHTML = "";
            
            }, 2000);
        }
    });
});


/*Validaciones Por parte de los inputs*/

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

function ValidarNumero(Num) {
    if (typeof Num !== 'number' || isNaN(Num)) {
        alert("El valor proporcionado no es un número válido.");
        return null;
    }

    if (Num > 0 && Num < 9999) {
        return Num;
    } else {
        return null;
    }
}
