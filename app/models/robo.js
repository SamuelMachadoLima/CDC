const puppeteer = require('puppeteer');
/*_____________________________________________________________________________|*/
/* PREENCHER OS DADOS A SEGUIR PARA O FUNCIONAMENTO CORRETO DO ROBÔ            |*/


/* DADOS SOBRE O LOGIN NO SISTEMA (AmPRO)                                      |*/
const user = 'SEU EMAIL';/*  Ex: smlima@blossomconsult.com                     |*/
const pass = 'SUA SENHA';/*  Ex: 123456789                                     |*/


/* 1- Criação de usuário;                                                      |*/
/* 2- Remoção de usuário;                                                      |*/
const operacao = 1;/*                                                          |*/


/* DADOS SOBRE O USUÁRIO QUE ESTÁ SENDO CRIADO                                 |*/
const solicitador = 'Samuel M';/* Pode ser digitado apenas o começo do nome    |*/
const autodesk = "AE&C Collection"; // Se não tiver licença, deixar vazio. Se tiver, colocar o nome da licença
const data_ativacao = "01032021";/*                                            |*/
const nome_usuario = "Caroline Fernandes Freitas";/*                           |*/
const email_pessoal = "eng.carolinefreitas@gmail.com";/*                       |*/
const telefone  = "(31) 99283-6725";/*                                         |*/
const licenca_microsoft  = "Microsoft 365";/*                                  |*/
const outros_softwares = "Não";/*                                              |*/
const email_blossom = "cfreitas@blossomconsult.com";/*                         |*/
const tipo_equipamento = "Laptop Projetista";/*                                |*/
const monitor_adicional = "Sim";/*                                             |*/
const sigla_local = "PA";/*  BH, IPA, BA ou PA(Paragominas)                    |*/
/*_____________________________________________________________________________|*/






// ------------NÃO PREENCHER A SEGUIR:
var local = "";
//       Para pegar a descrição completa do local
if(sigla_local == "BH")
    local = "Blossom Consult - Filial Belo Horizonte";/*                       |*/
else if(sigla_local == "IPA")/*                                                |*/
    local = "Blossom Consult - Filial Ipatinga";/*                             |*/
else if(sigla_local == "BA")/*                                                 |*/
    local = "Blossom Consult - Filial Barcarena";/*                            |*/
