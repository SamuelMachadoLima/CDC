function isSupportedFileAPI() {
    return window.File && window.FileReader && window.FileList && window.Blob;
}

function formatEmail(data) {
    return data.name ? data.name + " [" + data.email + "]" : data.email;
}

function parseHeaders(headers) {
    var parsedHeaders = {};
    if (!headers) {
        return parsedHeaders;
    }
    var headerRegEx = /(.*)\: (.*)/g;
    while (m = headerRegEx.exec(headers)) {
        // todo: Pay attention! Header can be presented many times (e.g. Received). Handle it, if needed!
        parsedHeaders[m[1]] = m[2];
    }
    return parsedHeaders;
}

function getMsgDate(rawHeaders) {
    // Example for the Date header
    var headers = parseHeaders(rawHeaders);
    if (!headers['Date']) {
        return '-';
    }
    return new Date(headers['Date']);
}

function formataLetrasMaiusculas(text) {
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];

        var firstLetter = w[0];
        w = firstLetter.toUpperCase() + w.slice(1);

        words[a] = w;
    }
    return words.join(" ");
}

function verificaAutodesk(){
    var value=autodesk.options[autodesk.selectedIndex].value;

    if(value == "Não"){
        document.getElementById("licença_autodesk").value = "";
        document.getElementById("licença_autodesk").setAttribute("readonly", "true");
    }else{
        document.getElementById("licença_autodesk").removeAttribute("readonly");
    }
}

function removeAcento (text)
{       
    text = text.toLowerCase();                                                         
    text = text.replace(new RegExp('[ÁÀÂÃ]','gi'), 'a');
    text = text.replace(new RegExp('[ÉÈÊ]','gi'), 'e');
    text = text.replace(new RegExp('[ÍÌÎ]','gi'), 'i');
    text = text.replace(new RegExp('[ÓÒÔÕ]','gi'), 'o');
    text = text.replace(new RegExp('[ÚÙÛ]','gi'), 'u');
    text = text.replace(new RegExp('[Ç]','gi'), 'c');
    return text;                 
}

function sugestaoEmail(){
    const nameUser = $("#nome_usuario").val();
    const eachName = nameUser.split(" ");
    var first_letter = removeAcento(nameUser.split("")[0]);
    var last_name = removeAcento(eachName[eachName.length-1]);
    $("#email_blossom").val((`${first_letter}${last_name}@blossomconsult.com`).toLowerCase());
}

function existeCampo(fileData, campo){
    return fileData.body.includes(campo);
}

function getData(fileData, text1, text2){
    return (fileData.body ? fileData.body.split(text1)[1].split(text2)[0] : "");
}

function preencheCampos(fileData, verificaExistencia, idCampoForm){
    
    if(existeCampo(fileData, verificaExistencia)){
        var variavel = (getData(fileData, verificaExistencia, "\n")).trim();
        
        if(variavel.includes("Exchange Online"))
            variavel = "Exchange Online + Teams Exploratory";
        else if(variavel.includes("Microsoft 365 - Assinatura Mensal"))
            variavel = "Microsoft 365 Business Premium";

            
        if(idCampoForm == "nome_usuario")
            $(`#${idCampoForm}`).val(formataLetrasMaiusculas(variavel));
        else if(idCampoForm == "data_ativacao"){
            const data = variavel.split("/");
            $(`#${idCampoForm}`).val(`${data[2].trim()}-${data[1].trim()}-${data[0].trim()}`);
        }
        else if(idCampoForm == "solicitador"){
            variavel = variavel.split("/")[0].trim();
            $("#solicitador").val(variavel);
        }
        else if(idCampoForm == "licença_autodesk"){
            $(`#${idCampoForm}`).val(variavel);
        }
        else if(idCampoForm == "outros_softwares" && variavel == ""){
            $(`#${idCampoForm}`).val("Não");
        }
        else
            $(`#${idCampoForm}`).val(variavel);
    }else{
        if(idCampoForm == "licença_autodesk"){
            $(`#autodesk`).val("Não");
            verificaAutodesk();
        }
        else if(idCampoForm == "outros_softwares"){
            $(`#${idCampoForm}`).val("Não");
        }
    }

}

