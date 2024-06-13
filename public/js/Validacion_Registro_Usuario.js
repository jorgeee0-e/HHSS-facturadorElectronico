document.addEventListener("DOMContentLoaded", function() {
    const campos = [
        "Nombre_Registro",
        "Apellidos_Registro",
        "Gmail_Registro",
        "Edad_Registro",
        "DUI_Registro",
        "Usuario_Registro",
        "Passw_Registro"
    ];

    const Btn_Registarse = document.getElementById("Btn_Registarse");

    Btn_Registarse.addEventListener("click", function(event) {
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
            const TipoCorreo = document.getElementById("Gmail_Registro").value;
            const CorreoSecundario = document.getElementById("Gmail_Registro_Sec").value;
            const Edad_Registro = document.getElementById("Edad_Registro").value;
            const DUI_Registro = document.getElementById("DUI_Registro").value;

            const EdadValida = ValidarNumero(Edad_Registro);
            const esValido = ValidarCorreo(TipoCorreo);
            const esValidoSec = ValidarCorreo(CorreoSecundario);
            const DUIValido = ValidarDUI(DUI_Registro);
    
            if (TipoCorreo === CorreoSecundario) {
                mostrarError("Los Correos no deben ser Iguales");
            } else if (esValido && esValidoSec && EdadValida && DUIValido) {
                document.getElementById("Form_Registro_Usuario").submit();
            } else {
                if (!esValido) {
                    mostrarError("Correo inválido");
                }
                if (!esValidoSec) {
                    mostrarError("Correo secundario inválido");
                }
                if (!DUIValido){
                    mostrarError("Formato de DUI inválido")
                }
            }
        } else {
            const campoRequerido = campoVacio.replace(/_Registro/g, "");
            mostrarError(`El campo "${campoRequerido}" Es Requerido`);
        }

    });
});


function ValidarCorreo(correo) {
    if (correo === null || correo === "") {
        return true;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(correo);
}

function ValidarNumero(Num) {

    const parsedNum = Number(Num);
    
    if (isNaN(parsedNum)) {
        mostrarError("El valor proporcionado no es un número válido.");
        return false;
    }
    if (parsedNum > 17 && parsedNum < 100) {
        return parsedNum;
    } else {
        mostrarError("El número debe estar entre 18 y 99.");
        return false;
    }
}

function ValidarDUI(DUI){
    const regexDUI = /^\d{8}-\d{1}$/;
    return regexDUI.test(DUI);
}

//Generador de Errores DOM
function mostrarError(mensaje) {
    const error_reenvio = document.getElementById("error_reenvio");
    error_reenvio.textContent = mensaje;
    error_reenvio.style.color = "red";
    error_reenvio.style.fontSize = "20px";
    setTimeout(function() {
        error_reenvio.textContent = "";
    }, 2000);
}