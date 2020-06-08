import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import { get } from 'lodash';

import {
    mapColorPriceChange,
    formatNumber,
    mapArrayToKeyValue,
    mapDataTwoDate
} from '../utils/all';
import {
    getConfigGetCreateUrl,
    getStockFilter,
    getCompanyInfoUrl
} from '../utils/request';
import AnalysisComponent from './AnalysisComponent';
import { IStock } from '../types'


const { RangePicker } = DatePicker;

interface IProps {
    selectedSymbol: string,
    stocks: IStock,
}

interface IState {
    startDate: any,
    endDate: any,
    modules: any,
    columnDefs: any,
    defaultColDef: any,
    rowData: any,
}

class Analysis2 extends React.Component<IProps, IState> {
    gridApi: any;
    gridColumnApi: any;

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
        if (this.props.selectedSymbol !== preProps.selectedSymbol) {
            this.crawData();
        }
    }

    crawData = async (startDate = '', endDate = '') => {
        const { stocks, selectedSymbol } = this.props;
        let data1 = [];
        let data2 = []
        let lastUpdatedDate = '';
        let CompanyInfoObj = null
        await axios({
            url: getCompanyInfoUrl(selectedSymbol),
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
        if (!lastUpdatedDate || !CompanyInfoObj) return

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

        let mappedData = mapDataTwoDate(data1, data2, mapArrayToKeyValue(Object.values(stocks)));
        if (!mappedData.length) return;

        const rowData = mappedData.sort((a, b) => b.MarketCap - a.MarketCap).slice(0, 10);
        for (let i = 0; i < rowData.length; i++) {
            let item = {
                stock: rowData[i].Stock,
            }
            item[startDate ? startDate : moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z'] = rowData[i].YesterdayPriceClose
            item[endDate ? endDate : lastUpdatedDate] = rowData[i].PriceClose

        }
        console.log(rowData)

        if (startDate) {
            this.setState({
                rowData,
            })
        } else {
            this.setState({
                rowData,
                startDate: moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z',
                endDate: lastUpdatedDate,
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
        const {
            startDate, endDate,
            modules, columnDefs, defaultColDef,
            rowData
        } = this.state;
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
                            modules={modules}
                            columnDefs={columnDefs}
                            defaultColDef={defaultColDef}
                            onGridReady={this.onGridReady}
                            rowData={rowData}
                            onFirstDataRendered={params => params.api.sizeColumnsToFit()}
                        />
                    </div>
                </div>
                <div className="flex">
                    {
                        ['VND', 'VCB', 'PVD'].map(item => {
                            return <AnalysisComponent symbol={item} startDate={startDate} endDate={endDate} />
                        })
                    }
                </div>
                <div className="flex">
                    {
                        ['VNM', 'FPT', 'VIC'].map(item => {
                            return <AnalysisComponent symbol={item} startDate={startDate} endDate={endDate} />
                        })
                    }
                </div>
                <div className="flex">
                    {
                        ['VJC', 'HPG', 'ROS'].map(item => {
                            return <AnalysisComponent symbol={item} startDate={startDate} endDate={endDate} />
                        })
                    }
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        selectedSymbol: get(state, 'selectedSymbol'),
        stocks: get(state, 'stocks'),
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis2);