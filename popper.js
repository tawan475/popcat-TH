const puppeteer = require("puppeteer");
let counter = 0;

(async () => {
    console.log("Starting!")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36")

    page.on('requestfinished', async (request) => {
        if (!request.url().startsWith("https://stats.popcat.click/pop?pop_count=")) return
        let rawResponse = await request.response();
        let response = await rawResponse.buffer();
        let responseBody = response.toString();
        
        if (responseBody.startsWith("429")) return console.log("Too many request! Did you forget to close the browser? retrying 30 seconds.")
        var json = JSON.parse(responseBody);
        console.log("Popped for " + json["Location"]["Name"] + "! x" + (++counter * 800))
    });


    await page.goto("https://popcat.click/");
    await page.evaluate(() => {
        document.dispatchEvent(new KeyboardEvent('keydown', {'key':'a'}));
        document.dispatchEvent(new KeyboardEvent('keyup', {'key':'a'}));
        
        setInterval(() => {
            document.getElementById('app').__vue__.bot = !1;
            document.getElementById('app').__vue__.sequential_max_pops = 0;
            document.getElementById('app').__vue__.accumulator = 800;
        }, 30 * 1000);
    });
    console.log("Started! First pop might be \"Too many request\" don't panic.")
})();

// Inspired by https://github.com/ckanthony/Popcat-Click-Bot
// Code written by tawan475