function criaUsuario(fileData){

    preencheCampos(fileData, "O Nome Completo do Usuário a ser criado é:", "nome_usuario");
    preencheCampos(fileData, "O Endereço Digital alternativo do usuário é:", "email_pessoal");
    preencheCampos(fileData, "O número de contato é:", "telefone");
    preencheCampos(fileData, "Local do usuário:", "sigla_local");
    preencheCampos(fileData, "Data prevista de início das atividades do usuário:", "data_ativacao");

    sugestaoEmail();

    preencheCampos(fileData, "O tipo de licença Microsoft é:", "licença_microsoft");
    preencheCampos(fileData, "Departamento:", "departamento");
    preencheCampos(fileData, "Disciplina:", "disciplina");
    preencheCampos(fileData, "Subdisciplina:", "subdisciplina");
    preencheCampos(fileData, "Nome e e-mail do solicitante (é quem deve ser registrado como o usuário do chamado):", "solicitador");

    verificaAutodesk();
        
    preencheCampos(fileData, "Outros softwares a serem instalados:", "outros_softwares");

    preencheCampos(fileData, "O tipo de licença Autodesk é:", "licença_autodesk");
    
    // Equipamento para o usuário
    if(fileData.body.includes("Tipo de hardware:")){
        const equipamento = (getData(fileData, "Tipo de hardware: ", "Necessita de monitor adicional?")).trim();
        const monitorAdicional = (getData(fileData, "Necessita de monitor adicional? ", "Departamento:")).trim();
        $('#tipo_equipamento').val(equipamento);
        $('#monitor_adicional').val(monitorAdicional);
    }
}

function desativaUsuario(fileData){
    // Valores do form
    const solicitante = (getData(fileData, "Nome e e-mail do solicitante (é quem deve ser registrado como o usuário do chamado): ", " /")).trim();
    const nomeUsuario = (getData(fileData, "Favor excluir o usuário ", " do Ambiente Digital da Blossom.")).trim();

    $('#solicitador').val(solicitante);
    $('#autodesk').val("Sim");
    $('#licença_autodesk').val(" - ");
    if((getData(fileData, "O e-mail do usuário é", "O usuário deve ser excluído ")).includes("Exclusão imediata: Sim")){
        const data = new Date().toLocaleDateString().split("/");
        $('#data_desativacao').val(`${data[2]}-${data[1]}-${data[0]}`);
    }else{
        const data = (getData(fileData, "Data para exclusão do usuário: ", "O usuário deve ser excluído dos seguintes ")).trim().split("/");
        $('#data_desativacao').val(`${data[2]}-${data[1]}-${data[0]}`);
    }
    $('#nome_usuario').val(formataLetrasMaiusculas(nomeUsuario));

    preencheCampos(fileData, "O e-mail do usuário é: ", "email_blossom");
}

$(function () {
    if (isSupportedFileAPI()) {
        $('.src-file').change(function () {
            var selectedFile = this.files[0];
            if (!selectedFile) {
                $('.incorrect-type').hide();
                return;
            }
            if (selectedFile.name.indexOf('.msg') == -1) {
                $('.incorrect-type').show();
                return;
            }
            $('.incorrect-type').hide();

            // read file...
            var fileReader = new FileReader();
            fileReader.onload = function (evt) {

            var buffer = evt.target.result;
            var msgReader = new MSGReader(buffer);
            var fileData = msgReader.getFileData();

                if (!fileData.error) {
                    
                    // Pega a URL atual
                    const url = window.location.href;

                    if(url.includes("criaUsuario")){
                        criaUsuario(fileData);
                    } else if(url.includes("deletaUsuario")){
                        desativaUsuario(fileData);
                        alert("Verifique o local e e-mail do usuário!");
                    }
                    
                    
                } else {
                    $('.incorrect-type').show();
                }
            };
            fileReader.readAsArrayBuffer(selectedFile);
        });
    } else {
        alert("Opa, algo de errado aconteceu. A API não conseguiu se conectar.");
    }
});