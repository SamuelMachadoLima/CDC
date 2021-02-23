const puppeteer = require('puppeteer');
/*______________________________________________________________________________*/
/* PREECNHER OS DADOS A SEGUIR PARA O FUNCIONAMENTO CORRETO DO ROBÔ            |*/
/*                                                                             |*/
/*                                                                             |*/
/* DADOS SOBRE O LOGIN NO SISTEMA (AmPRO)                                      |*/
const user = 'SEU EMAIL';/*  Ex: smlima@blossomconsult.com                     |*/
const pass = 'SUA SENHA';/*  Ex: 123456789                                     |*/
/*                                                                             |*/
/* DADOS SOBRE O USUÁRIO QUE ESTÁ SENDO CRIADO                                 |*/
const solicitador = 'Tatian';/* OBS: pode ser digitado apenas o começo do nome |*/
const autodesk = true; /* True se tiver a licença, false se nao tiver          |*/
const data_ativacao = "01032021";/*                                            |*/
const nome_usuario = "Caroline Fernandes Freitas";/*                           |*/
const email_pessoal = "eng.carolinefreitas@gmail.com";/*                       |*/
const telefone  = "(31) 99283-6725";/*                                         |*/
const licenca_microsoft  = "Microsoft 365";/*                                  |*/
const licenca_autodesk  = ""; /* Se não tiver licença, deixar vazio            |*/
const outros_softwares = "Não";/*                                              |*/
const email_blossom = "cfreitas@blossomconsult.com";/*                         |*/
const local = "Blossom Consult - Filial Ipatinga";/*                           |*/
const tipo_equipamento = "Laptop Projetista";/*                                |*/
const monitor_adicional = "Sim";/*                                             |*/
/*                                                                             |*/
/*______________________________________________________________________________*/



(async () => {

    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage();
    
    // Para fechar uma aba vazia
    let pages = await browser.pages();
    await pages[0].close();
    // Para fechar uma aba vazia
    
    await page.goto("https://f3-1st.ampro-sd.com/admin/login");
  
    await page.focus('input[name="login"]')
    await page.keyboard.type(user);
    await page.type('input[name="password"]', pass);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    for(let i = 0; i < 4; i++){
        await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
        await page.type('select[name="iduser"]', solicitador);
        await page.type('select[name="id_call_notification"]', "Webpage");
        
        if(i==0){ // Criar Conta de Usuário - Microsoft 365
            await page.select('select[name="id_rf_category"]', "1");
            await page.click('button[type="submit"]');

            await page.waitForTimeout(3000);

            await page.focus('input[name="dt_user_activation"]');
            await page.keyboard.type(data_ativacao);
            await page.type('input[name="nm_usuario_criacao"]', nome_usuario);
            await page.type('input[name="email_nao_blossom"]', email_pessoal);
            await page.type('input[name="nr_fone_nao_blossom"]', telefone);
            await page.type('input[name="tp_licenca_microsoft"]', licenca_microsoft);
            await page.type('input[name="outros_sw_microsoft"]', outros_softwares);
            await page.type('input[name="nm_email_blossom"]', email_blossom);
            await page.type('input[name="nm_local"]', local);
            await page.type(
                'textarea[name="ds_request_fulfilment"]', 
                'Criar Conta de Usuário - Microsoft 365 - \n'+
                nome_usuario);
            
            // await page.click('button[type="submit"]');
        }
        else if(i==1){ // Criar Conta e Atribuir Acesso ao Manage Engine
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
        else if(i==2){ // Criar Usuário no Sistema de Ger. de Serviços
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
        else if(i==3){ // Instalar Hardware do Usuário Belo Horizonte
            await page.select('select[name="id_rf_category"]', "7");
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
        }
        
        
        await page.waitForTimeout(3000);
    }

    if(autodesk){ // Criar Conta e/ou Atribuir Acesso a Licenças Autodesk
        await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
        await page.type('select[name="iduser"]', solicitador);
        await page.type('select[name="id_call_notification"]', "Webpage");

        await page.select('select[name="id_rf_category"]', "2");
        await page.click('button[type="submit"]');

        await page.waitForTimeout(3000);

        await page.type('input[name="nm_usuario_criacao"]', nome_usuario);
        await page.type('input[name="email_blossom"]', email_blossom);  
        await page.type('input[name="tp_licenca_autodesk"]', licenca_autodesk);
        await page.type('input[name="nm_local"]', local);
        await page.type(
            'textarea[name="ds_request_fulfilment"]', 
            'Criar Conta e/ou Atribuir Acesso a Licenças Autodesk - \n'+
            licenca_autodesk+" - \n"+
            nome_usuario);

        // await page.click('button[type="submit"]');
    }

    await page.waitForTimeout(3000);

    await page.goto("https://f3-1st.ampro-sd.com/am-sys/list-request-fulfilment");

})();