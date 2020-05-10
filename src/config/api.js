import config from './index';

const baseUrl = config.apiUrl;

export const StockUrls = {
    getListStocks: `${baseUrl}/api/Data/Markets/TradingStatistic/`,
    fetchNews: (type, group, startIndex, count) => {
        if (group) {
            return `${baseUrl}/api/Data/News/${type}?group=${group}&startIndex=${startIndex}&count=${count}`
        } else {
            return `${baseUrl}/api/Data/News/${type}?startIndex=${startIndex}&count=${count}`
        }
    },
};

export const LastUpdatedDateUrls = {
    getLastUpdatedDate: (id) => `${baseUrl}/api/config/${id ? `?key=${id}` : ''}`,
    updateLastUpdatedDate: (id) => `${baseUrl}/api/config/${id}/`,
}