else if(sigla_local == "PA")/*                                                 |*/
    local = "Blossom Consult - Filial Paragominas";/*                          |*/











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

    await page.waitForTimeout(3000);

    
        for(let i = 0; i < 4; i++){
            await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
            await page.type('select[name="iduser"]', solicitador);
            await page.type('select[name="id_call_notification"]', "Webpage");
            
            /* Caso a operação seja 1 (CRIAÇÃO DE USUÁRIO) */
            if(operacao == 1){

                /* Criar Conta de Usuário - Microsoft 365                                               |*/
                if(i==0){ /*                                                                            |*/ 
                    await page.select('select[name="id_rf_category"]', "1");/*                          |*/ 
                    await page.click('button[type="submit"]');/*                                        |*/
                    /*                                                                                  |*/
                    await page.waitForTimeout(3000);/*                                                  |*/
                    /*                                                                                  |*/
                    await page.focus('input[name="dt_user_activation"]');/*                             |*/
                    await page.keyboard.type(data_ativacao);/*                                          |*/
                    await page.type('input[name="nm_usuario_criacao"]', nome_usuario);/*                |*/
                    await page.type('input[name="email_nao_blossom"]', email_pessoal);/*                |*/
                    await page.type('input[name="nr_fone_nao_blossom"]', telefone);/*                   |*/
                    await page.type('input[name="tp_licenca_microsoft"]', licenca_microsoft)/*          |*/
                    await page.type('input[name="outros_sw_microsoft"]', outros_softwares);/*           |*/
                    await page.type('input[name="nm_email_blossom"]', email_blossom);/*                 |*/
                    await page.type('input[name="nm_local"]', local);;/*                                |*/
                    await page.type(/*                                                                  |*/
                        'textarea[name="ds_request_fulfilment"]', /*                                    |*/
                        'Criar Conta de Usuário - Microsoft 365 - \n'+/*                                |*/
                        nome_usuario);/*                                                                |*/
                    /*                                                                                  |*/
                    // await page.click('button[type="submit"]');/*                                     |*/
                }

                /*               Criar Conta e Atribuir Acesso ao Manage Engine                         |*/
                else if(i==1){ /*                                                                       |*/
                    await page.select('select[name="id_rf_category"]', "36");/*                         |*/
                    await page.click('button[type="submit"]');/*                                        |*/
                    /*                                                                                  |*/
                    await page.waitForTimeout(3000);/*                                                  |*/
                    /*                                                                                  |*/
                    await page.type('input[name="nm_usuario"]', nome_usuario);/*                        |*/
                    await page.type('input[name="user_email"]', email_blossom);/*                       |*/
                    await page.type(/*                                                                  |*/
                        'textarea[name="ds_request_fulfilment"]', /*                                    |*/
                        'Criar Conta e Atribuir Acesso ao Manage Engine - \n'+/*                        |*/
                        nome_usuario);/*                                                                |*/ 
                    /*                                                                                  |*/
                    // await page.click('button[type="submit"]');/*                                     |*/
                }

                /*                  Criar Usuário no Sistema de Ger. de Serviços                        |*/
                else if(i==2){ /*                                                                       |*/
                    await page.select('select[name="id_rf_category"]', "3");/*                          |*/
                    await page.click('button[type="submit"]');/*                                        |*/
                    /*                                                                                  |*/
                    await page.waitForTimeout(3000);/*                                                  |*/
                    /*                                                                                  |*/
                    await page.type('input[name="nm_user"]', nome_usuario);/*                           |*/
                    await page.type('input[name="nm_email_blossom"]', email_blossom);/*                 |*/
                    await page.type('input[name="nm_email_not_blossom"]', email_pessoal);/*             |*/
                    await page.type('input[name="nm_user_phone"]', telefone);/*                         |*/
                    await page.type('input[name="nm_user_local"]', local);/*                            |*/
                    await page.type(/*                                                                  |*/
                        'textarea[name="ds_request_fulfilment"]',/*                                     |*/
                        'Criar Usuário no Sistema de Ger. de Serviços - \n'+/*                          |*/
                        nome_usuario/*                                                                  |*/
                    );/*                                                                                |*/
                    /*                                                                                  |*/
                    // await page.click('button[type="submit"]');/*                                     |*/
                }

                /*                  Instalar Hardware do Usuário                                        |*/
                else if(i==3){/*                                                                        |*/
                    if(sigla_local == "BH" || sigla_local == "IPA")/*                                   |*/
                        await page.select('select[name="id_rf_category"]', "7");/*                      |*/
                    else if(sigla_local == "BA" || sigla_local == "PA")/*                               |*/ 
                        await page.select('select[name="id_rf_category"]', "6");/*                      |*/
                    /*                                                                                  |*/
                    await page.click('button[type="submit"]');/*                                        |*/
                    /*                                                                                  |*/
                    await page.waitForTimeout(3000);/*                                                  |*/
                    /*                                                                                  |*/
                    await page.type('input[name="nm_usuario_criacao"]', nome_usuario);/*                |*/
                    await page.type('input[name="tp_equipamento"]', tipo_equipamento);/*                |*/
                    await page.type('input[name="monitor_24pol_sim_nao"]', monitor_adicional);/*        |*/
                    await page.type(/*                                                                  |*/
                        'textarea[name="ds_request_fulfilment"]', /*                                    |*/ 
                        'Instalar Hardware do Usuário Belo Horizonte - \n'+/*                           |*/
                        tipo_equipamento +" - \n"+/*                                                    |*/
                        nome_usuario);/*                                                                |*/
                    /*                                                                                  |*/
                    // await page.click('button[type="submit"]');/*                                     |*/
                    break;
                }
            }// Fim operação 1


            /*                         Caso a operação seja 2 (Exclusão de usuário)                         |*/
            if(operacao == 2){/*                                                                            |*/
                /* Excluir Conta de Usuário - Microsoft 365                                                 |*/
                if(i==0){ /*                                                                                |*/ 
                    await page.select('select[name="id_rf_category"]', "32");/*                             |*/
                    await page.click('button[type="submit"]');/*                                            |*/
                    /*                                                                                      |*/
                    await page.waitForTimeout(3000);/*                                                      |*/
                    /*                                                                                      |*/
                    await page.type('input[name="nm_user"]', nome_usuario);/*                               |*/
                    await page.type('input[name="nm_user_e-mail"]', email_blossom);/*                       |*/
                    await page.type(/*                                                                      |*/
                        'textarea[name="ds_request_fulfilment"]', /*                                        |*/
                        'Excluir Usuário - Microsoft 365 - \n'+/*                                           |*/
                        nome_usuario);/*                                                                    |*/
                    /*                                                                                      |*/
                    // await page.click('button[type="submit"]');/*                                         |*/
                }

                /* Desabilitar Usuário no Sistema de Ger. de Serviço                                        |*/
                else if(i==1){ /*                                                                           |*/ 
                    await page.select('select[name="id_rf_category"]', "30");/*                             |*/ 
                    await page.click('button[type="submit"]');/*                                            |*/
                    /*                                                                                      |*/
                    await page.waitForTimeout(3000);/*                                                      |*/
                    /*                                                                                      |*/
                    await page.type('input[name="nm_user"]', nome_usuario);/*                               |*/
                    await page.type('input[name="nm_user_email"]', email_blossom);/*                        |*/
                    await page.type(/*                                                                      |*/
                        'textarea[name="ds_request_fulfilment"]', /*                                        |*/
                        'Desabilitar Usuário no Sistema de Ger. de Serviço - \n'+/*                         |*/
                        nome_usuario);/*                                                                    |*/
                    /*                                                                                      |*/
                    // await page.click('button[type="submit"]');/*                                         |*/
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
                    await page.waitForTimeout(3000);/*                                                      |*/
                    /*                                                                                      |*/
                    await page.type('input[name="nm_user"]', nome_usuario);/*                               |*/
                    await page.type('input[name="nm_user_email"]', email_blossom);/*                        |*/
                    await page.type(/*                                                                      |*/
                        'textarea[name="ds_request_fulfilment"]', /*                                        |*/
                        'Recolher Hardware do Usuário - \n'+/*                                              |*/
                        local +' - \n'+/*                                                                   |*/
                        nome_usuario);/*                                                                    |*/
                    /*                                                                                      |*/
                    // await page.click('button[type="submit"]');/*                                         |*/
                    break;
                }
            }


            await page.waitForTimeout(3000);
        }
    
        await page.waitForTimeout(3000);
        /*                                   Se houver Licenças Autodesk                                    |*/
        if(autodesk.trim() != ""){ /*                                                                                    |*/
            /*                                                                                              |*/
            /*                        Criar Conta e/ou Atribuir Acesso a Licenças Autodesk                  |*/
            if(operacao == 1){/*                                                                            |*/
                await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");/*      |*/
                await page.type('select[name="iduser"]', solicitador);/*                                    |*/
                await page.type('select[name="id_call_notification"]', "Webpage");/*                        |*/
                /*                                                                                          |*/
                await page.select('select[name="id_rf_category"]', "2");/*                                  |*/
                await page.click('button[type="submit"]');/*                                                |*/
                /*                                                                                          |*/
                await page.waitForTimeout(3000);/*                                                          |*/
                /*                                                                                          |*/
                await page.type('input[name="nm_usuario_criacao"]', nome_usuario);/*                        |*/
                await page.type('input[name="email_blossom"]', email_blossom);  /*                          |*/
                await page.type('input[name="tp_licenca_autodesk"]', autodesk);/*                   |*/
                await page.type('input[name="nm_local"]', local);/*                                         |*/
                await page.type(/*                                                                          |*/
                    'textarea[name="ds_request_fulfilment"]', /*                                            |*/
                    'Criar Conta e/ou Atribuir Acesso a Licenças Autodesk - \n'+/*                          |*/
                    autodesk+" - \n"+/*                                                             |*/
                    nome_usuario);/*                                                                        |*/
                /*                                                                                          |*/
                // await page.click('button[type="submit"]');/*                                             |*/
            }
            /*                        Excluir Usuário do Ambiente Autodesk                                  |*/
            else if(operacao == 2){/*                                                                       |*/
                await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");/*      |*/
                await page.type('select[name="iduser"]', solicitador);/*                                    |*/
                await page.type('select[name="id_call_notification"]', "Webpage");/*                        |*/
                /*                                                                                          |*/
                await page.select('select[name="id_rf_category"]', "31");/*                                 |*/
                await page.click('button[type="submit"]');/*                                                |*/
                /*                                                                                          |*/
                await page.waitForTimeout(3000);/*                                                          |*/
                /*                                                                                          |*/
                await page.type('input[name="nm_user"]', nome_usuario);/*                                   |*/
                await page.type('input[name="nm_user_email"]', email_blossom);/*                            |*/
                await page.type(/*                                                                          |*/
                    'textarea[name="ds_request_fulfilment"]', /*                                            |*/
                    'Excluir Usuário do Ambiente Autodesk - \n'+/*                                          |*/
                    local +'\n'+/*                                                                          |*/
                    nome_usuario);/*                                                                        |*/
                /*                                                                                          |*/
                // await page.click('button[type="submit"]');/*                                             |*/
            }
        }


    await page.waitForTimeout(3000);

    await page.goto("https://f3-1st.ampro-sd.com/am-sys/list-request-fulfilment");

});