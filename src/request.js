
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

// export function getCompanyInfoUrl() {
//     return `${hostName}/api/Data/Companies/CompanyInfo?symbol=FPT`
// }

// export function getCompanyInfoUrl() {
//     return `${hostName}/api/Data/Companies/CompanyInfo?symbol=FPT`
// }

// export function getCompanyInfoUrl() {
//     return `${hostName}/api/Data/Companies/CompanyInfo?symbol=FPT`
// }

// export function getCompanyInfoUrl() {
//     return `${hostName}/api/Data/Companies/CompanyInfo?symbol=FPT`
// }

// export function getCompanyInfoUrl() {
//     return `${hostName}/api/Data/Companies/CompanyInfo?symbol=FPT`
// }