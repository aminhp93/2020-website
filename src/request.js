export const host_2020_webapp = 'http://3.88.254.14/'
export const host_2020_server = 'http://18.207.193.124'

const hostName1 = 'https://svr1.fireant.vn';
export const hostName3 = 'https://svr3.fireant.vn';
const hostName = hostName1;

export function getCompanyInfoUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyInfo?symbol=${symbol}`
}

export function getLastestFinancialInfoUrl(symbol) {
    return `${hostName}/api/Data/Finance/LastestFinancialInfo?symbol=${symbol}`
}

export function getSubCompaniesUrl(symbol) {
    return `${hostName}/api/Data/Companies/SubCompanies?symbol=${symbol}`
}

export function getCompanyOfficersUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyOfficers?symbol=${symbol}`
}

export function getCompanyTransactionsUrl(symbol) {
    return `${hostName}/api/Data/Companies/CompanyTransactions?symbol=${symbol}`
}

export function getMajorHoldersUrl(symbol) {
    return `${hostName}/api/Data/Companies/MajorHolders?symbol=${symbol}`
}

export function getMajorHolderTransactionsUrl(symbol) {
    return `${hostName}/api/Data/Companies/MajorHolderTransactions?symbol=${symbol}&startIndex=0&count=1000`
}

export function getMajorHolderTransactionsRangeUrl(symbol) {
    return `${hostName}/api/Data/Companies/MajorHolderTransactionsRange?symbol=${symbol}&startDate=2019-10-21&endDate=2037-1-1`
}

export function getEquityAndDividendsUrl(symbol) {
    return `${hostName}/api/Data/Companies/EquityAndDividends?symbol=${symbol}&count=5`
}

export function getCompanyNewsCountUrl(symbol) {
    return `${hostName}/api/Data/News/CompanyNewsCount?symbol=${symbol}`
}

export function getCompanyNewsUrl(symbol, startIndex) {
    return `${hostName}/api/Data/News/CompanyNews?symbol=${symbol}&startIndex=${startIndex || 0}&count=10`
}

export function getNewsContentUrl(id) {
    return `${hostName}/api/Data/News/NewsContent?id=${id}`
}

export function getHistoricalQuotesUrl(symbol, startDate, endDate) {
    return `${hostName}/api/Data/Companies/HistoricalQuotes?symbol=${symbol}&startDate=${startDate || '2020-1-22'}&endDate=${endDate || '2020-2-22'}`
}

export function getYearlyFinancialInfoUrl(symbol) {
    return `${hostName}/api/Data/Finance/YearlyFinancialInfo?symbol=${symbol}&fromYear=2016&toYear=2019`
}

export function getQuarterlyFinancialInfoUrl(symbol) {
    return `${hostName}/api/Data/Finance/QuarterlyFinancialInfo?symbol=${symbol}&fromYear=2016&fromQuarter=1&toYear=2019&toQuarter=4`
}

export function getLastestFinancialReportsUrl(symbol) {
    return `${hostName}/api/Data/Finance/LastestFinancialReports?symbol=${symbol}&type=2&year=2020&quarter=0&count=5`
}

