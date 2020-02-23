
const hostName1 = 'https://svr1.fireant.vn';
const hostName3 = 'https://svr3.fireant.vn';
const hostName = hostName1;

export function getCompanyInfoUrl() {
    return `${hostName}/api/Data/Companies/CompanyInfo?symbol=FPT`
}

export function getLastestFinancialInfoUrl() {
    return `${hostName}/api/Data/Finance/LastestFinancialInfo?symbol=FPT`
}

export function getSubCompaniesUrl() {
    return `${hostName}/api/Data/Companies/SubCompanies?symbol=FPT`
}

export function getCompanyOfficersUrl() {
    return `${hostName}/api/Data/Companies/CompanyOfficers?symbol=FPT`
}

export function getCompanyTransactionsUrl() {
    return `${hostName}/api/Data/Companies/CompanyTransactions?symbol=FPT`
}

export function getMajorHoldersUrl() {
    return `${hostName}/api/Data/Companies/MajorHolders?symbol=FPT`
}

export function getMajorHolderTransactionsUrl() {
    return `${hostName}/api/Data/Companies/MajorHolderTransactions?symbol=FPT&startIndex=0&count=1000`
}

export function getMajorHolderTransactionsRangeUrl() {
    return `${hostName}/api/Data/Companies/MajorHolderTransactionsRange?symbol=FPT&startDate=2019-10-21&endDate=2037-1-1`
}

export function getEquityAndDividendsUrl() {
    return `${hostName}/api/Data/Companies/EquityAndDividends?symbol=FPT&count=5`
}

export function getCompanyNewsCountUrl() {
    return `${hostName}/api/Data/News/CompanyNewsCount?symbol=FPT`
}

export function getCompanyNewsUrl(startIndex) {
    return `${hostName}/api/Data/News/CompanyNews?symbol=FPT&startIndex=${startIndex || 0}&count=10`
}

export function getNewsContentUrl(id) {
    return `${hostName}/api/Data/News/NewsContent?id=${id}`
}

export function getHistoricalQuotesUrl(startDate, endDate) {
    return `${hostName}/api/Data/Companies/HistoricalQuotes?symbol=FPT&startDate=${startDate || '2020-1-22'}&endDate=${endDate || '2020-2-22'}`
}

export function getYearlyFinancialInfoUrl() {
    return `${hostName}/api/Data/Finance/YearlyFinancialInfo?symbol=FPT&fromYear=2016&toYear=2019`
}

export function getQuarterlyFinancialInfoUrl() {
    return `${hostName}/api/Data/Finance/QuarterlyFinancialInfo?symbol=FPT&fromYear=2016&fromQuarter=1&toYear=2019&toQuarter=4`
}

export function getLastestFinancialReportsUrl() {
    return `${hostName}/api/Data/Finance/LastestFinancialReports?symbol=FPT&type=2&year=2020&quarter=0&count=5`
}

