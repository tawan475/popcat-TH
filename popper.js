const puppeteer = require("puppeteer");
let counter = 0;

(async () => {
    console.log("Starting!")
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36");

    page.on('requestfinished', async (request) => {
        if (!request.url().startsWith("https://stats.popcat.click/pop?pop_count=")) return
        let rawResponse = await request.response();
        let response = await rawResponse.buffer();
        let responseBody = response.toString();

        if (responseBody.startsWith("429")) return console.log("429: Too many request! Did you forget to close the browser? retrying in 30 seconds.");
        if (responseBody.startsWith("503")) return console.log("503: Server can not find Country Code, retrying in 30 seconds.");
        var json = JSON.parse(responseBody);

        console.log("Popped for " + json["Location"]["Name"] + "! x" + (++counter * 800));

    });


    await page.goto("https://popcat.click/");
    await page.evaluate(() => {
        for (let i = 0; i < 800; i++) {
            document.dispatchEvent(new KeyboardEvent('keydown', {
                key: 'x',
                ctrlKey: true
            }));
        }
        setInterval(() => {
            for (let i = 0; i < 800; i++) {
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'x',
                    ctrlKey: true
                }));
            }
        }, 30 * 1000);
    });
    setTimeout(async () => {
        await page.reload({ waitUntil: ["networkidle0", "domcontentloaded"] });
        console.log("Reloading the page! normal behavior.");
        await page.evaluate(() => {
            for (let i = 0; i < 800; i++) {
                document.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'x',
                    ctrlKey: true
                }));
            }
            setInterval(() => {
                for (let i = 0; i < 800; i++) {
                    document.dispatchEvent(new KeyboardEvent('keydown', {
                        key: 'x',
                        ctrlKey: true
                    }));
                }
            }, 30 * 1000);
        });
    }, 10 * 60 * 1000);
    console.log("Started! First pop might be \"Too many request\" don't panic.")
})();

// Inspired by https://github.com/ckanthony/Popcat-Click-Bot
// Code written by tawan475