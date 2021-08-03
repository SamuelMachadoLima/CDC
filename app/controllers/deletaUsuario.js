module.exports.deletaUsuario = function (application, req, res) {
    console.log("2")
    const puppeteer = require('puppeteer');
    var params = req.body;

    const fazMicrosoft = params.d_fazMicrosoft == "fazMicrosoft" ? true : false;
    const atribuiHW = params.d_atribuiHW == "atribuiHW" ? true : false;
    const chamadoBHS = params.d_chamadoBHS == "chamadoBHS" ? true : false;
    const criar_SGS = params.d_criar_SGS == "criar_SGS" ? true : false;

    const user = params.d_user;
    const pass = params.d_pass;
    const solicitador = params.d_solicitador;
    const autodesk = params.d_autodesk;
    const data_desativacao = params.d_data_desativacao.split("-")[2] + "/" + params.d_data_desativacao.split("-")[1] + "/" + params.d_data_desativacao.split("-")[0];
    const pass_bhs = params.d_pass_bhs == "" ? params.d_pass : params.d_pass_bhs;
    const nome_usuario = params.d_nome_usuario;
    const email_blossom = params.d_email_blossom;
    const sigla_local = params.d_sigla_local;

    // Para pegar a descrição completa do local
    var local = "";
    if (sigla_local == "BH")
        local = "Blossom Consult - Matriz";
    else if (sigla_local == "IPA")
        local = "Blossom Consult - Filial Ipatinga";
    else if (sigla_local == "BA")
        local = "Blossom Consult - Filial Barcarena";
    else if (sigla_local == "PA")
        local = "Blossom Consult - Filial Paragominas";


    (async () => {

        const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
        const page = await browser.newPage();

        // Para fechar uma aba vazia
        let pages = await browser.pages();
        await pages[0].close();

        if (fazMicrosoft || atribuiHW || criar_SGS) {
            // ----Login----
            await page.goto("https://f3-1st.ampro-sd.com/admin/login");
            await page.focus('input[name="login"]');
            await page.keyboard.type(user);
            await page.type('input[name="password"]', pass);
            await page.click('button[type="submit"]');

            await page.waitForTimeout(4000);


            for (let i = 0; i < 3; i++) {

                // Excluir Conta de Usuário - Microsoft 365
                if (i == 0 && fazMicrosoft) {
                    await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
                    await page.type('select[name="iduser"]', solicitador);
                    await page.type('select[name="id_call_notification"]', "Webpage");

                    await page.select('select[name="id_rf_category"]', "32");
                    await page.click('button[type="submit"]');

                    await page.waitForTimeout(4000);

                    await page.type('input[name="nm_user"]', nome_usuario);
                    await page.type('input[name="nm_user_e-mail"]', email_blossom);
                    await page.type(
                        'textarea[name="ds_request_fulfilment"]',
                        'Excluir Usuário - Microsoft 365 - \n' +
                        data_desativacao + ' - \n' +
                        nome_usuario);

                    await page.click('button[type="submit"]');
                }

                // Desabilitar Usuário no Sistema de Ger. de Serviço
                else if (i == 1 && criar_SGS) {
                    await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
                    await page.type('select[name="iduser"]', solicitador);
                    await page.type('select[name="id_call_notification"]', "Webpage");

                    await page.select('select[name="id_rf_category"]', "30");
                    await page.click('button[type="submit"]');

                    await page.waitForTimeout(4000);

                    await page.type('input[name="nm_user"]', nome_usuario);
                    await page.type('input[name="nm_user_email"]', email_blossom);
                    await page.type(
                        'textarea[name="ds_request_fulfilment"]',
                        'Desabilitar Usuário no Sistema de Ger. de Serviço - \n' +
                        data_desativacao + ' - \n' +
                        nome_usuario);

                    await page.click('button[type="submit"]');

                }

                // Recolher Hardware do Usuário
                else if (i == 2 && atribuiHW) {
                    await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
                    await page.type('select[name="iduser"]', solicitador);
                    await page.type('select[name="id_call_notification"]', "Webpage");

                    if (sigla_local == "BH" || sigla_local == "IPA")
                        await page.select('select[name="id_rf_category"]', "33");
                    else if (sigla_local == "BA" || sigla_local == "PA")
                        await page.select('select[name="id_rf_category"]', "34");

                    await page.click('button[type="submit"]');

                    await page.waitForTimeout(4000);

                    await page.type('input[name="nm_user"]', nome_usuario);
                    await page.type('input[name="nm_user_email"]', email_blossom);
                    await page.type(
                        'textarea[name="ds_request_fulfilment"]',
                        'Recolher Hardware do Usuário - \n' +
                        data_desativacao + ' - \n' +
                        local + ' - \n' +
                        nome_usuario);

                    await page.click('button[type="submit"]');
                    break;
                }

                await page.waitForTimeout(4000);
            }

            await page.waitForTimeout(4000);

            if (autodesk.trim() != "") { // Excluir conta Autodesk
                await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
                await page.type('select[name="iduser"]', solicitador);
                await page.type('select[name="id_call_notification"]', "Webpage");

                await page.select('select[name="id_rf_category"]', "31");
                await page.click('button[type="submit"]');

                await page.waitForTimeout(4000);

                await page.type('input[name="nm_user"]', nome_usuario);
                await page.type('input[name="nm_user_email"]', email_blossom);
                await page.type(
                    'textarea[name="ds_request_fulfilment"]',
                    'Excluir Usuário do Ambiente Autodesk - \n' +
                    data_desativacao + ' - \n' +
                    local + '\n' +
                    nome_usuario);

                await page.click('button[type="submit"]');
            }


            await page.waitForTimeout(3000);

            // Alterar usuário no sistema AmPro
            await page.goto("https://f3-1st.ampro-sd.com/am-sys/list-user-customers");
            await page.type('input[name="search1"]', nome_usuario);
            await page.click('button[type="submit"]');
            await page.waitForTimeout(3000);

            const selector = 'form .table-striped tr td';
            let id = await page.evaluate(sel =>
                document.querySelector(sel).innerText
                , selector);

            await page.goto("https://f3-1st.ampro-sd.com/am-sys/update-user-customers/" + id);
            await page.waitForTimeout(3000);
            await page.evaluate(() => document.getElementById("inadmin").value = "");
            await page.type('input[name="inadmin"]', "2");
            await page.click('button[type="submit"]');

            await page.waitForTimeout(4000);
        }

        // Login e preenchimento do formulário na BHS
        if (chamadoBHS && (sigla_local != "BA" && sigla_local != "PA")) {
            await browser.newPage();
            pages = await browser.pages();
            await pages[1].goto("https://portal.bhs.com.br/chamados/novo");
            await pages[1].waitForTimeout(4000);
            await pages[1].type('input[name="loginfmt"]', user);
            await pages[1].click('input[type="submit"]');
            await pages[1].waitForTimeout(1000);
            await pages[1].type('input[name="passwd"]', pass_bhs);
            await pages[1].click('input[type="submit"]');
            await pages[1].waitForTimeout(2000);
            await pages[1].click('input[value="Não"]');
            await pages[1].waitForTimeout(21000);

            await pages[1].type('input[name="titulo"]', `Excluir conta - ${nome_usuario} - dia ${data_desativacao}`);
            await pages[1].waitForTimeout(1000);
            await pages[1].select('select[name="tipoSolicitacao"]', "2");
            await pages[1].waitForTimeout(1000);
            await pages[1].type(
                'textarea[name="descricao"]',
                `Favor excluir a conta do usuário ${nome_usuario}(${email_blossom}) no dia ${data_desativacao}.`
            );
        }


        // browser.close();
    })();

    res.redirect("/");
}