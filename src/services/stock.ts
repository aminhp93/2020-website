import request from '../utils/request';
import { StockUrls } from '../config/api';
// import QueryString from 'utils/queryString';

const StockService = {
    getListStocks() {
        return request({
            method: 'GET',
            url: StockUrls.getListStocks,
        });
    },
    fetchNews(type, group, startIndex, count) {
        return request({
            method: 'GET',
            url: StockUrls.fetchNews(type, group, startIndex, count)
        })
    }

};

export default StockService;
