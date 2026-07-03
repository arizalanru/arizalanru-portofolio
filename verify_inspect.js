const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });
  
  // Wait for dev server
  try {
    await page.goto('http://localhost:5173/projects/fintrack', { waitUntil: 'networkidle', timeout: 15000 });
  } catch(e) {
    try {
      await page.goto('http://localhost:5174/projects/fintrack', { waitUntil: 'networkidle', timeout: 10000 });
    } catch(e2) {
      console.log('ERROR: Could not reach dev server: ' + e2.message);
      await browser.close();
      process.exit(1);
    }
  }

  await page.screenshot({ path: 'C:/website-portofolio/verify_full.png', fullPage: true });

  // Find section 04
  const section04 = await page.evaluate(() => {
    const labels = Array.from(document.querySelectorAll('p'));
    const label = labels.find(p => p.textContent.includes('04') && p.textContent.includes('Interface Preview'));
    if (!label) return { error: 'section 04 label not found' };
    
    const section = label.closest('div');
    const imgs = section.querySelectorAll('img');
    const results = [];
    
    imgs.forEach(img => {
      const wrapper = img.parentElement;
      const wrapperStyles = window.getComputedStyle(wrapper);
      const imgStyles = window.getComputedStyle(img);
      results.push({
        imgSrc: img.src.split('/').slice(-2).join('/'),
        imgNaturalSize: img.naturalWidth + 'x' + img.naturalHeight,
        imgRenderedSize: img.offsetWidth + 'x' + img.offsetHeight,
        wrapperTag: wrapper.tagName,
        wrapperInlineStyle: wrapper.getAttribute('style'),
        wrapperClass: wrapper.className,
        computed_aspectRatio: wrapperStyles.aspectRatio,
        computed_width: wrapperStyles.width,
        computed_height: wrapperStyles.height,
        computed_overflow: wrapperStyles.overflow,
        img_computed_width: imgStyles.width,
        img_computed_height: imgStyles.height,
        img_objectFit: imgStyles.objectFit,
      });
    });
    return results;
  });

  console.log(JSON.stringify(section04, null, 2));
  await browser.close();
})();
