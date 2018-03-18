const iexEndpt = "https://api.iextrading.com/1.0";
const iexMarket = "/stock/market/batch?symbols="
const coinMktEndpt = "https://api.coinmarketcap.com/v1/ticker/";
const iexMktLast = "https://api.iextrading.com/1.0/tops/last";
const topPerfSection = document.getElementById("topPerforming");
const bottomPerfSection = document.getElementById("bottomPerforming");

const iexMaxBatch = 100;

function getTickers(stockItems) {
  return stockItems.reduce((total, item) => {
    total.push({"symbol": item.symbol, "name": item.name});
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
      <p class="companyName" id="tester">${stockItem.name}</p>
      <div class="stockInfo">
          <p class="stockTicker">${stockItem.symbol}</p>
          <p class="dollarChange">$${stockItem.delta.toFixed(2)}</p>
          <p class="percentChange">${stockItem.deltaPerc.toFixed(2)}%</p>
      </div>
  </div>`;
  location.insertAdjacentHTML("beforeend", html);
}

function makeStockRequestURL(tickers, index, iters) {
  let url = iexEndpt + iexMarket;
  for (let i = index; i < index + iters; i++) {
    url += `${tickers[i].symbol},`;
  }
  url += "&types=quote";
  return url;
}

function makeCurrentStockItems(stockData) {
  return stockData.reduce((total, item) => {
    if (item.price > 0) {
      total.push({"symbol": item.symbol, "price": item.price});
    }
    return total;
  }, [])
}

function objToArray(obj) {
  return Object.keys(obj).map(i => obj[i]);
}

function makeOpenStockItems(stockData) {
  return stockData.reduce((total, item) => {
    total.push({"symbol": item.quote.symbol, "name": item.quote.companyName, "price": item.quote.open});
    return total;
  }, [])
}

async function getOpenStockData(stockTickers, index, volume) {
  let tempRequest = await fetch(makeStockRequestURL(stockTickers, index, volume));
  tempRequest = await tempRequest.json();
  tempRequest = await makeOpenStockItems(objToArray(tempRequest));
  return tempRequest;
}

function sortBySymbol(itemA, itemB) {
  if (a.symbol < b.symbol) {
    return -1;
  } else if (a.symbol > b.symbol) {
    return 1;
  }
}

function isIn(stockItem, stockArray) {
  let isIn = -1;
  for (let i = 0; i < stockArray.length; i++) {
    if (stockItem.symbol === stockArray[i].symbol) {
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
      consolidated.push({
        "symbol": openItems[itemIndex].symbol,
        "name": openItems[itemIndex].name,
        "openPrice": openItems[itemIndex].price,
        "currentPrice": currentItems[i].price,
        "delta": currentItems[i].price - openItems[itemIndex].price,
        "deltaPerc": 100*(currentItems[i].price - openItems[itemIndex].price)/openItems[itemIndex].price
      })
    }
  }
  return consolidated;
}


async function getData() {
  let currentPrices = await fetch(iexMktLast);
  currentPrices = await currentPrices.json();

  let [prices] = await Promise.all([currentPrices]);
  currentStockItems = makeCurrentStockItems(prices);  

  const stockTickers = getTickers(currentStockItems);

  const fullIters = Math.floor(currentStockItems.length / iexMaxBatch);
  const remainderVol = currentStockItems.length % iexMaxBatch;

  let openStockItems = [];
  for (let i = 0; i < fullIters; i++) {
    openStockItems = openStockItems.concat(await getOpenStockData(stockTickers, i*iexMaxBatch, iexMaxBatch));
  }
  openStockItems = openStockItems.concat(await getOpenStockData(stockTickers, fullIters*iexMaxBatch, remainderVol));

  currentStockItems.sort((a, b) => {
    if (a.symbol < b.symbol) {
      return -1;
    } else if (a.symbol > b.symbol) {
      return 1;
    }
  });

  openStockItems.sort((a, b) => {
    if (a.symbol < b.symbol) {
      return -1;
    } else if (a.symbol > b.symbol) {
      return 1;
    }
  });

  let consolidatedItems = consolidateItems(currentStockItems, openStockItems);

  consolidatedItems = consolidatedItems.reduce((total, item) => {
    if (item.name === "") {
      item.name = "Company name unavailable";
    }
    if (item.openPrice !== null) {
      total.push(item);
    }
    return total;
  }, [])

  let stocksAsc = consolidatedItems.sort((a, b) => {
      if (a.deltaPerc < b.deltaPerc) {
        return -1;
      } else {
        return 1;
      }
    });

  let stocksDesc = stocksAsc.reverse();

  const topResults = stocksAsc.slice(0,15);
  const bottomResults = stocksAsc.reverse().slice(0,15);
  console.log(stocksAsc.slice(0,100));
  console.log(stocksAsc.reverse().slice(0,100));

  clearHighlights();

  topResults.forEach((item) => insertStockHTML(item, topPerfSection));
  bottomResults.forEach((item) => insertStockHTML(item, bottomPerfSection));
}
