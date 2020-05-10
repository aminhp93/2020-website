import config from './index';

const baseUrl = config.apiUrl;

export const StockUrls = {
    getListStocks: `${baseUrl}/api/Data/Markets/TradingStatistic/`,
};

export const LastUpdatedDateUrls = {
    getLastUpdatedDate: (id) => `${baseUrl}/api/config/${id ? `?key=${id}` : ''}`,
    updateLastUpdatedDate: (id) => `${baseUrl}/api/config/${id}/`,
}
