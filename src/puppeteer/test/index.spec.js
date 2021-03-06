const assert = require('assert');
const fse = require('fs-extra')
const puppeteer = require('puppeteer');
const opts = process.env.D ? { headless: false, slowMo: 250 } : {};

function runPromiseByQueue(myPromises) {
  myPromises.reduce(
    (previousPromise, nextPromise) => previousPromise.then(nextPromise),
    Promise.resolve()
  );
};

describe('my app', function () {
  let browser;
  let page;

  before(async function () {
    this.timeout(100000);
    browser = await puppeteer.launch(opts);
    page = await browser.newPage();
    const url = 'https://m.lechebang.com/webapp/';
    // 打开首页
    await page.goto(url, { timeout: 0 });
    const title = await page.title();
    //await page.waitForNavigation({});
    //await page.waitForTimeout(2000);
    await page.screenshot({ path: `1.${title}.full.png`, fullPage: true });
  });

  after(async function () {
    //await page.close();
    await browser.close();
  });
  // 1. 第1步填写表单数据
  it('1.模拟已经登录', async function () {
    //
    await page.setCookie({
      name: 'token',
      value: '9572d486975656e55006faf480821e28',
      url: '',
      domain: '.lechebang.com',
      path: '/',
      //expires: '2031-04-10T10:02:31.928Z',
    });
    // 动态填写表单
  });
  // 2. 第2步打开页面
  // it('2. 打开填写爱车信息页面', async function () {
  //   const title = '智能保养方案';
  //   // 等到加载完了页面才点击
  //   await page.waitForXPath('//*[@id="main"]/article/div/div[2]');
  //   const [response] = await Promise.all([
  //     page.waitForNavigation({}), // The promise resolves after navigation has finished
  //     page.click('.wi-main-flex2'), // Clicking the link will indirectly cause a navigation
  //   ]);
  //   const url = page.url();
  //   await page.goto(url, { waitUntil: 'networkidle2' });
  //   const pageTitle = await page.title();
  //   assert.equal(title, pageTitle);
  //   await page.screenshot({ path: `2.${pageTitle}.full.png`, fullPage: true });
  // });
  // it('3.去选店铺', async function () {
  //   const [response] = await Promise.all([
  //     page.waitForNavigation({}), // The promise resolves after navigation has finished
  //     page.click('.cmt-bottom-btn'), // Clicking the link will indirectly cause a navigation
  //   ]);
  //   const url = page.url();
  //   await page.goto(url, { waitUntil: 'networkidle2' });
  //   const pageTitle = await page.title();
  //   assert.equal('4S店选择', pageTitle);
  //   await page.screenshot({ path: `3.${pageTitle}.full.png`, fullPage: true });
  // });
  // it('4.模拟店铺选择', async function () {
  //   const title = await page.title();
  //   const btns = Array.from(await page.$$('button'));
  //   const orderBtn = btns[1]; //ElementHandle
  //   await orderBtn.click();
  //   await page.waitForTimeout(500); // 时间选择器滑动向上延时
  //   await page.screenshot({ path: `4-1.${title}.full.png`, fullPage: true });
  //   // 确认按钮点击
  //   await page.click('.js-sure');
  //   // 获取接口返回是否成功
  //   const res = await page.waitForResponse((response) => {
  //     return response.url().indexOf('gateway/ord_user/matchOrder') > 0 && response.status() == 200;
  //   });
  //   // 将数据存储, 接口扩展思考，这里能干什么？
  //   const data = await res.json();
  //   await fse.outputJson('data.json', data);

  //   await page.screenshot({ path: `4-2.${title}.full.png`, fullPage: true });

  //   assert.ok(res.ok());
  // });
  // it('5.支付订单', async function () {
  //   const [response] = await Promise.all([
  //     page.waitForNavigation({}), // The promise resolves after navigation has finished
  //     page.click('.bi-bottom-btn')
  //   ]);
  //   const title = await page.title();
  //   assert.equal('在线支付', title);
  //   await page.screenshot({ path: `5.${title}.full.png`, fullPage: true });
  // });
  // 6. 实战下载图片
  // https://www.vcg.com/creative-image/meinv/
  // https://www.vcg.com/api/common/searchAllImage?phrase=%E7%BE%8E%E5%A5%B3&transform=meinv&uuid=D8C5B5_0788f3199414f148705a28d697a20d8e&isRecommendCreativeFreshData=false
  it('6.实战下载图片', async function () {
    this.timeout(1000000000);
    const page = await browser.newPage();
    await page.goto('https://www.vcg.com/creative-image/meinv/');
    await page.waitForXPath('//*[@id="YSF-BTN-HOLDER"]');
    await page.type('#input', '美女');
    await page.click('.search-btns-result');
    // 获取接口返回是否成功
    const res = await page.waitForResponse((response) => {
      return response.url().indexOf('api/common/searchAllImage') > 0 && response.status() == 200;
    });
    const result = await res.json();
    const imgs = result.list;
    //console.log('111imgs', result, imgs[0]);
    const length = imgs.length;
    //assert.isAbove(length, 0);
    // 循环去下载图片
    for (let i = 0; i < length; i++) {
      const url = imgs[i].equalw_url;
      if (url) {
        const res = await page.goto(`https:${url}`, { timeout: 0 }).catch(e => {
          console.log('111e', e);
        });
        const buffer = await res.buffer();
        if (buffer) {
          fse.outputFile(`../images/${url.slice(-10)}`, buffer);
        }
      }
    }
    //assert.ok(res.ok());
  });
  //const ajaxResponse = await page.waitForResponse(response => response.url() === 'https://example.com' && response.status() === 200);
});
