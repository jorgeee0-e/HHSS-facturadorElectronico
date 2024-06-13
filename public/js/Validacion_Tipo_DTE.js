class Tipo_DTE {
    constructor() {
        this.TipoDTE_Value = "";
    }

    get GetTipoDTE_Value() {
        return this.TipoDTE_Value;
    }

    SetTipoDTE_Value(Nuevo_Valor_DTE) {
        this.TipoDTE_Value = Nuevo_Valor_DTE;
    }
}

const Instacia_Tipo_DTE = new Tipo_DTE();

var Btn_Siguiente_Tipo_DTE = document.getElementById("Btn_Siguiente_Tipo_DTE");

var Error_Log = document.getElementById("error");
var MessageError = "No se ha seleccionado ningun tipo de DTE";

Btn_Siguiente_Tipo_DTE.addEventListener("click", function() {

    //Previene El Evento de Enviar sin confirmar los datos
    event.preventDefault();

    var TipoDTE_Value = document.querySelector("input[name='tipoDTE']:checked");

    if (TipoDTE_Value) {
        Instacia_Tipo_DTE.SetTipoDTE_Value(TipoDTE_Value.value);
        document.getElementById("Formularios_DTE").submit();
    }

    //Mensage Error cuando no se selecciona un valor dentro del formulario
    else {
        var txtAlert =
        `<p>No se ha seleccionado Ningun Elemento <p>
        `;
        
        Error_Log.style.display = "flex";
        Error_Log.innerHTML = txtAlert;
        
        setTimeout(function() {
            Error_Log.style.display = "none";
            Error_Log.innerHTML = "";
        }, 2000);
    }
});