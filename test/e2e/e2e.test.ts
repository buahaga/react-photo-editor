const puppeteer = require('puppeteer');
const path = require('path');

const appURL = 'http://localhost:8080/';
const dragElement = async (page: any, x: number, y: number, offsetX: number, offsetY: number) => {
  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + offsetX, y + offsetY);
  await page.mouse.up();
}

describe('React-Photo-Editor_E2E', () => {

  let browser: any, page: any;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: process.env.DEBUG ? 250 : 25,
      args: ['--window-size=960,1080']
    });
    page = await browser.newPage();
    await page.goto(appURL);
    await page.addScriptTag({ path: require.resolve('./mouseHighlighter') });
  });

  test('App loaded with empty fileInput', async () => {
    const selector = '.drop-area';
    const result = await page.$eval(selector, el => el.value);
    expect(result).toBeFalsy();
  });

  test('Text in fileUploader should load correctly', async () => {
    await page.waitForSelector('.file-uploader-txt');
    const html = await page.$eval('.file-uploader-txt', (document: any) => document.innerHTML);
    expect(html).toBe('Choose file or just drop it here:');
  });

  test('Before picture is uploaded progressBar is empty', async () => {
    const selector = '.upload-progress-bar';
    const progressBar = await page.$(selector);
    const { width } = await progressBar.boundingBox();
    expect(width).toBeLessThan(10);
  });

  test('Before picture is uploaded toolBar is disabled', async () => {
    const selector = '#reset';
    const disabled = await page.$eval(selector, el => el.disabled);
    expect(disabled).toBeTruthy();
  });

  test('Can upload picture to the canvas on fileInput', async () => {
    const selector = '.drop-area';
    const filePath = path.relative(process.cwd(), __dirname + '/testpic.jpg');
    const input = await page.$(selector);
    await input.uploadFile(filePath);
    const result = await page.$eval(selector, el => el.value);
    expect(result).toBeTruthy();
  });

  test('After picture is uploaded progressBar is full', async () => {
    const selector = '.upload-progress-bar';
    const progressBar = await page.$(selector);
    const { width } = await progressBar.boundingBox();
    expect(width).toBeGreaterThan(50);
  });

  test('After picture is uploaded toolBar is active', async () => {
    const selector = '#blur';
    const disabled = await page.$eval(selector, el => el.disabled);
    expect(disabled).toBeFalsy();
  });

  test('After picture is uploaded canvas changing on click Blur', async () => {
    const selector = '#blur';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('After picture is uploaded canvas changing on click Black&White', async () => {
    const selector = '#greyscale';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('After picture is uploaded canvas changing on click Color', async () => {
    const selector = '#highlight';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('Before switcher Crop is active crop is disabled', async () => {
    const selector = '#crop';
    const disabled = await page.$eval(selector, el => el.disabled);
    expect(disabled).toBeTruthy();
  });

  test('You can activate Crop with click on switch', async () => {
    const selector = '#icrop';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('CropArea position doesnt change on area drag if its size is eaqual to canvas', async () => {
    const selector = '.crop-area';
    const area = await page.$(selector);
    const { x, y } = await area.boundingBox();
    await dragElement(page, x + 20, y + 20, 50, 50);
    const result = await area.boundingBox();
    expect(result.x).toBe(x);
  });

  test('After picture is uploaded canvas changing on click Crop', async () => {
    const selector = '#crop';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('CropArea size change on cropRuler drag', async () => {
    const selector = '.crop-handler';
    const handler = await page.$(selector);
    const { x, y } = await handler.boundingBox();
    await dragElement(page, x, y, 100, 100);
    const result = await handler.boundingBox();
    expect(result.x).toBeGreaterThan(x);
  });

  test('After picture is uploaded canvas changing on click Reset', async () => {
    const selector = '#reset';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('After picture is uploaded canvas changing on click Save', async () => {
    const selector = '#save';
    await page.waitForSelector(selector);
    await page.click(selector);
    const newImageOnPage = await page.waitForSelector('img');
    expect(newImageOnPage).toBeTruthy();
  });

  test('Canvas changing on click Clear', async () => {
    const selector = '#clear';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('Cannot draw or on canvas when switch is off', async () => {
    await dragElement(page, 0, 0, 50, 50);
  });

  test('You can activate Draw with click on switch', async () => {
    const selector = '#idraw';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('You can draw on canvas after draw is on', async () => {
    await dragElement(page, 20, 20, 100, 100);
  });

  test('You can change crayon color on click', async () => {
    const blue = '#blue';
    await page.waitForSelector(blue);
    await page.click(blue);
    await dragElement(page, 50, 50, 100, 100);
  });

  test('You can change crayon size on click', async () => {
    const size = '#crayon-increase';
    await page.waitForSelector(size);
    await page.click(size);
    await page.click(size);
    await page.click(size);
    await page.click(size);
    await page.click(size);
    await dragElement(page, 150, 150, 300, 300);
  });

  test('You can activate Drop with click on switch', async () => {
    const selector = '#idrop';
    await page.waitForSelector(selector);
    await page.click(selector);
  });

  test('Can drop image from DropToolBar on canvas', async () => {
    const selector = '.firstimage';
    const imageToDrag = await page.$(selector);
    const { x, y } = await imageToDrag.boundingBox();
    await dragElement(page, x, y, 150, 150);
  });

  afterAll(() => {
    browser.close();
  });

});
