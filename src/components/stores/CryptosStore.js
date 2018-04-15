import React, { Component } from 'react'
import { observable, action, runInAction, computed } from 'mobx'

const coinMktEndpt = "https://api.coinmarketcap.com/v1/ticker/?limit=0";
const cryptoCompEndpt = "https://min-api.cryptocompare.com/data";

class CryptosStore {

    @observable cryptos = [];
    @observable symbols = [];
    @observable sortBy = 'deltaPerc1H';        // '
    @observable sortOrder = 'Desc'  // 'Desc', 'Asc'
    @observable cryptoLoading = true;

    @computed get sortedCryptos() {
        let sortedArr;
        if (this.sortOrder === "Desc"){
            sortedArr = this.cryptos.sort((a, b) => {
                return b[this.sortBy] - a[this.sortBy];
            })
        } else {
            sortedArr = this.cryptos.sort((a, b) => {
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

    @action
    async loadCryptos() {
        let data = await fetch(coinMktEndpt);
        data = await data.json();
    
        let [cryptoData] = await Promise.all([data]);
    
        let cryptoItems = cryptoData.reduce((total, item) => {
            if (item.market_cap_usd != null & item.available_supply != null & item["24h_volume_usd"] != null){
                total.push({
                symbol: item.symbol, 
                name: item.name, 
                price: item.price_usd,
                rank: item.rank,
                marketCap: item.market_cap_usd, 
                deltaPerc1H: item.percent_change_1h,
                deltaPerc1D: item.percent_change_24h,
                deltaPerc7D: item.percent_change_7d})
            }
            return total;
            }, [])
            
        cryptoItems = cryptoItems.sort((a, b) => {
        return b.deltaPerc1H - a.deltaPerc1H;
        })

        runInAction(() => {
            this.cryptos = cryptoItems;
            this.symbols = cryptoItems.reduce((total, item) => {
                total.push(item.symbol)
                return total
            }, [])
        })
    }
        
}

export default new CryptosStore();