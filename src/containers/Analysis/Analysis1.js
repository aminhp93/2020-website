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


class Analysis1 extends React.Component {
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

    crawData = async (startDate, endDate) => {
        const { AllStocks } = this.props;
        let data1 = [];
        let data2 = []
        let lastUpdatedDate = '';
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
        if (!lastUpdatedDate) return

        await axios({
            url: getStockFilter(),
            method: 'post',
            data: {
                Date: endDate ? endDate : lastUpdatedDate
            }
        })
            .then(response => {
                data1 = response.data.sort((a, b) => a.Stock - b.Stock)
            })
            .catch(error => {
                console.log(error)
            })

        await axios({
            url: getStockFilter(),
            method: 'post',
            data: {
                Date: startDate ? startDate : moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z'
            }
        })
            .then(response => {
                data2 = response.data.sort((a, b) => a.Stock - b.Stock)
            })
            .catch(error => {
                console.log(error)
            })

        let mappedData = data1
        if (data1.length === data2.length) {
            mappedData = mapDataTwoDate(data1, data2, mapArrayToKeyValue(AllStocks));
        }
        if (startDate) {
            this.setState({
                rowData: mappedData.filter(item => item.TodayCapital > 5 && item.PriceChange > 1).sort((a, b) => b.TodayCapital - a.TodayCapital),
            })
        } else {
            this.setState({
                rowData: mappedData.filter(item => item.TodayCapital > 5 && item.PriceChange > 1).sort((a, b) => b.TodayCapital - a.TodayCapital),
                startDate: moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z',
                endDate: lastUpdatedDate
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
                        Danh sach nhung co phieu trong ngay MarketCap > 5 ty, ChangePrice > 1%
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

export default connect(mapStateToProps, mapDispatchToProps)(Analysis1);