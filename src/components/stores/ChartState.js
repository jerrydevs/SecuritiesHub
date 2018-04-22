import { observable, action, runInAction } from 'mobx'

import StocksStore from './StocksStore'
import CryptosStore from './CryptosStore'

const iexEndpt = "https://api.iextrading.com/1.0";
const cryptoCompEndpt = "https://min-api.cryptocompare.com/data";

class ChartState {

    @observable type = "None" // "None", "Stock", "Crypto", "Error"
    @observable period = '1D' 
    @observable interval = 'day'
    @observable chartData = []
    @observable search = ''

    @action
    handleTimeFrameChange = (period, interval) => {
        this.period = period;
        this.interval = interval;
    }

    @action
    handleSearchChange = (input) => {
        this.search = input
    }

    stockChartURL = (symbol, time) => {
        return `${iexEndpt}/stock/${symbol}/chart/${time}`;
    }

    @action
    async getStockChartData() {
        if (this.period === '1D') {
            let data = await fetch(`${iexEndpt}/stock/${this.search}/chart/1d`);
            data = await data.json();
            data = data.reduce((total, item) => {
                if (item.marketAverage !== 0 && item.marketAverage !== -1) {
                    const year = item.date.substring(0, 4);
                    const month = item.date.substring(4, 6);
                    const date = item.date.substring(6, 8);
                    const hour = item.minute.substring(0, 2);
                    const minute = item.minute.substring(3, 5);
                    total.push({
                        x: new Date(year, month-1, date, hour, minute),
                        y: item.marketAverage
                    });
                }
                return total;
            }, []);
            runInAction(() => {
                this.chartData = data
                this.type = "Stock"
            })
        } else {
            let data = await fetch(`${iexEndpt}/stock/${this.search}/chart/${this.period}`);
            data = await data.json();
            data = data.reduce((total, item) => {
                if (item.marketAverage !== 0 && item.marketAverage !== -1) {
                    total.push({
                        x: new Date(item.date),
                        y: item.close
                    })
                }
            return total;
            }, []);
            runInAction(() => {
                this.chartData = data
                this.type = "Stock"
            })
        }
    }

    @action
    async getCryptoChartData() {
        let cryptoData;
        if (this.period === "1D") {
            cryptoData = await fetch(`${cryptoCompEndpt}/histominute?fsym=${this.search}&tsym=USD&limit=1440&e=CCCAGG`);
        } else if (this.period === "1W") {
            cryptoData = await fetch(`${cryptoCompEndpt}/histohour?fsym=${this.search}&tsym=USD&limit=168&e=CCCAGG`);
        } else if (this.period === "1M") {
            cryptoData = await fetch(`${cryptoCompEndpt}/histohour?fsym=${this.search}&tsym=USD&limit=720&e=CCCAGG`);
        } else if (this.period === "3M") {
            cryptoData = await fetch(`${cryptoCompEndpt}/histohour?fsym=${this.search}&tsym=USD&limit=720&aggregate=3&e=CCCAGG`);
        } else if (this.period === "6M") {
            cryptoData = await fetch(`${cryptoCompEndpt}/histohour?fsym=${this.search}&tsym=USD&limit=720&aggregate=6&e=CCCAGG`);
        } else if (this.period === "1Y") {
            cryptoData = await fetch(`${cryptoCompEndpt}/histoday?fsym=${this.search}&tsym=USD&limit=365&e=CCCAGG`);
        } else if (this.period === "2Y") {
            cryptoData = await fetch(`${cryptoCompEndpt}/histoday?fsym=${this.search}&tsym=USD&limit=730&e=CCCAGG`);
        }
        cryptoData = await cryptoData.json();
        cryptoData = cryptoData.Data;
        cryptoData = cryptoData.reduce((total, item) => {
            total.push({
                x: new Date(0).setUTCSeconds(item.time),
                y: item.close
            });
            return total;
        }, []);
        runInAction(() => {
            this.chartData = cryptoData
            this.type = "Crypto"
        })
    }
    
    @action
    async executeSearch(input) {
        this.handleSearchChange(input)
        input = this.search
        const stockQuery = StocksStore.symbols.find((item) => item === input)
        if (stockQuery !== undefined) {
            this.getStockChartData();
        } else {
            const cryptoQuery = CryptosStore.symbols.find((item) => item === input)
            if (cryptoQuery !== undefined) {
                this.getCryptoChartData();
            } else {
                this.type = "None"
            }
        }
        
    }
}

export default new ChartState();


// if (input.substring(0,5) === "STOCK") {
//     let stockQuery = await fetch(stockChartURL(input.substring(6)));
//     if (stockQuery.status === 200) {
//         renderFoundStock(input.substring(6), stockDefaultTime);
//     } else {
//         renderErrorScreen();
//     }
// } else if (input.substring(0, 6) === "CRYPTO") {
//     let cryptoData = await cryptoSummary();
//     let queryItem = cryptoData.find((item) => {
//         return item.getSymbol() === input.substring(7) || item.getName() === input.substring(7);
//     })
//     if (queryItem !== undefined) {
//         renderFoundCrypto(input.substring(7), cryptoDefaultTime);
//     } else {
//         renderErrorScreen();
//     }
// } else {