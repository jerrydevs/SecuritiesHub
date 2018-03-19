const iexEndpt = "https://api.iextrading.com/1.0";
const iexMarket = "/stock/market/batch?symbols="
const coinMktEndpt = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
const iexMktLast = "https://api.iextrading.com/1.0/tops/last";
const topPerfSection = document.getElementById("topPerforming");
const bottomPerfSection = document.getElementById("bottomPerforming");

const iexMaxBatch = 100;

class symbolItem{
  constructor(symbol, name){
    this.symbol = symbol;
    this.name = name;
  }
  getSymbol(){
    return this.symbol;
  }
  getName(){
    return this.name;
  }
}

class secItem{
  constructor(symbol, name, currentPrice, openPrice, delta){
    this.symbol = symbol;
    this.name = name;
    this.currentPrice = currentPrice;
    this.openPrice = openPrice;
    this.delta = delta;
  }
  getSymbol(){
    return this.symbol;
  }
  getName(){
    return this.name;
  }
  getCurrentPrice(){
    return this.currentPrice;
  }
  getOpenPrice(){
    return this.openPrice;
  }
  getDelta(){
    return this.delta;
  }
  getDeltaPerc(){
    return 100*(this.currentPrice - this.openPrice)/this.openPrice;
  }
  setName(name){
    this.name = name;
  }
}

class cryptoItem{
  constructor(symbol, name, price, marketCap, deltaPerc1H, deltaPerc1D, deltaPerc7D){
    this.symbol = symbol;
    this.name = name;
    this.price = price;
    this.marketCap = marketCap;
    this.deltaPerc1H = deltaPerc1H;
    this.deltaPerc1D = deltaPerc1D;
    this.deltaPerc7D = deltaPerc7D;
  }
  getSymbol(){
    return this.symbol;
  }
  getName(){
    return this.name;
  }
  getPrice(){
    return this.price;
  }
  getMarketCap(){
    return this.marketCap;
  }
  getDeltaPerc1H(){
    return this.deltaPerc1H;
  }
  getDeltaPerc1D(){
    return this.deltaPerc1D;
  }
  getDeltaPerc7D(){
    return this.deltaPerc7D;
  }
}

function getSymbols(stockItems) {
  return stockItems.reduce((total, item) => {
    total.push(new symbolItem(item.symbol, item.name));
    return total;
  }, [])
}

function clearHighlights() {
  document.getElementById("topPerforming").innerHTML = "<h3>Top Performing</h3>";
  document.getElementById("bottomPerforming").innerHTML = "<h3>Bottom Performing</h3>";
}

function insertStockHTML(stockItem, location) {
  const html = `
  <div class="stockItem topPerfStock">
      <p class="companyName" id="tester">${stockItem.getName()}</p>
      <div class="stockInfo">
          <p class="stockSymbol">${stockItem.getSymbol()}</p>
          <p class="dollarChange">$${stockItem.getDelta().toFixed(2)}</p>
          <p class="percentChange">${stockItem.getDeltaPerc().toFixed(2)}%</p>
      </div>
  </div>`;
  location.insertAdjacentHTML("beforeend", html);
}

function insertCryptoHTML(cryptoItem, location) {
  const html = `
  <div class="cryptoItem topPerfStock">
      <p class="companyName" id="tester">${cryptoItem.getName()}</p>
      <div class="stockInfo">
          <p class="stockSymbol">${cryptoItem.getSymbol()}</p>
          <p class="dollarChange">${cryptoItem.getDeltaPerc1H()}%</p>
          <p class="percentChange">${cryptoItem.getDeltaPerc1D()}%</p>
      </div>
  </div>`;
  location.insertAdjacentHTML("beforeend", html);
}

function makeStockRequestURL(symbols, index, iters) {
  let url = iexEndpt + iexMarket;
  for (let i = index; i < index + iters; i++) {
    url += `${symbols[i].getSymbol()},`;
  }
  url += "&types=quote";
  return url;
}

function makeCurrentStockItems(stockData) {
  return stockData.reduce((total, item) => {
    if (item.price > 0) {
      total.push(new secItem(item.symbol, null, item.price, null, null));
    }
    return total;
  }, [])
}

function objToArray(obj) {
  return Object.keys(obj).map(i => obj[i]);
}

