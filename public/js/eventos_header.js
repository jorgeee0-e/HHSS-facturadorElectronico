const btn_logout = document.getElementById("cerrar_sesion");

btn_logout.addEventListener("click", function(event){
    event.preventDefault();
    window.location.replace('/logout');
})