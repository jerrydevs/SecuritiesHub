import React, { Component } from 'react'
import { observable, action, runInAction, computed } from 'mobx'

const iexEndpt = "https://api.iextrading.com/1.0";
const iexMarket = "/stock/market/batch?symbols="
const iexMktLast = "https://api.iextrading.com/1.0/tops/last";
const iexMaxBatch = 100;

class StocksStore {

    @observable stocks = [];
    @observable symbols = [];
    @observable stocksLoading = true;
    @observable sortBy = "deltaPerc";
    @observable sortOrder = "Desc";
    
    @computed get sortedStocks() {
        let sortedArr;
        if (this.sortOrder === "Desc"){
            sortedArr = this.stocks.sort((a, b) => {
                return b[this.sortBy] - a[this.sortBy];
            })
        } else {
            sortedArr = this.stocks.sort((a, b) => {
                return a[this.sortBy] - b[this.sortBy];
            })
        }
        return sortedArr;
    }

    @action
    handleSortByChange = (value) => {
        this.sortBy = value;
    }

    @action
    handleSortOrderDesc = () => {
        this.sortOrder = "Desc"
    }

    @action
    handleSortOrderAsc = () => {
        this.sortOrder = "Asc"
    }

    makeStockRequestURL(symbols, index, iters) {
        let url = iexEndpt + iexMarket;
        for (let i = index; i < index + iters; i++) {
          url += `${symbols[i].symbol},`;
        }
        url += "&types=quote";
        return url;
    }

    async getOpenStockData(stockSymbols, index, volume) {
        let stockData = await fetch(this.makeStockRequestURL(stockSymbols, index, volume));
        stockData = await stockData.json();
        stockData = await this.objToArray(stockData).reduce((total, item) => {
            total.push({
                symbol: item.quote.symbol,
                name: item.quote.companyName,
                current: -1,
                open: item.quote.open,
                delta: -1,
                volume: item.quote.latestVolume
            })
            return total;
        }, [])
        return stockData;
    }

    objToArray(obj) {
        return Object.keys(obj).map(i => obj[i]);
    }

    isIn(stockItem, stockArray) {
        let isIn = -1;
        for (let i = 0; i < stockArray.length; i++) {
            if (stockItem.symbol === stockArray[i].symbol) {
            isIn = i;
            break;
            }
        }
        return isIn;
    }
    
    consolidateItems(currentItems, openItems) {
        let consolidated = [];
        for (let i = 0; i < currentItems.length; i++) {
          const itemIndex = this.isIn(currentItems[i], openItems);
      
          if (itemIndex !== -1) {
            consolidated.push({
                symbol: openItems[itemIndex].symbol,
                name: openItems[itemIndex].name,
                current: currentItems[i].current,
                open: openItems[itemIndex].open,
                delta: currentItems[i].current - openItems[itemIndex].open,
                deltaPerc: 100*(currentItems[i].current - openItems[itemIndex].open)/openItems[itemIndex].open,
                volume: openItems[itemIndex].volume
            })
          }
        }
        return consolidated;
    }

    @action
    async loadStocks() {

        let currentPrices = await fetch(iexMktLast);
        currentPrices = await currentPrices.json();
    
        let [prices] = await Promise.all([currentPrices]);
       
        currentPrices = prices.reduce((total, item) => {
            if (item.price > 0) {
                total.push({
                    symbol: item.symbol,
                    current: item.price
                })
            }
            return total;
        }, []);
    
        const fullIters = Math.floor(currentPrices.length / iexMaxBatch);
        const remainderVol = currentPrices.length % iexMaxBatch;
    
        let openStockItems = [];
        let tempArr = [];
        for (let i = 0; i < fullIters; i++) {
        tempArr[i] = this.getOpenStockData(currentPrices, i*iexMaxBatch, iexMaxBatch);
        }
        for (let i = 0; i < fullIters; i++) {
        openStockItems = openStockItems.concat(await tempArr[i]);
        }
        if (remainderVol > 0) {
            openStockItems = openStockItems.concat(await this.getOpenStockData(currentPrices, fullIters*iexMaxBatch, remainderVol));
        }
    
        let consolidatedItems = this.consolidateItems(currentPrices, openStockItems);
    
        consolidatedItems = consolidatedItems.reduce((total, item) => {
        if (item.name === "") {
            item.name = "Company name unavailable";
        }
        if (item.open !== null & item.symbol !== "ZXIET" &  item.symbol !== "ZIEXT" & item.symbol !== "ZEXIT"){
            total.push(item);
        }
        return total;
        }, [])
    
        consolidatedItems = consolidatedItems.sort((a, b) => {
            return b.deltaPerc - a.deltaPerc;
        });
        
        runInAction(() => {
            this.stocks = consolidatedItems
            this.symbols = consolidatedItems.reduce((total, item) => {
                total.push(item.symbol)
                return total
            }, [])
        })
    }
}

export default new StocksStore();