document.addEventListener("DOMContentLoaded", function() {
    const campos = [
        "Id_Usuario_Token",
        "Contrasena_Token"
    ];

    var error_reenvio = document.getElementById("error_reenvio");
    var Btn_Generacion_Token = document.getElementById("Btn_Generacion_Token");

    Btn_Generacion_Token.addEventListener("click", function(event) {
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
            document.getElementById("Generacion_Token").submit();
        } else {
            error_reenvio.innerHTML = `<p style="color:white;font-size20px;">El campo "` + campoVacio.replace(/_Token/g, "") + `" Es Requerido</p>`;
            setTimeout(function() {
                error_reenvio.innerHTML = "";
            }, 2000);
        }
    });
});