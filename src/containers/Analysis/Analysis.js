import React from 'react';
import { connect } from 'react-redux';
import { List, Table } from 'antd';
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


const data = [
    {
        'title': 'Level 1: Understand the detail of each row if financial reports'
    },
    {
        'title': 'Level 2: Analyze the indicator (PE, EPS, ROE, ROA)'
    },
    {
        'title': 'Level 3: Be aware of the financial fraud in financial report to be away from these stocks'
    },
    {
        'title': 'Level 4: Point out the opportunities in short term investment',
        'detail': [
            'Nha may sap het khau hao',
            'Loi nhuan dot bien tu hoan nhap du phong',
            'Loi nhuan tu viec ban giao du an',
            'Loi nhuan tu nhu cau tang cao dot bien',
            'Loi nhuan tu tich tru hang ton kho gia re',
            'Loi nhuan tu bien dong ty gia',
        ]
    },
    {
        'title': "Level 5: Big picture of business in real life",
        'detail': [
            'Tu phan tich bao cao tai chinh, danh gia: loi the canh tranh, vi the doanh nghiep',
            'Danh gia phong cach quan tri, kinh doanh, rui ro, doi xu voi co dong.. cua ban lanh dao --> ben vung cua doanh nghiep',
            'Suc khoe tai chinh trong tuong lai: ket qua kinh doanh, hieu qua kinh doanh, kha nang sinh loi dai han',
            'Danh gia 3 nam, 5 nam, 10 nam',
        ]
    },
    {
        'title': "Note",
        'detail': [
            'Bang financial info thuong update trong vong 3 thang --> danh gia tinh hinh doanh nghiep chung'
        ]
    },
    {
        'title': "Crawdata1",
        'detail': [
            'Lay du lieu hang ngay nhung CP TodayCapital > 5 ty, %Change in Price > 1%'
        ]
    },
    {
        'title': "Crawdata2",
        'detail': [
            'Lay nhung CP cung nganh'
        ]
    }
];

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
                minWidth: 150,
                filter: true,
                sortable: true,
            },
            rowData: [],
        }
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Analysis', this.props, preProps)
        if (this.props.Symbol !== preProps.Symbol) {
            this.crawData2();
        }
    }

    componentDidMount() {
        // this.crawData();
        this.crawData2();
    }

    crawData2 = async () => {
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
                Date: moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD')
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
        this.setState({
            rowData: data1
        })
    }

    mapArrayToKeyValue = (data) => {
        let result = {}
        data.map(item => {
            result[item.id] = item
        })
        console.log(116, result)
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

    render() {
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


                <div style={{ width: '100%', height: '100%' }}>
                    <div
                        id="myGrid"
                        style={{
                            height: '500px',
                            // width: '800px',
                        }}
                        className="ag-theme-alpine"
                    >
                        <AgGridReact
                            modules={this.state.modules}
                            columnDefs={this.state.columnDefs}
                            defaultColDef={this.state.defaultColDef}
                            onGridReady={this.onGridReady}
                            rowData={this.state.rowData}
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
    // setSymbol
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis);