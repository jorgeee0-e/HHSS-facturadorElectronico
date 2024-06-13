const btn = document.getElementById("checkboxT");
const M_Lateral = document.querySelector("#Menu_Lateral_DTE");

btn.addEventListener("change", function(){

    if(btn.checked){
        M_Lateral.style.transform = "translateX(0px)";
        M_Lateral.style.transition = "0.2s ease-in-out";
    }

    else{
        M_Lateral.style.transform = "translateX(-250px)";
        M_Lateral.style.transition = "0.2s ease-in-out";
    }
});