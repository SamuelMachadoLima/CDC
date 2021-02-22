const puppeteer = require('puppeteer');
const user = 'smlima@blossomconsult.com';
const pass = 'cHUCRUTE12*';
const solicitador = 'Samuel Machado de Lima';
const autodesk = false;
const cidade = "Belo Horizonte";


(async () => {
    const browser = await puppeteer.launch({ headless: false, defaultViewport: null });
    const page = await browser.newPage(); // missing await
    
    await page.goto("https://f3-1st.ampro-sd.com/admin/login");
  
    await page.type('input[name="login"]', user);
    await page.type('input[name="password"]', pass);

    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    for(let i = 0; i < 4; i++){
        await page.goto("https://f3-1st.ampro-sd.com/am-sys/categorize-request-fulfilment");
        await page.type('select[name="iduser"]', solicitador);
        await page.type('select[name="id_call_notification"]', "Webpage");
        if(i==0)
            await page.select('select[name="id_rf_category"]', "1");
        if(i==1)
            await page.select('select[name="id_rf_category"]', "36");
        if(i==2)
            await page.select('select[name="id_rf_category"]', "3");
        if(i==3)
            await page.select('select[name="id_rf_category"]', "7");
        
        
        await page.waitForTimeout(1000);
    }

    if(autodesk)
        await page.select('select[name="id_rf_category"]', "2");

})();