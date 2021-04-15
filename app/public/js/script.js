// Bloquear campo de nome da licença autodesk
const autodesk = document.getElementById('autodesk');
function verificaAutodesk(){
    var value=autodesk.options[autodesk.selectedIndex].value;

    if(value == "Não"){
        document.getElementById("licença_autodesk").value = "";
        document.getElementById("licença_autodesk").setAttribute("readonly", "true");
    }else{
        document.getElementById("licença_autodesk").removeAttribute("readonly");
    }
}

autodesk.addEventListener("change", (e) => {
    verificaAutodesk();
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


var gruposMGE = ['BLS-USUARIOS', 'BLS-ITSM', 'BLS-RH', 'BLS-FINANCEIRO', 'BLS-ADMINISTRATIVO', 'BLS-PLANEJAMENTO', 'BLS-GER-PROJETOS', 
'BLS-COMERCIAL', 'BLS-QUALIDADE', 'BLS-DOC-CONTROL', 'BLS-COORDENACAO', 'BLS-SST', 'BLS-ARQUITETURA', 'BLS-EST-METALICA', 'BLS-ENG-CIVIL',
'BLS-ENG-MECANICA', 'BLS-ENG-ELETRICA', 'BLS-ENG-CONCRETO', 'BLS-ENG-TUBULACAO', 'BLS-PDI'];

window.onload = function(){
    verificaAutodesk();
    
    var divGrupos = document.getElementById('gruposMGE');
    let checked = "checked";

    for(let i = 0; i < gruposMGE.length; i++){
        divGrupos.innerHTML += `<div class="col-12 text-left gruposMGE_BHS">
                                    <input type="checkbox" ${checked} id="${gruposMGE[i]}" value="${gruposMGE[i]}" name="grupos_mge" onchange="adicionaGrupo()">
                                    <label class="labelGrupo" for="${gruposMGE[i]}">${gruposMGE[i]}</label>
                                </div>`;
        checked = "";
    }    
}


function adicionaGrupo() {
    var check = document.getElementsByName('grupos_mge');
    var adicionaGrupos = document.getElementById("adicionaGrupos");
    adicionaGrupos.value = "";

    for (var i=0;i<check.length;i++){ 
        if (check[i].checked == true){ 
            adicionaGrupos.value += check[i].value + " ";

        }
    }
}