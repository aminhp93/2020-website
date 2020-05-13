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
    },
    getYearlyFinancialInfo(symbol) {
        return request({
            method: 'GET',
            url: StockUrls.getYearlyFinancialInfo(symbol)
        })
    },
    getQuarterlyFinancialInfo(symbol) {
        return request({
            method: 'GET',
            url: StockUrls.getQuarterlyFinancialInfo(symbol)
        })
    },
    getLastestFinancialInfo(symbol) {
        return request({
            method: 'GET',
            url: StockUrls.getLastestFinancialInfo(symbol)
        })
    },
    getLastestFinancialReports(selectedSymbol, financialType, year, quarter) {
        return request({
            method: 'GET',
            url: StockUrls.getLastestFinancialReports(selectedSymbol, financialType, year, quarter)
        })
    }

};

export default StockService;
