import { observable, action, runInAction } from 'mobx'

const newsAPIEndpt = "https://newsapi.org/v2/top-headlines";
const newsAPIKey = "6e6ef18dfb95410c88e539cdabdb301d";

class NewsStore {

    @observable news = [];
    @observable newsLoading = true;
     
    @action
    async loadNews() {
        const response = await fetch(`${newsAPIEndpt}?sources=bloomberg&apiKey=${newsAPIKey}`);
        const json = await response.json();
        runInAction(() => {
            this.news = json.articles.reduce((total, item) => {
                total.push({
                    author: item.author,
                    description: item.description,
                    publishedAt: item.publishedAt,
                    sourceName: item.source.name,
                    title: item.title,
                    url: item.url,
                    img: item.urlToImage});
                return total;
                }, [])
        })
    }
}

export default new NewsStore();
