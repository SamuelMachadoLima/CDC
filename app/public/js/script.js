// Bloquear campo de nome da licença autodesk
const autodesk = document.getElementById('autodesk');
autodesk.addEventListener("change", (e) => {
    var value=autodesk.options[autodesk.selectedIndex].value;

    if(value == "Não"){
        document.getElementById("licença_autodesk").value = "";
        document.getElementById("licença_autodesk").setAttribute("readonly", "true");
    }else{
        document.getElementById("licença_autodesk").removeAttribute("readonly");
    }
});

// Preencher campo de e-mail do usuário
const nome_usuario = document.getElementById("nome_usuario");
nome_usuario.addEventListener("blur", (e) => {
    var value = nome_usuario.value;
    var name = value.split(" ");
    var first_letter = value.split("")[0].toLowerCase();
    var last_name = name[name.length-1].toLowerCase();

    document.getElementById("email_blossom").value = first_letter+last_name+"@blossomconsult.com";    
});
