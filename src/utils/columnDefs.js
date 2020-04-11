import { BILLION_UNIT } from './unit';
import {
    mapColorPriceChange,
    formatNumber,
    mapArrayToKeyValue,
    mapDataTwoDate
} from './all';

export function getYearlyFinancialInfoColumnDefs() {
    return [
        {
            headerName: 'Stock',
            field: 'Stock',
            align: 'left',
        },
        {
            headerName: 'Year',
            field: 'Year',
        },
        {
            headerName: 'Sales',
            field: 'Sales',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber((params.data.Sales / BILLION_UNIT).toFixed(1))
                return div
            }
        },
        {
            headerName: 'ProfitFromFinancialActivities',
            field: 'ProfitFromFinancialActivities',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber((params.data.ProfitFromFinancialActivities / BILLION_UNIT).toFixed(1))
                return div
            }
        },
        {
            headerName: 'ProfitBeforeTax',
            field: 'ProfitBeforeTax',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber((params.data.ProfitBeforeTax / BILLION_UNIT).toFixed(1))
                return div
            }
        },
        {
            headerName: 'Cash',
            field: 'Cash',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber((params.data.Cash / BILLION_UNIT).toFixed(1))
                return div
            }
        },
        {
            headerName: 'TotalAssets',
            field: 'TotalAssets',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber((params.data.TotalAssets / BILLION_UNIT).toFixed(1))
                return div
            }
        },
        {
            headerName: 'Equity',
            field: 'Equity',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber((params.data.Equity / BILLION_UNIT).toFixed(1))
                return div
            }
        },
        {
            headerName: 'BookValuePerShare',
            field: 'BookValuePerShare',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber((params.data.BookValuePerShare).toFixed(1))
                return div
            }
        },
        {
            headerName: 'Liabilities',
            field: 'Liabilities',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber((params.data.Liabilities / BILLION_UNIT).toFixed(1))
                return div
            }
        },
    ]
}

export function getQuarterlyFinancialInfoColumnDefs() {
    const list = [
        'Year',
        'Quarter',
        // 'BasicEPS_TTM',
        'DilutedEPS_TTM',
        // 'SalesGrowth_MRQ',
        // 'SalesGrowth_TTM',
        // 'ProfitGrowth_MRQ',
        // 'ProfitGrowth_TTM',
        // 'BasicEPSGrowth_MRQ',
        // 'BasicEPSGrowth_TTM',
        // 'DilutedEPSGrowth_MRQ',
        // 'DilutedEPSGrowth_TTM',
        // 'QuickRatio_MRQ',
        // 'CurrentRatio_MRQ',
        // 'LTDebtToEquity_MRQ',
        // 'TotalDebtToEquity_MRQ',
        // 'TotalDebtToTotalAssets_MRQ',
        // 'GrossMargin_TTM',
        // 'EBITMargin_TTM',
        // 'OperatingMargin_TTM',
        // 'PreTaxMargin_TTM',
        // 'NetProfitMargin_TTM',
        // 'ROA_TTM',
        // 'ROE_TTM',
        // 'ROIC_TTM',
        // 'InventoryTurnover_TTM',
        // 'ReceivablesTurnover_TTM',
        // 'CurrentAssetsTurnover_TTM',
        // 'AssetsTurnover_TTM',
        // 'DividendGrowth_MRQ',
        // 'DividendGrowth_TTM',
        // 'TotalAssetsGrowth_MRQ',
        // 'TotalAssetsGrowth_TTM',
        // 'BookValuePerShare_MRQ',
        // 'SalesPerShare_TTM',
        // 'BasicEPS_MRQ',
        // 'DilutedEPS_MRQ',
        'NetSales_MRQ',
        // 'Dividend_MRQ',
        'TotalAssets_MRQ',
        // 'CurrentAssets_MRQ',
        // 'Inventories_MRQ',
        'ProfitAfterTax_MRQ',
        'SharesOutstanding_MRQ',
        // 'Cash_MRQ',
        // 'NetLiquidAssets_MRQ',
        // 'CurrentLiabilities_MRQ',
        // 'LongTermLiabilities_MRQ',
        // 'Liabilities_MRQ',
        'Equity_MRQ',
        'ProfitBeforeTax_MRQ',
        'FixedAssets_MRQ',
        // 'LiquidAssets_MRQ',
        'IntangibleAssets_MRQ',
    ]
    let result = [
        {
            headerName: 'Stock',
            field: 'Stock',
            align: 'left',
        },
    ];
    for (let i = 0; i < list.length; i++) {
        let item = list[i]
        result.push({
            headerName: item,
            field: item,
            align: 'right',
            cellRenderer: params => {
                if (!params.data[item]) return ''
                const div = document.createElement("div");
                const unit = params.data[item] > 10000 ? BILLION_UNIT : 1
                div.innerText = formatNumber((params.data[item] / unit).toFixed(1))
                return div
            }
        })
    }
    return result
}