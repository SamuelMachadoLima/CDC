module.exports.deletaUsuario = function (application, req, res) {
    const puppeteer = require('puppeteer');
    var params = req.body;

    const user = params.d_user;
    const pass = params.d_pass;
    const solicitador = params.d_solicitador;
    const autodesk = params.d_autodesk;
    const data_desativacao = params.d_data_desativacao.split("-")[2]+"/"+params.d_data_desativacao.split("-")[1]+"/"+params.d_data_desativacao.split("-")[0];
    const nome_usuario = params.d_nome_usuario;
    const email_blossom = params.d_email_blossom;
    const sigla_local = params.d_sigla_local;

    // Para pegar a descrição completa do local
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
        
        /*           Para fechar uma aba vazia            |*/ 
        let pages = await browser.pages();/*              |*/
        await pages[0].close();/*                         |*/
        
    
        /*                      ----Login----                            |*/
        await page.goto("https://f3-1st.ampro-sd.com/admin/login");/*    |*/
        await page.focus('input[name="login"]');/*                       |*/
        await page.keyboard.type(user);/*                                |*/
        await page.type('input[name="password"]', pass);/*               |*/
        await page.click('button[type="submit"]');/*                     |*/
    
        await page.waitForTimeout(4000);
    
        
        for(let i = 0; i < 4; i++){
            await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
            await page.type('select[name="iduser"]', solicitador);
            await page.type('select[name="id_call_notification"]', "Webpage");

            /* Excluir Conta de Usuário - Microsoft 365                                                 |*/
            if(i==0){ 
                await page.select('select[name="id_rf_category"]', "32");/*                             |*/
                await page.click('button[type="submit"]');/*                                            |*/
                /*                                                                                      |*/
                await page.waitForTimeout(4000);/*                                                      |*/
                /*                                                                                      |*/
                await page.type('input[name="nm_user"]', nome_usuario);/*                               |*/
                await page.type('input[name="nm_user_e-mail"]', email_blossom);/*                       |*/
                await page.type(/*                                                                      |*/
                    'textarea[name="ds_request_fulfilment"]', /*                                        |*/
                    'Excluir Usuário - Microsoft 365 - \n'+/*                                           |*/
                    data_desativacao + ' - \n'+
                    nome_usuario);/*                                                                    |*/

                await page.click('button[type="submit"]');/*                                         |*/
            }

            /* Desabilitar Usuário no Sistema de Ger. de Serviço                                        |*/
            else if(i==1){ /*                                                                           |*/ 
                await page.select('select[name="id_rf_category"]', "30");/*                             |*/ 
                await page.click('button[type="submit"]');/*                                            |*/
                /*                                                                                      |*/
                await page.waitForTimeout(4000);/*                                                      |*/
                /*                                                                                      |*/
                await page.type('input[name="nm_user"]', nome_usuario);/*                               |*/
                await page.type('input[name="nm_user_email"]', email_blossom);/*                        |*/
                await page.type(/*                                                                      |*/
                    'textarea[name="ds_request_fulfilment"]', /*                                        |*/
                    'Desabilitar Usuário no Sistema de Ger. de Serviço - \n'+/*                         |*/
                    data_desativacao + ' - \n'+
                    nome_usuario);/*                                                                    |*/
                
                await page.click('button[type="submit"]');/*                                         |*/
            }

            /* Recolher Hardware do Usuário                                                             |*/
            else if(i==2){ /*                                                                           |*/
                if(sigla_local == "BH" || sigla_local == "IPA")/*                                       |*/
                    await page.select('select[name="id_rf_category"]', "33");/*                         |*/
                else if(sigla_local == "BA" || sigla_local == "PA")/*                                   |*/ 
                    await page.select('select[name="id_rf_category"]', "34");/*                         |*/
                /*                                                                                      |*/
                await page.click('button[type="submit"]');/*                                            |*/
                /*                                                                                      |*/
                await page.waitForTimeout(4000);/*                                                      |*/
                /*                                                                                      |*/
                await page.type('input[name="nm_user"]', nome_usuario);/*                               |*/
                await page.type('input[name="nm_user_email"]', email_blossom);/*                        |*/
                await page.type(/*                                                                      |*/
                    'textarea[name="ds_request_fulfilment"]', /*                                        |*/
                    'Recolher Hardware do Usuário - \n'+/*                                              |*/
                    data_desativacao + ' - \n'+
                    local +' - \n'+/*                                                                   |*/
                    nome_usuario);/*                                                                    |*/
                
                await page.click('button[type="submit"]');/*                                         |*/
                break;
            }

            await page.waitForTimeout(4000);
        }
        
        await page.waitForTimeout(4000);
        /*                                   Se houver Licenças Autodesk                                    |*/
        if(autodesk.trim() != ""){
            /*                        Excluir Usuário do Ambiente Autodesk                                  |*/
                await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");/*      |*/
                await page.type('select[name="iduser"]', solicitador);/*                                    |*/
                await page.type('select[name="id_call_notification"]', "Webpage");/*                        |*/
                /*                                                                                          |*/
                await page.select('select[name="id_rf_category"]', "31");/*                                 |*/
                await page.click('button[type="submit"]');/*                                                |*/
                /*                                                                                          |*/
                await page.waitForTimeout(4000);/*                                                          |*/
                /*                                                                                          |*/
                await page.type('input[name="nm_user"]', nome_usuario);/*                                   |*/
                await page.type('input[name="nm_user_email"]', email_blossom);/*                            |*/
                await page.type(/*                                                                          |*/
                    'textarea[name="ds_request_fulfilment"]', /*                                            |*/
                    'Excluir Usuário do Ambiente Autodesk - \n'+/*                                          |*/
                    data_desativacao + ' - \n'+
                    local +'\n'+/*                                                                          |*/
                    nome_usuario);/*                                                                        |*/
                    
                await page.click('button[type="submit"]');/*                                             |*/
        }
    
    
        await page.waitForTimeout(3000);
        
        // // Alterar usuário no sistema AmPro
        await page.goto("https://f3-1st.ampro-sd.com/am-sys/list-user-customers");
        await page.type('input[name="search1"]', nome_usuario);
        await page.click('button[type="submit"]');
        await page.waitForTimeout(3000);

        const selector = 'form .table-striped tr td';
        let id = await page.evaluate(sel =>
            document.querySelector(sel).innerText
          , selector);

        await page.goto("https://f3-1st.ampro-sd.com/am-sys/update-user-customers/"+id);
        await page.waitForTimeout(3000);
        await page.evaluate( () => document.getElementById("inadmin").value = "");
        await page.type('input[name="inadmin"]', "2");
        await page.click('button[type="submit"]');

        await page.waitForTimeout(3000);

        await page.goto("https://f3-1st.ampro-sd.com/am-sys/list-request-fulfilment");
        // browser.close();
    })();

    res.redirect("/");
}