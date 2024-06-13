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

/*Llamamos a la clase creada para el modelo Tipo_DTE*/
const Instacia_Tipo_DTE = new Tipo_DTE();

// Selector corregido para los radio buttons
var TipoDTE_Value = document.querySelector("input[name='tipoDTE']:checked");
var btn_Enviar = document.getElementById("btn-Enviar");

Instacia_Tipo_DTE.SetTipoDTE_Value(TipoDTE_Value);

btn_Enviar.addEventListener("click", function(){
    alert("sin enviar dato" + TipoDTE_Value);
    var Modelo_DTE = Instacia_Tipo_DTE.GetTipoDTE_Value;
    alert(Modelo_DTE);
});