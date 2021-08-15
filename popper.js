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
        document.dispatchEvent(new KeyboardEvent('keydown', {'key':'a'}));
        document.dispatchEvent(new KeyboardEvent('keyup', {'key':'a'}));
        document.getElementById('app').__vue__.accumulator = 800;
        // making the first request to 800

        setInterval(() => {
            document.getElementById('app').__vue__.bot = !1;
            document.getElementById('app').__vue__.sequential_max_pops = 0;
            document.getElementById('app').__vue__.accumulator = 800;
            document.dispatchEvent(new KeyboardEvent('keydown', {'key':'a'}));
            document.dispatchEvent(new KeyboardEvent('keyup', {'key':'a'}));
            // ensure that the get event is called
        }, 15 * 1000); 
        /*  
            Change from 30 seconds to 15 seconds,  
            This result will send to server really around 30 seconds from 60 seconds (optimal)

            Old -> set to 30 * 1000 -> Realtime -> around 60 seconds
            New -> set to 15 * 1000 -> Realtime -> around 30 seconds
            or even -> set to 1 * 1000 -> Realtime -> around 30 seconds

            I don't know why, maybe 
                1. internal popclick server delay
                2. puppeteer ? 
                3. etc... 

            comment by: tawan475, sirawit-suk

        */
    });
    console.log("Started! First pop might be \"Too many request\" don't panic.")
})();

// Inspired by https://github.com/ckanthony/Popcat-Click-Bot
// Code written by tawan475