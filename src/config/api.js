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
    getYearlyFinancialInfo: (symbol) => `${baseUrl}/api/Data/Finance/YearlyFinancialInfo/?symbol=${symbol}&fromYear=2016&toYear=2019`,
    getQuarterlyFinancialInfo: (symbol) => `${baseUrl}/api/Data/Finance/QuarterlyFinancialInfo/?symbol=${symbol}&fromYear=2016&fromQuarter=1&toYear=2019&toQuarter=4`,
    getLastestFinancialInfo: (symbol) => `${baseUrl}/api/Data/Finance/LastestFinancialInfo/?symbol=${symbol}`,
    getLastestFinancialReports: (symbol, type = 1, year = 2020, quarter = 0, count = 5) => `${baseUrl}/api/Data/Finance/LastestFinancialReports/?symbol=${symbol}&type=${type}&year=${year}&quarter=${quarter}&count=${count}`,
    getHistoricalQuotes: (symbol, startDate, endDate) => `${baseUrl}/api/Data/Companies/HistoricalQuotes/?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}`
};

export const LastUpdatedDateUrls = {
    getLastUpdatedDate: (id) => `${baseUrl}/api/config/${id ? `?key=${id}` : ''}`,
    updateLastUpdatedDate: (id) => `${baseUrl}/api/config/${id}/`,
}
