const puppeteer = require('puppeteer')
const WHITESPACE = '●'
const os = require('os')
const executablePath = ''
// executablePath = './build/win64-1036745/chrome-win/chrome.exe'
const readline = require("readline");
const { stdin: input, stdout: output } = require('process');
const { rejects } = require('assert');
const interviewer = readline.createInterface({ input, output });
let answer = '';

let browser



// actual Logic Start
run ()
// actual Logic End

async function run() {
  console.log(`운영체제 ${os.type()}`)
  if (!isWindow) {
    console.log('window가 아닌 운영체제는 지원하지 않습니다.')
    return
  }
  await askSearchString()
  const searchString = answer.replace(/\s+/g, WHITESPACE)
  await search(searchString)
}

function isWindow() {
  return os.type().toLowerCase().indexOf('window') > -1
}

async function askSearchString() {
  await new Promise(res => {
    interviewer.question('검색할 상품을 입력하세요 :', (ans) => {
      answer = ans
      interviewer.close()
      res()
    })
  })
}

async function search(searchString) {
  const launchOption = {
    headless: false,
    args: ['--window-size=1500,1000'],
  }

  if (executablePath) {
    launchOption['executablePath'] = executablePath
  }

  browser = await puppeteer.launch(launchOption)
    searchLotteOn(searchString)
    searchWeMakePrice(searchString)
    searchAuction(searchString)
    searchGmarket(searchString)
    searchCoupang(searchString)
    searchSSG(searchString)
    searchTmon(searchString)
    searchSt11(searchString)
    searchNaver(searchString)
    searchDanawa(searchString)  
}

async function searchCoupang(searchString) {
  searchString = searchString.replace(/●/g, '+')
  let url = `https://www.coupang.com/np/search?component=&q=${searchString}`
  loadPage(url)
}

async function searchSt11(searchString) {
  searchString = searchString.replace(/●/g, '%20')
  let url = `https://search.11st.co.kr/Search.tmall?kwd=${searchString}`
  loadPage(url)
}

async function searchLotteOn(searchString) {
  searchString = searchString.replace(/●/g, '%20')
  let url = `https://www.lotteon.com/search/search/search.ecn?render=search&platform=pc&q=${searchString}&mallId=1`
  loadPage(url)
}

async function searchTmon(searchString) {
  searchString = searchString.replace(/●/g, '%20')
  let url = `https://search.tmon.co.kr/search/?keyword=${searchString}`
  loadPage(url)
}

async function searchSSG(searchString) {
  searchString = searchString.replace(/●/g, '%20')
  let url = `https://emart.ssg.com/search.ssg?target=all&query=${searchString}`
  loadPage(url)
}

async function searchWeMakePrice(searchString) {
  searchString = searchString.replace(/●/g, '%20')
  let url = `https://search.wemakeprice.com/search?search_cate=top&keyword=${searchString}&isRec=1&_service=5&_type=3`
  await loadPage(url)
}

async function searchGmarket(searchString) {
  searchString = searchString.replace(/●/g, '+')
  let url = `https://browse.gmarket.co.kr/search?keyword=${searchString}`
  await loadPage(url)
}

async function searchAuction(searchString) {
  searchString = searchString.replace(/●/g, '+')
  let url = `https://browse.auction.co.kr/search?keyword=${searchString}`
  await loadPage(url)
}

async function searchNaver(searchString) {
  searchString = searchString.replace(/●/g, '%20')
  let url = `https://search.shopping.naver.com/search/all?query=${searchString}`
  loadPage(url)
}

async function searchDanawa(searchString) {
  searchString = searchString.replace(/●/g, '+')
  let url = `https://search.danawa.com/dsearch.php?query=${searchString}`
  loadPage(url)
}

async function testRakuten() {
  let url = 'https://www.rakuten.co.jp'
  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36')
  await page.setViewport({
    width: 750,
    height: 1000,
    isMobile: true,
    hasTouch: true
  })
  await page.goto(url)
}
async function loadPage(url) {
  const page = await browser.newPage();

  page.setViewport({
    width: 1500,
    height: 1000,
  })

  await page.goto(url);
}

