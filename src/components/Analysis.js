import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Tabs, Table, Button, List } from 'antd';

import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import moment from 'moment';
import { mapColorPriceChange, formatNumber } from '../../utils/all';
import {
    getAnalysisUrl,
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


class Analysis extends React.Component {
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
                    align: 'right',
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
                    headerName: 'Volume',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.Volume)
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
            dataChart: [],
            startDate: moment().add(-60, 'days').format('YYYY-MM-DD'),
            endDate: moment().format('YYYY-MM-DD'),
        }
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Analysis', this.props, preProps)
        if (this.props.Symbol !== preProps.Symbol) {
            this.crawData2();
        }
    }

    componentDidMount() {
        this.crawData();
        // this.crawData2();
    }

    crawData2 = async () => {
        const { startDate, endDate } = this.state;
        let allStocks = this.mapArrayToKeyValue(this.props.AllStocks)
        let data1 = [];
        let data2 = []
        let lastUpdatedDate = '';
        let CompanyInfoObj = {}
        await axios({
            url: getCompanyInfoUrl(this.props.Symbol),
            method: 'get',
        })
            .then(response => {
                if (response.data) {
                    CompanyInfoObj = response.data
                }
            })
            .catch(error => {
                console.log(error)
            })
        await axios({
            url: getConfigGetCreateUrl('LAST_UPDATED_HISTORICAL_QUOTES'),
            method: 'get'
        })
            .then(response => {
                console.log(response)
                lastUpdatedDate = response.data.value
            })
            .catch(error => {
                console.log(error)
            })
        if (!lastUpdatedDate) return
        if (!CompanyInfoObj.ICBCode) return;
        await axios({
            url: getStockFilter(),
            method: 'post',
            data: {
                ICBCode: CompanyInfoObj.ICBCode,
                Date: moment(lastUpdatedDate).format('YYYY-MM-DD')
            }
        })
            .then(response => {
                console.log(response)
                data1 = response.data


            })
            .catch(error => {
                console.log(error)
            })
        await axios({
            url: getStockFilter(),
            method: 'post',
            data: {
                ICBCode: CompanyInfoObj.ICBCode,
                Date: startDate + 'T00:00:00Z'
            }
        })
            .then(response => {
                console.log(response)
                data2 = response.data
            })
            .catch(error => {
                console.log(error)
            })
        console.log(data1, data2)
        if (data1.length !== data2.length) return;
        for (let i = 0; i < data1.length; i++) {
            data1[i].Stock = allStocks[data1[i].Stock].Symbol
            data1[i].YesterdayPriceClose = data2[i].PriceClose
            data1[i].PriceChange = Number(((data1[i].PriceClose - data2[i].PriceClose) * 100 / data2[i].PriceClose).toFixed(1))
            data1[i].YesterdayVolumeClose = data2[i].Volume
            data1[i].VolumeChange = Number(((data1[i].Volume - data2[i].Volume) * 100 / data2[i].Volume).toFixed(1))
            data1[i].TodayCapital = Number((data1[i].PriceClose * data1[i].Volume / 1000000000).toFixed(0))
            data1[i].MarketCap = Number((data1[i].MarketCap / 1000000000).toFixed(0))
        }
        const rowData = data1.sort((a, b) => b.MarketCap - a.MarketCap).slice(0, 10);
        const dataChart = [];
        for (let i = 0; i < rowData.length; i++) {
            let item = {
                stock: rowData[i].Stock,
                current: rowData[i].PriceClose
            }
            item[startDate] = rowData[i].YesterdayPriceClose
            dataChart.push(item)
        }
        console.log(dataChart)
        this.setState({
            rowData,
            dataChart
        })
    }

    mapArrayToKeyValue = (data) => {
        let result = {}
        data.map(item => {
            result[item.id] = item
        })
        return result
    }

    crawData = async () => {
        let allStocks = this.mapArrayToKeyValue(this.props.AllStocks)
        let data1 = [];
        let data2 = []
        let lastUpdatedDate = '';
        await axios({
            url: getConfigGetCreateUrl('LAST_UPDATED_HISTORICAL_QUOTES'),
            method: 'get'
        })
            .then(response => {
                console.log(response)
                lastUpdatedDate = response.data.value
            })
            .catch(error => {
                console.log(error)
            })
        if (!lastUpdatedDate) return
        await axios({
            method: 'get',
            url: getAnalysisUrl(moment(lastUpdatedDate).format('YYYY-MM-DD'))
        })
            .then(response => {
                console.log(response)
                data1 = response.data.sort((a, b) => a.Stock - b.Stock)
            })
            .catch(error => {
                console.log(error)
            })
        await axios({
            method: 'get',
            url: getAnalysisUrl(moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD'))
        })
            .then(response => {
                console.log(response)
                data2 = response.data.sort((a, b) => a.Stock - b.Stock)

            })
            .catch(error => {
                console.log(error)
            })
        console.log(data1, data2, allStocks)
        if (data1.length !== data2.length) return
        for (let i = 0; i < data1.length; i++) {
            data1[i].Stock = allStocks[data1[i].Stock].Symbol
            data1[i].YesterdayPriceClose = data2[i].PriceClose
            data1[i].PriceChange = ((data1[i].PriceClose - data2[i].PriceClose) * 100 / data2[i].PriceClose).toFixed(1)
            data1[i].YesterdayVolumeClose = data2[i].Volume
            data1[i].VolumeChange = ((data1[i].Volume - data2[i].Volume) * 100 / data2[i].Volume).toFixed(1)
            data1[i].TodayCapital = (data1[i].PriceClose * data1[i].Volume / 1000000000).toFixed(0)
        }
        this.setState({
            rowData: data1.filter(item => item.TodayCapital > 5 && item.PriceChange > 1)
        })
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    onChange = (date, dateString) => {
        console.log(date, dateString);
        if (dateString && dateString.length === 2) {
            this.setState({
                startDate: dateString[0],
                endDate: dateString[1]
            })
        }
    }

    handleCompare = () => {
        this.crawData2();
    }

    render() {
        const { dataChart, startDate, endDate } = this.state;
        return (
            <div className="Analysis">
                <List
                    header={<div>Analysis</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={data}
                    renderItem={item => (
                        <List.Item>
                            <div>
                                <li>{item.title}</li>
                                {
                                    item.detail && item.detail.map(i => {
                                        return <li>{i}</li>
                                    })
                                }
                            </div>
                        </List.Item>
                    )}
                />

                <RangePicker defaultValue={[moment(startDate), moment(endDate)]} onChange={this.onChange} />
                <Button onClick={this.handleCompare}>Xem</Button>

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
                <div>
                    <BarChart
                        width={500}
                        height={300}
                        data={dataChart}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="stock" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey={startDate} fill="#8884d8" />
                        <Bar dataKey="current" fill="#82ca9d" />
                    </BarChart>
                    )
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
    // setSymbol
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);