// import puppeteer from 'puppeteer';
import chromium from 'chrome-aws-lambda';


export default async function handler(req, res) {
    // Check if the request method is POST and has a valid URL in the request body
    if (req.method === 'POST' && req.body.url) {
        try {
            // Launch the browser
            //   const browser = await puppeteer.launch();
            // const browser = await puppeteer.launch({
            //     headless: true,
            //     args: [
            //       '--no-sandbox',
            //       '--disable-setuid-sandbox',
            //       '--disable-dev-shm-usage',
            //       '--disable-accelerated-2d-canvas',
            //       '--disable-gpu'
            //     ],
            //   });
            const browser = await chromium.puppeteer.launch({
                args: chromium.args,
                defaultViewport: chromium.defaultViewport,
                executablePath: await chromium.executablePath,
                headless: chromium.headless,
            });
            // Create a new page
            const page = await browser.newPage();
            // Navigate to the desired URL
            await page.goto(req.body.url);

            // Extract the headline and article text
            const data = await page.evaluate(() => {
                const articleParagraphs = Array.from(document.querySelectorAll('section[name="articleBody"] p')).map(
                    (paragraph) => paragraph.innerText
                );
                const articleText = articleParagraphs.join('\n');

                return {
                    articleText,
                };
            });

            // Close the browser
            await browser.close();

            // Send the extracted data as a JSON response
            res.status(200).json(data);
        } catch (error) {
            console.error('Error scraping article:', error);
            res.status(500).json({ error: 'Error scraping article' });
        }
    } else {
        res.status(400).json({ error: 'Invalid request method or missing URL' });
    }
}
