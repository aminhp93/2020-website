import React from 'react';
import moment from 'moment';
import ReactDOM from 'react-dom';
import {
    BarChartOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import { BILLION_UNIT } from './unit';

import {
    mapColorPriceChange,
    formatNumber,
    mapArrayToKeyValue,
    mapDataTwoDate,
    LATEST_FINANCIAL_REPORTS
} from './all';
import { IAnalysisType } from '../types'



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

export const HistoricalQuotesPastPriceColumns = [
    {
        title: 'NGÀY',
        render: params => {
            return moment(params.Date).format('YYYY-MM-DD')
        }
    },
    {
        title: 'THAY ĐỔI',
        align: 'right',
        render: params => {
            const content = ((params.PriceClose - params.PriceBasic) / 1000).toFixed(2)
            let className = '';
            if (content > 0) {
                className = 'green';
            } else if (content < 0) {
                className = 'red';
            }
            return <div className={className}>{content}</div>
        }
    },
    {
        title: '%',
        align: 'right',
        render: params => {
            const content = ((params.PriceClose - params.PriceOpen) * 100 / (params.PriceOpen)).toFixed(2)
            let className = '';
            if (content > 0) {
                className = 'green';
            } else if (content < 0) {
                className = 'red';
            }
            return <div className={className}>{content}</div>
        }
    },
    {
        title: 'MỞ CỬA',
        align: 'right',
        render: params => {
            return (params.PriceOpen / 1000).toFixed(2)
        }
    },
    {
        title: 'CAO NHẤT',
        align: 'right',
        render: params => {
            return (params.PriceHigh / 1000).toFixed(2)
        }
    },
    {
        title: 'THẤP NHẤT',
        align: 'right',
        render: params => {
            return (params.PriceLow / 1000).toFixed(2)
        }
    },
    {
        title: 'ĐÓNG CỬA',
        align: 'right',
        render: params => {
            return (params.PriceClose / 1000).toFixed(2)
        }
    },
    {
        title: 'TRUNG BÌNH',
        align: 'right',
        render: params => {
            return (params.PriceAverage / 1000).toFixed(2)
        }
    },
    {
        title: 'ĐÓNG CỬA ĐC',
        align: 'right',
        render: params => {
            return (params.AdjClose / 1000).toFixed(2)
        }
    },
    {
        title: 'KHỐI LƯỢNG',
        align: 'right',
        render: params => {
            return formatNumber(params.Volume)
        }
    }
]

export const HistoricalQuotesForeignTradeColumns = [
    {
        title: 'NGÀY',
        render: params => {
            return moment(params.Date).format('YYYY-MM-DD')
        }
    },
    {
        title: 'ROOM NN',
        align: 'right',
        render: params => {
            return formatNumber(params.CurrentForeignRoom)
        }
    },
    {
        title: 'KL MUA',
        align: 'right',
        render: params => {
            return formatNumber(params.BuyForeignQuantity)
        }
    },
    {
        title: 'KL BÁN',
        align: 'right',
        render: params => {
            return formatNumber(params.SellForeignQuantity)
        }
    },
    {
        title: 'MUA-BÁN',
        align: 'right',
        render: params => {
            return formatNumber(params.BuyForeignQuantity - params.SellForeignQuantity)
        }
    },
    {
        title: 'GT MUA',
        align: 'right',
        render: params => {
            return formatNumber(params.BuyForeignValue)
        }
    },
    {
        title: 'GT BÁN',
        align: 'right',
        render: params => {
            return formatNumber(params.SellForeignValue)
        }
    },
    {
        title: 'MUA-BÁN',
        align: 'right',
        render: params => {
            return formatNumber(params.BuyForeignValue - params.SellForeignValue)
        }
    }
]

export const HistoricalQuotesSupplyDemandColumns = [
    {
        title: 'NGÀY',
        render: params => {
            return moment(params.Date).format('YYYY-MM-DD')
        }
    },
    {
        title: 'SL ĐẶT MUA',
        align: 'right',
        render: params => {
            return formatNumber(params.BuyCount)
        }
    },
    {
        title: 'KL ĐẶT MUA',
        align: 'right',
        render: params => {
            return formatNumber(params.BuyQuantity)
        }
    },
    {
        title: 'SL ĐẶT BÁN',
        align: 'right',
        render: params => {
            return formatNumber(params.SellCount)
        }
    },
    {
        title: 'KL ĐẶT BÁN',
        align: 'right',
        render: params => {
            return formatNumber(params.SellQuantity)
        }
    },
    {
        title: 'KL KHỚP',
        align: 'right',
        render: params => {
            return formatNumber(params.Volume)
        }
    },
    {
        title: 'GT KHỚP (1000 VND)',
        align: 'right',
        render: params => {
            return formatNumber(params.TotalValue)
        }
    }
]

export const getLastestFinancialReportsColumnDefs = (period, type, analysisType = null) => {
    let yearArray = [2015, 2016, 2017, 2018, 2019]
    let quarterArray = [
        {
            Year: 2018,
            Quarter: 4
        },
        {
            Year: 2019,
            Quarter: 1
        },
        {
            Year: 2019,
            Quarter: 2
        },
        {
            Year: 2019,
            Quarter: 3
        },
        {
            Year: 2019,
            Quarter: 4
        },
        {
            Year: 2020,
            Quarter: 1
        }
    ]
    let year = []
    let quarter = []
    let rowGroup = [
        {
            field: 'ParentID1',
            rowGroup: true,
            hide: true
        },
        {
            field: 'ParentID2',
            rowGroup: true,
            hide: true
        },
        {
            field: 'ParentID3',
            rowGroup: true,
            hide: true
        },
        {
            field: 'ParentID4',
            rowGroup: true,
            hide: true
        },
        {
            field: 'ParentID5',
            rowGroup: true,
            hide: true
        },
    ]
    if (type === LATEST_FINANCIAL_REPORTS.TYPE_1) {
        year = year.concat(rowGroup)
    }
    year.push({
        field: 'Name'
    })
    yearArray.map(yearItem => {
        year.push({
            headerName: yearItem,
            cellRenderer: (params) => {
                if (params.data && params.data.Values && params.data.Values.length) {
                    const data = params.data.Values.filter(item => item.Year === yearItem)
                    return formatNumber(data.length && (data[0].Value / BILLION_UNIT).toFixed(0))
                }
            }
        })
    })
    if (type === LATEST_FINANCIAL_REPORTS.TYPE_1) {


        if (analysisType === 'tyTrong') {
            let tyTrongArray = ['%2015', '%2016', '%2017', '%2018', '%2019']
            tyTrongArray.map((yearItem, index) => {
                year.push({
                    headerName: yearItem,
                    cellRenderer: (params) => {
                        if (params.data && params.data.Values && params.data.Values.length) {
                            const data = params.data.Values.filter(item => item.Year === yearItem)
                            const div = document.createElement("div");
                            if (data.length && (data[0].Value * 100).toFixed(1) > 10) {
                                div.className = 'red'
                            }
                            div.innerText = data.length && (data[0].Value * 100).toFixed(1)
                            return div
                        }
                    }
                })
            })
        } else if (analysisType === 'chieuNgang') {
            let chieuNgangArray = ['2016-2015', '2017-2016', '2018-2017', '2019-2018']
            chieuNgangArray.map((yearItem, index) => {
                year.push({
                    headerName: yearItem,
                    cellRenderer: (params) => {
                        if (params.data && params.data.Values && params.data.Values.length) {
                            const data = params.data.Values.filter(item => item.Year === yearItem)
                            const div = document.createElement("div");
                            if (data.length && (data[0].Value * 100).toFixed(1) > 0) {
                                div.className = 'green'
                            } else {
                                div.className = 'red'
                            }
                            div.innerText = data.length && (data[0].Value * 100).toFixed(1)
                            return div
                        }
                    }
                })
            })
        }
    }


    if (type === LATEST_FINANCIAL_REPORTS.TYPE_2) {
        if (analysisType === 'tyTrong') {
            let tyTrongArray = ['%2015', '%2016', '%2017', '%2018', '%2019']
            tyTrongArray.map((yearItem, index) => {
                year.push({
                    headerName: yearItem,
                    cellRenderer: (params) => {
                        if (params.data && params.data.Values && params.data.Values.length) {
                            const data = params.data.Values.filter(item => item.Year === yearItem)
                            if (!data.length) return ''
                            const div = document.createElement("div");
                            if (data.length && (data[0].Value * 100).toFixed(1) > 10) {
                                div.className = 'red'
                            }
                            div.innerText = data.length && (data[0].Value * 100).toFixed(1)
                            return div
                        }
                    }
                })
            })
        } else if (analysisType === 'chieuNgang') {
            let chieuNgangArray = ['2016-2015', '2017-2016', '2018-2017', '2019-2018']
            chieuNgangArray.map((yearItem, index) => {
                year.push({
                    headerName: yearItem,
                    cellRenderer: (params) => {
                        if (params.data && params.data.Values && params.data.Values.length) {
                            const data = params.data.Values.filter(item => item.Year === yearItem)
                            const div = document.createElement("div");
                            if (data.length && (data[0].Value * 100).toFixed(1) > 0) {
                                div.className = 'green'
                            } else {
                                div.className = 'red'
                            }
                            div.innerText = data.length && (data[0].Value * 100).toFixed(1)
                            return div
                        }
                    }
                })
            })
        }
    }


    quarterArray.push({
        field: 'Name'
    })
    quarterArray.map(quarterItem => (
        quarter.push({
            headerName: `${quarterItem.Year} ${quarterItem.Quarter}`,
            cellRenderer: (params) => {
                if (params.data && params.data.Values && params.data.Values.length) {
                    const data = params.data.Values.filter(item => item.Year === quarterItem.Year && item.Quarter === quarterItem.Quarter)
                    return data.length && (data[0].Value / BILLION_UNIT).toFixed(0)
                }
            }
        })
    ))

    return period === 'yearly' ? year : quarter
}

export const analysis5ColumnDefs = (that) => {
    return [
        {
            headerName: 'Stock',
            align: 'left',
            field: 'Symbol',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = params.data.Symbol
                return div
            }
        },
        {
            headerName: 'Actions',
            align: 'left',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.className = 'flex space-between'
                ReactDOM.render(
                    <>
                        <div className="flex">
                            <div onClick={() => { that.setState({ visibleChart: true, symbol: params.data.Symbol }) }}><BarChartOutlined style={{ fontSize: '16px' }} /></div>
                            <div onClick={() => { that.setState({ visibleInfo: true }) }}><InfoCircleOutlined style={{ fontSize: '16px' }} /></div>
                        </div>

                    </>,
                    div
                );
                return div
            }
        },
        {
            field: 'ICBCode',
            headerName: 'ICBCode',
            filter: 'agNumberColumnFilter',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = params.data.ICBCode
                return div
            }
        },
        {
            field: 'PriceClose',
            headerName: 'Price',
            filter: 'agNumberColumnFilter',
            align: 'right',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber(params.data.PriceClose)
                return div
            }
        },
        {
            field: 'DealVolume',
            align: 'right',
            headerName: 'DealVolume',
            filter: 'agNumberColumnFilter',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber(params.data.DealVolume)
                return div
            }
        },
        {
            field: 'TodayCapital',
            align: 'right',
            headerName: 'TodayCapital',
            filter: 'agNumberColumnFilter',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber(params.data.TodayCapital)
                return div
            }
        },
        {
            field: 'LastPrice',
            align: 'right',
            headerName: 'LastPrice',
            filter: 'agNumberColumnFilter',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = formatNumber(params.data.LastPrice)
                return div
            }
        },
        {
            field: 'PriceChange',
            headerName: '%',
            align: 'right',
            filter: 'agNumberColumnFilter',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = Number(params.data.PriceChange).toFixed(2)
                div.className = mapColorPriceChange(params.data.PriceChange)
                return div
            }
        },
        {
            field: 'LowestPoint',
            headerName: 'LowestPoint',
            align: 'right',
            filter: 'agNumberColumnFilter',
            cellRenderer: params => {
                const div = document.createElement("div");
                div.innerText = params.data.LowestPoint
                return div
            }
        },
        // {
        //     field: 'VolumeChange',
        //     align: 'right',
        //     headerName: '%Volume',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.VolumeChange)
        //         return div
        //     }
        // },
        // {
        //     align: 'right',
        //     headerName: 'ROE',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.ROE)
        //         return div
        //     }
        // },
        // {
        //     align: 'right',
        //     headerName: 'EPS',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.EPS)
        //         return div
        //     }
        // },
        // {
        //     align: 'right',
        //     headerName: 'TT EPS cung ky',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.EPS)
        //         return div
        //     }
        // },
        // {
        //     align: 'right',
        //     headerName: 'TT LNST nam',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.EPS)
        //         return div
        //     }
        // },
        // {
        //     align: 'right',
        //     headerName: 'Point',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.EPS)
        //         return div
        //     }
        // },
        // {
        //     align: 'right',
        //     headerName: 'Power',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.EPS)
        //         return div
        //     }
        // },
        // {
        //     field: 'BuyForeignQuantity',
        //     align: 'right',
        //     headerName: 'BuyForeignQuantity',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.BuyForeignQuantity)
        //         return div
        //     }
        // },
        // {
        //     field: 'SellForeignQuantity',
        //     align: 'right',
        //     headerName: 'SellForeignQuantity',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.SellForeignQuantity)
        //         return div
        //     }
        // },
        // {
        //     field: 'MarketCap',
        //     align: 'right',
        //     headerName: 'MarketCap',
        //     filter: 'agNumberColumnFilter',
        //     cellRenderer: params => {
        //         const div = document.createElement("div");
        //         div.innerText = formatNumber(params.data.MarketCap)
        //         return div
        //     }
        // },

    ]
}