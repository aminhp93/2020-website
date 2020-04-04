import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button } from 'antd';

import moment from 'moment';
import {
    mapColorPriceChange,
    formatNumber,
    mapArrayToKeyValue,
    mapDataTwoDate
} from '../../utils/all';
import {
    getConfigGetCreateUrl,
    getStockFilter,
    getCompanyInfoUrl
} from '../../request';

import {
    // setSymbol,
} from '../../actions/stock';
import axios from 'axios';

import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

const { RangePicker } = DatePicker;

class Analysis2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: AllCommunityModules,
            columnDefs: [
                {
                    headerName: 'Stock',
                    field: 'Stock',
                    align: 'left',
                },
                {
                    field: 'PriceClose',
                    headerName: 'PriceClose',
                    filter: 'agNumberColumnFilter',
                    align: 'right',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.PriceClose)
                        return div
                    }
                },
                {
                    field: 'PriceChange',
                    headerName: 'PriceChange',
                    align: 'right',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = params.data.PriceChange
                        div.className = mapColorPriceChange(params.data.PriceChange)
                        return div
                    }
                },
                {
                    field: 'Volume',
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
                    field: 'VolumeChange',
                    align: 'right',
                    headerName: 'VolumeChange',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.VolumeChange)
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
                    field: 'BuyForeignQuantity',
                    align: 'right',
                    headerName: 'BuyForeignQuantity',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.BuyForeignQuantity)
                        return div
                    }
                },
                {
                    field: 'SellForeignQuantity',
                    align: 'right',
                    headerName: 'SellForeignQuantity',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.SellForeignQuantity)
                        return div
                    }
                },
                {
                    field: 'MarketCap',
                    align: 'right',
                    headerName: 'MarketCap',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.MarketCap)
                        return div
                    }
                },

            ],
            defaultColDef: {
                flex: 1,
                filter: true,
                sortable: true,
            },
            rowData: [],
            startDate: '',
            endDate: '',
        }
    }

    componentDidMount() {
        this.crawData();
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Analysis2', this.props, preProps)
        if (this.props.Symbol !== preProps.Symbol) {
            this.crawData();
        }
    }

    crawData = async (startDate, endDate) => {
        const { AllStocks, Symbol: symbol } = this.props;
        let data1 = [];
        let data2 = []
        let lastUpdatedDate = '';
        let CompanyInfoObj = {}
        await axios({
            url: getCompanyInfoUrl(symbol),
            method: 'get',
        })
            .then(response => {
                CompanyInfoObj = response.data
            })
            .catch(error => {
                console.log(error)
            })
        await axios({
            url: getConfigGetCreateUrl('LAST_UPDATED_HISTORICAL_QUOTES'),
            method: 'get'
        })
            .then(response => {
                lastUpdatedDate = response.data.value
            })
            .catch(error => {
                console.log(error)
            })
        if (!lastUpdatedDate || !CompanyInfoObj.ICBCode) return

        await axios({
            url: getStockFilter(),
            method: 'post',
            data: {
                Date: endDate ? endDate : lastUpdatedDate,
                ICBCode: CompanyInfoObj.ICBCode,
            }
        })
            .then(response => {
                data1 = response.data
            })
            .catch(error => {
                console.log(error)
            })

        await axios({
            url: getStockFilter(),
            method: 'post',
            data: {
                Date: startDate ? startDate : moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z',
                ICBCode: CompanyInfoObj.ICBCode,
            }
        })
            .then(response => {
                data2 = response.data
            })
            .catch(error => {
                console.log(error)
            })

        let mappedData = mapDataTwoDate(data1, data2, mapArrayToKeyValue(AllStocks));
        if (!mappedData.length) return;

        const rowData = mappedData.sort((a, b) => b.MarketCap - a.MarketCap).slice(0, 10);
        const dataChart = [];
        for (let i = 0; i < rowData.length; i++) {
            let item = {
                stock: rowData[i].Stock,
                current: rowData[i].PriceClose
            }
            item[startDate] = rowData[i].YesterdayPriceClose
            dataChart.push(item)
        }
        console.log(dataChart, rowData)

        if (startDate) {
            this.setState({
                rowData,
                dataChart
            })
        } else {
            this.setState({
                rowData,
                startDate: moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z',
                endDate: lastUpdatedDate,
                dataChart
            })
        }
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    onChange = (date, dateString) => {
        if (dateString && dateString.length === 2) {
            this.setState({
                startDate: dateString[0] + 'T00:00:00Z',
                endDate: dateString[1] + 'T00:00:00Z'
            })
        }
    }

    render() {
        const { startDate, endDate } = this.state;
        return (
            <div>
                <div>
                    <h1>
                        Bieu do so sanh bien dong cua 7 nganh chinh: tu 1/1/2020 den hien tai
                    </h1>
                </div>
                <RangePicker onChange={this.onChange} value={startDate ? [moment(startDate), moment(endDate)] : []} />
                <Button onClick={() => this.crawData(startDate, endDate)}>Xem</Button>
                <div style={{ width: '100%', height: '100%' }}>
                    <div
                        id="myGrid"
                        style={{
                            height: '500px',
                        }}
                        className="ag-theme-alpine"
                    >
                        <AgGridReact
                            modules={this.state.modules}
                            columnDefs={this.state.columnDefs}
                            defaultColDef={this.state.defaultColDef}
                            onGridReady={this.onGridReady}
                            rowData={this.state.rowData}
                            onFirstDataRendered={params => params.api.sizeColumnsToFit()}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        Symbol: state.stock.Symbol,
        AllStocks: state.stock.AllStocks,
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis2);