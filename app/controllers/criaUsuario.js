module.exports.criaUsuario = function (application, req, res) {
    const puppeteer = require('puppeteer');
    var params = req.body;

    const user = params.user;
    const pass = params.pass;
    const pass_bhs = params.pass_bhs == "" ? params.pass : params.pass_bhs;
    const solicitador = params.solicitador;
    const autodesk = params.autodesk;
    const data_ativacao = params.data_ativacao.split("-")[2]+"/"+params.data_ativacao.split("-")[1]+"/"+params.data_ativacao.split("-")[0];
    const nome_usuario = params.nome_usuario;
    const email_pessoal = params.email_pessoal;
    const telefone = params.telefone;
    const licenca_microsoft = params.licenca_microsoft;
    const outros_softwares = params.outros_softwares;
    const email_blossom = params.email_blossom;
    const tipo_equipamento = params.tipo_equipamento;
    const monitor_adicional = params.monitor_adicional;
    const sigla_local = params.sigla_local;

    var local = "";
    if(sigla_local == "BH")
        local = "Blossom Consult - Matriz";
    else if(sigla_local == "IPA")
        local = "Blossom Consult - Filial Ipatinga";
    else if(sigla_local == "BA")
        local = "Blossom Consult - Filial Barcarena";
    else if(sigla_local == "PA")
        local = "Blossom Consult - Filial Paragominas";


    (async () => {

        const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
        const page = await browser.newPage();
        
        let pages = await browser.pages();
        await pages[0].close();
        
        await page.goto("https://f3-1st.ampro-sd.com/admin/login");
        await page.focus('input[name="login"]');
        await page.keyboard.type(user);
        await page.type('input[name="password"]', pass);
        await page.click('button[type="submit"]');
    
        await page.waitForTimeout(3000);
        
        for(let i = 0; i < 4; i++){
            await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
            await page.type('select[name="iduser"]', solicitador);
            await page.type('select[name="id_call_notification"]', "Webpage");

            
            if(i==0){ 
                await page.select('select[name="id_rf_category"]', "1");
                await page.click('button[type="submit"]');
                
                await page.waitForTimeout(3000);
                
                await page.focus('input[name="dt_user_activation"]');
                await page.keyboard.type(data_ativacao);
                await page.type('input[name="nm_usuario_criacao"]', nome_usuario);
                await page.type('input[name="email_nao_blossom"]', email_pessoal);
                await page.type('input[name="nr_fone_nao_blossom"]', telefone);
                await page.type('input[name="tp_licenca_microsoft"]', licenca_microsoft)
                await page.type('input[name="outros_sw_microsoft"]', outros_softwares);
                await page.type('input[name="nm_email_blossom"]', email_blossom);
                await page.type('input[name="nm_local"]', local);;
                await page.type(
                    'textarea[name="ds_request_fulfilment"]', 
                    'Criar Conta de Usuário - Microsoft 365 - \n'+
                    nome_usuario);
                
                // await page.click('button[type="submit"]');
            }

            else if(i==1){ 
                await page.select('select[name="id_rf_category"]', "36");
                await page.click('button[type="submit"]');
                
                await page.waitForTimeout(3000);
                
                await page.type('input[name="nm_usuario"]', nome_usuario);
                await page.type('input[name="user_email"]', email_blossom);
                await page.type(
                    'textarea[name="ds_request_fulfilment"]', 
                    'Criar Conta e Atribuir Acesso ao Manage Engine - \n'+
                    nome_usuario);
                
                // await page.click('button[type="submit"]');
            }

            else if(i==2){ 
                await page.select('select[name="id_rf_category"]', "3");
                await page.click('button[type="submit"]');
                
                await page.waitForTimeout(3000);
                
                await page.type('input[name="nm_user"]', nome_usuario);
                await page.type('input[name="nm_email_blossom"]', email_blossom);
                await page.type('input[name="nm_email_not_blossom"]', email_pessoal);
                await page.type('input[name="nm_user_phone"]', telefone);
                await page.type('input[name="nm_user_local"]', local);
                await page.type(
                    'textarea[name="ds_request_fulfilment"]',
                    'Criar Usuário no Sistema de Ger. de Serviços - \n'+
                    nome_usuario
                );
                
                // await page.click('button[type="submit"]');
            }

            
            else if(i==3){
                if(sigla_local == "BH" || sigla_local == "IPA")
                    await page.select('select[name="id_rf_category"]', "7");
                else if(sigla_local == "BA" || sigla_local == "PA")
                    await page.select('select[name="id_rf_category"]', "6");
                
                await page.click('button[type="submit"]');
                
                await page.waitForTimeout(3000);
                
                await page.type('input[name="nm_usuario_criacao"]', nome_usuario);
                await page.type('input[name="tp_equipamento"]', tipo_equipamento);
                await page.type('input[name="monitor_24pol_sim_nao"]', monitor_adicional);
                await page.type(
                    'textarea[name="ds_request_fulfilment"]', 
                    'Instalar Hardware do Usuário Belo Horizonte - \n'+
                    tipo_equipamento +" - \n"+
                    nome_usuario);
                
                // await page.click('button[type="submit"]');
                break;
            }
            await page.waitForTimeout(3000);
        }
        
        await page.waitForTimeout(3000);
        
        if(autodesk.trim() != ""){
            await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
            await page.type('select[name="iduser"]', solicitador);
            await page.type('select[name="id_call_notification"]', "Webpage");
            
            await page.select('select[name="id_rf_category"]', "2");
            await page.click('button[type="submit"]');
            
            await page.waitForTimeout(3000);
            
            await page.type('input[name="nm_usuario_criacao"]', nome_usuario);
            await page.type('input[name="email_blossom"]', email_blossom);  
            await page.type('input[name="tp_licenca_autodesk"]', autodesk);
            await page.type('input[name="nm_local"]', local);
            await page.type(
                'textarea[name="ds_request_fulfilment"]', 
                'Criar Conta e/ou Atribuir Acesso a Licenças Autodesk - \n'+
                autodesk+" - \n"+
                nome_usuario);
            
            // await page.click('button[type="submit"]');
        }
    
        await page.waitForTimeout(3000);

        // Atualização do usuário no sistema AmPro
        await page.goto("https://f3-1st.ampro-sd.com/am-sys/register-user-customers");
        await page.waitForTimeout(1000);
        await page.type('input[name="deslogin"]', email_blossom);
        await page.type('input[name="desperson"]', nome_usuario);
        await page.type('input[name="desemail"]', email_blossom);
        await page.type('input[name="desemail_recovery"]', email_pessoal);
        await page.type('input[name="nrphone"]', telefone);
        await page.type('input[name="despassword"]', "12345");
        await page.type('input[name="inadmin"]', "1");
        await page.select('select[name="id_language"]', "2");
        // await page.click('button[type="submit"]');

        await page.waitForTimeout(3000);
        
        // Login e preenchimento do formulário na BHS
        await browser.newPage();
        pages = await browser.pages();
        await pages[1].goto("https://portal.bhs.com.br/chamados/novo");
        await pages[1].waitForTimeout(3000);
        await pages[1].type('input[name="loginfmt"]', user);
        await pages[1].click('input[type="submit"]');
        await pages[1].waitForTimeout(1000);
        await pages[1].type('input[name="passwd"]', pass_bhs);
        await pages[1].click('input[type="submit"]');  
        await pages[1].waitForTimeout(2000);     
        await pages[1].click('input[value="Não"]');        
        await pages[1].waitForTimeout(17000);
               
        await pages[1].type('input[name="titulo"]', "Criar conta Microsoft 365 - dia " + data_ativacao);        
        await pages[1].waitForTimeout(1000);
        await pages[1].select('select[name="tipoSolicitacao"]', "2");        
        await pages[1].waitForTimeout(1000);
        await pages[1].type(
            'textarea[name="descricao"]', 
            'Favor criar o seguinte usuário: \n'+
            '- Nome: '+nome_usuario+"\n"+
            '- E-mail para recuperação: '+email_pessoal+"\n"+
            '- E-mail Blossom: '+email_blossom+"\n"+
            '- Telefone para recuperação: '+telefone+"\n"+
            '- Licença Microsoft: '+licenca_microsoft+"\n"+
            '- Criar usuário na data: '+data_ativacao
        );

        // browser.close();
    })();

    res.redirect("/");
}