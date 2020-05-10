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

};

export default StockService;