function makeOpenStockItems(stockData) {
  return stockData.reduce((total, item) => {
    total.push(new secItem(item.quote.symbol, item.quote.companyName, null, item.quote.open, null));
    return total;
  }, [])
}

async function getOpenStockData(stockSymbols, index, volume) {
  let tempRequest = await fetch(makeStockRequestURL(stockSymbols, index, volume));
  tempRequest = await tempRequest.json();
  tempRequest = await makeOpenStockItems(objToArray(tempRequest));
  return tempRequest;
}

function sortBySymbol(itemA, itemB) {
  if (a.getSymbol() < b.getSymbol()) {
    return -1;
  } else if (a.getSymbol() > b.getSymbol()) {
    return 1;
  }
}

function isIn(stockItem, stockArray) {
  let isIn = -1;
  for (let i = 0; i < stockArray.length; i++) {
    if (stockItem.getSymbol() === stockArray[i].getSymbol()) {
      isIn = i;
      break;
    }
  }
  return isIn;
}

function consolidateItems(currentItems, openItems) {
  let consolidated = [];
  for (let i = 0; i < currentItems.length; i++) {
    const itemIndex = isIn(currentItems[i], openItems);
    if (itemIndex != -1) {
      consolidated.push(new secItem(
        openItems[itemIndex].getSymbol(),
        openItems[itemIndex].getName(),
        currentItems[i].getCurrentPrice(),
        openItems[itemIndex].getOpenPrice(),
        currentItems[i].getCurrentPrice() - openItems[itemIndex].getOpenPrice()
      ))
    }
  }
  return consolidated;
}

async function cryptoSummary() {
  let data = await fetch(coinMktEndpt);
  data = await data.json();

  let [cryptoData] = await Promise.all([data]);

  cryptoData = cryptoData.reduce((total, item) => {
    if (item.market_cap_usd != null & item.available_supply != null & item["24h_volume_usd"] != null){
      total.push(new cryptoItem(
        item.symbol, 
        item.name, 
        item.price_usd,
        item.market_cap_usd, 
        item.percent_change_1h,
        item.percent_change_24h,
        item.percent_change_7d))
    }
    return total;
  }, [])

  cryptoData = cryptoData.sort((a, b) => {
    return b.getDeltaPerc1H() - a.getDeltaPerc1H();
  })

  clearHighlights();
  cryptoData.slice(0, 20).forEach((item) => insertCryptoHTML(item, topPerfSection));
  cryptoData.slice(-20).reverse().forEach((item) => insertCryptoHTML(item, bottomPerfSection));
  console.log(cryptoData);
}

async function stockSummary() {
  let currentPrices = await fetch(iexMktLast);
  currentPrices = await currentPrices.json();

  let [prices] = await Promise.all([currentPrices]);
  currentStockItems = makeCurrentStockItems(prices);  

  const stockSymbols = getSymbols(currentStockItems);

  const fullIters = Math.floor(currentStockItems.length / iexMaxBatch);
  const remainderVol = currentStockItems.length % iexMaxBatch;

  let openStockItems = [];
  for (let i = 0; i < fullIters; i++) {
    openStockItems = openStockItems.concat(await getOpenStockData(stockSymbols, i*iexMaxBatch, iexMaxBatch));
  }
  openStockItems = openStockItems.concat(await getOpenStockData(stockSymbols, fullIters*iexMaxBatch, remainderVol));

  let consolidatedItems = consolidateItems(currentStockItems, openStockItems);

  consolidatedItems = consolidatedItems.reduce((total, item) => {
    if (item.getName() === "") {
      item.setName("Company name unavailable");
    }
    if (item.getOpenPrice() !== null) {
      total.push(item);
    }
    return total;
  }, [])

  let stocksAsc = consolidatedItems.sort((a, b) => {
      if (a.getDeltaPerc() < b.getDeltaPerc()) {
        return -1;
      } else {
        return 1;
      }
    });

  let stocksDesc = stocksAsc.reverse();

  const topResults = stocksAsc.slice(0, 20);
  const bottomResults = stocksAsc.slice(-20).reverse();

  console.log(stocksAsc.slice(0,100));
  console.log(stocksAsc.slice(-100).reverse());

  clearHighlights();

  topResults.forEach((item) => insertStockHTML(item, topPerfSection));
  bottomResults.forEach((item) => insertStockHTML(item, bottomPerfSection));
}
