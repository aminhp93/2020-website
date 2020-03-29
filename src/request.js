export const host_2020_webapp = 'http://3.88.254.14/'
export const host_2020_server = 'http://18.207.193.124'
export const localhost = 'http://localhost:8000'
export const hostName1 = 'https://svr1.fireant.vn';
export const hostName3 = 'https://svr3.fireant.vn';
const hostName = localhost;

export function getCompanyInfoUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyInfo${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getCompanyInfoUpdateUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyInfo/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getLastestFinancialInfoUrl(symbol) {
    return `${hostName}/api/Data/Finance/LastestFinancialInfo${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getLastestFinancialInfoUpdateUrl(symbol) {
    return `${hostName}/api/Data/Finance/LastestFinancialInfo/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getSubCompaniesUrl(symbol) {
    return `${hostName}/api/Data/Companies/SubCompanies${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getSubCompaniesUpdateUrl(symbol) {
    return `${hostName}/api/Data/Companies/SubCompanies/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getCompanyOfficersUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyOfficers${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getCompanyOfficersUpdateUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyOfficers/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getCompanyTransactionsUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyTransactions${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getCompanyTransactionsUpdateUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyTransactions/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getMajorHoldersUrl(symbol) {
    return `${hostName}/api/Data/Companies/MajorHolders${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getMajorHolderTransactionsUrl(symbol) {
    return `${hostName}/api/Data/Companies/MajorHolderTransactions${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&startIndex=0&count=1000`
}

export function getMajorHolderTransactionsRangeUrl(symbol) {
    return `${hostName}/api/Data/Companies/MajorHolderTransactionsRange${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&startDate=2019-10-21&endDate=2037-1-1`
}

export function getEquityAndDividendsUrl(symbol) {
    return `${hostName}/api/Data/Companies/EquityAndDividends${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&count=5`
}

export function getCompanyNewsCountUrl(symbol) {
    return `${hostName}/api/Data/News/CompanyNewsCount${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getCompanyNewsUrl(symbol, startIndex) {
    return `${hostName}/api/Data/News/CompanyNews${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&startIndex=${startIndex || 0}&count=10`
}

export function getNewsContentUrl(id) {
    return `${hostName}/api/Data/News/NewsContent${hostName === hostName1 ? '' : '/'}?id=${id}`
}

export function getHistoricalQuotesUrl(symbol, startDate, endDate) {
    return `${hostName}/api/Data/Companies/HistoricalQuotes${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}`
}

export function getHistoricalQuotesUpdateUrl(symbol, startDate, endDate) {
    return `${hostName}/api/Data/Companies/HistoricalQuotes/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&startDate=${startDate}&endDate=${endDate}`
}

export function getYearlyFinancialInfoUrl(symbol) {
    return `${hostName}/api/Data/Finance/YearlyFinancialInfo${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&fromYear=2016&toYear=2019`
}

export function getYearlyFinancialInfoUpdateUrl(symbol) {
    return `${hostName}/api/Data/Finance/YearlyFinancialInfo/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}`
}

export function getQuarterlyFinancialInfoUrl(symbol) {
    return `${hostName}/api/Data/Finance/QuarterlyFinancialInfo${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&fromYear=2016&fromQuarter=1&toYear=2019&toQuarter=4`
}

export function getQuarterlyFinancialInfoUpdateUrl(symbol) {
    return `${hostName}/api/Data/Finance/QuarterlyFinancialInfo/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&fromYear=2016&fromQuarter=1&toYear=2019&toQuarter=4`
}

export function getLastestFinancialReportsUrl(symbol, type = 1, year = 2020, quarter = 0, count = 5) {
    return `${hostName}/api/Data/Finance/LastestFinancialReports${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&type=${type}&year=${year}&quarter=${quarter}&count=${count}`
}

export function getLastestFinancialReportsNameUpdateUrl(symbol, type = 1, year = 2020, quarter = 0, count = 5) {
    return `${hostName}/api/Data/Finance/LastestFinancialReportsName/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&type=${type}&year=${year}&quarter=${quarter}&count=${count}`
}

export function getLastestFinancialReportsValueUpdateUrl(symbol, type = 1, year = 2020, quarter = 0, count = 5) {
    return `${hostName}/api/Data/Finance/LastestFinancialReportsValue/update${hostName === hostName1 ? '' : '/'}?symbol=${symbol}&type=${type}&year=${year}&quarter=${quarter}&count=${count}`
}

export function getDataHistoryUrl(symbol, resolution, fromDate, toDate) {
    return (
        "https://dchart-api.vndirect.com.vn/dchart/history?symbol=" +
        symbol +
        "&resolution=" +
        resolution +
        "&from=" +
        fromDate +
        "&to=" +
        toDate
    );
}

export function getAllLayoutsUrl() {
    return "https://chart-api.vndirect.com.vn/1.1/charts?client=vnds_trading_view&user=vnds-0001813109";
}

export function getSaveLayoutChartUrl(id) {
    return `https://chart-api.vndirect.com.vn/1.1/charts?client=vnds_trading_view&user=vnds-0001813109&chart=${id}`;
}

export function getConfigGetCreateUrl(id) {
    return `${hostName}/api/config/${id ? `?key=${id}` : ''}`
}

export function getConfigRetrieveUpdateDeleteUrl(id) {
    return `${hostName}/api/config/${id}/`
}