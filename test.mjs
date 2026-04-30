import puppeteer from 'puppeteer';

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/impact', { waitUntil: 'networkidle0' });

    const info = await page.evaluate(() => {
        const wrap = document.querySelector('.ch1-intro-wrap');
        const particles = document.querySelector('.ch1-particle-container');
        
        if (!wrap) return { error: 'Wrap not found' };
        
        const rect = wrap.getBoundingClientRect();
        const computed = window.getComputedStyle(wrap);
        const titleComputed = window.getComputedStyle(wrap.querySelector('.ch1-title'));
        const bodyComputed = window.getComputedStyle(document.body);
        
        return {
            wrap: {
                rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height },
                opacity: computed.opacity,
                display: computed.display,
                visibility: computed.visibility,
                transform: computed.transform,
                zIndex: computed.zIndex,
                color: titleComputed.color,
            },
            body: {
                color: bodyComputed.color,
                bgColor: bodyComputed.backgroundColor,
                height: bodyComputed.height,
            }
        };
    });

    console.log(JSON.stringify(info, null, 2));
    await browser.close();
})();
