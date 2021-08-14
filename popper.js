process.setMaxListeners(0);
const puppeteer = require("puppeteer");
const fs = require("fs");
let limiter = parseInt(process.argv.slice(2)[0]);

let screenshots = "./screenshots/"

let counter = 0
app = () => {
    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36")
        await page.setViewport({ width: 300, height: 250 });
        await page.goto("https://popcat.click/");

        let i = 0;
        let ID = (counter++).toString()
        console.log(ID.padStart(2, " ") + ' ready!');
        setInterval(async () => {
            if (counter !== limiter) return
            console.log(ID.padStart(2, " ") + ":clicked");
            await page.evaluate(() => {
                for (i = 0; i < 800; i++) {
                    document.dispatchEvent(new KeyboardEvent('keydown', {
                        key: 'x',
                        ctrlKey: true
                    }));
                }
            });
        }, 1000 * 30);
        setInterval(async () => {
            await page.screenshot({ path: `./screenshots/${ID}.png` });
        }, 1000 * 60);
    })()
}

for (let i = 0; i < limiter; i++) {
    app();
}

if (!fs.existsSync(screenshots)) {
    fs.mkdirSync(screenshots);
} else {
    let folder = fs.readdirSync(screenshots)
    for (const file of folder) {
        fs.unlinkSync(screenshots + file);
    }
}

// Inspired by https://github.com/ckanthony/Popcat-Click-Bot
// Code written by tawan475
