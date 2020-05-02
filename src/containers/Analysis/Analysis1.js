import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { DatePicker, Button, Modal } from 'antd';
import {
    BarChartOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
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
    getCompanyInfoFilterUrl,
    getLastestFinancialInfoFilterUrl
} from '../../utils/request';

import {
    // setSymbol,
} from '../../actions/stock';
import axios from 'axios';

import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import ChartTV from '../ChartTV/ChartTV';
import Profile from '../Profile/Profile';

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
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.className = 'flex space-between'
                        ReactDOM.render(
                            <>
                                <div>{params.data.Stock}</div>
                                <div className="flex">
                                    <div onClick={() => { this.setState({ visibleChart: true, symbol: params.data.Stock }) }}><BarChartOutlined style={{ fontSize: '16px' }} /></div>
                                    <div onClick={() => { this.setState({ visibleInfo: true }) }}><InfoCircleOutlined style={{ fontSize: '16px' }} /></div>
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
                        div.innerText = Number(params.data.ICBCode)
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
                    field: 'PriceChange',
                    headerName: '%',
                    align: 'right',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = params.data.PriceChange
                        div.className = mapColorPriceChange(params.data.PriceChange)
                        return div
                    }
                },
                // {
                //     field: 'Volume',
                //     align: 'right',
                //     headerName: 'DealVolume',
                //     filter: 'agNumberColumnFilter',
                //     cellRenderer: params => {
                //         const div = document.createElement("div");
                //         div.innerText = formatNumber(params.data.DealVolume)
                //         return div
                //     }
                // },
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
                    field: 'VolumeChange',
                    align: 'right',
                    headerName: '%Volume',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.VolumeChange)
                        return div
                    }
                },
                {
                    align: 'right',
                    headerName: 'ROE',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.ROE)
                        return div
                    }
                },
                {
                    align: 'right',
                    headerName: 'EPS',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.EPS)
                        return div
                    }
                },
                {
                    align: 'right',
                    headerName: 'TT EPS cung ky',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.EPS)
                        return div
                    }
                },
                {
                    align: 'right',
                    headerName: 'TT LNST nam',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.EPS)
                        return div
                    }
                },
                {
                    align: 'right',
                    headerName: 'Point',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.EPS)
                        return div
                    }
                },
                {
                    align: 'right',
                    headerName: 'Power',
                    filter: 'agNumberColumnFilter',
                    cellRenderer: params => {
                        const div = document.createElement("div");
                        div.innerText = formatNumber(params.data.EPS)
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
            visibleChart: false,
            visibleInfo: false
        }
    }

    crawData = async (startDate, endDate) => {
        this.gridApi.showLoadingOverlay();

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

        let mappedData = mapDataTwoDate(data1, data2, mapArrayToKeyValue(AllStocks));
        if (!mappedData.length) return;
        let data = mappedData.filter(item => item.TodayCapital > 5 && item.PriceChange > 1).sort((a, b) => b.TodayCapital - a.TodayCapital)
        await axios({
            url: getCompanyInfoFilterUrl(),
            method: 'post',
            data: {
                symbols: data.map(item => item.Stock)
            }
        })
            .then(response => {
                console.log(response)
                data.map(item => {
                    const found = response.data.filter(i => i.Symbol === item.Stock)
                    if (found.length === 1) {
                        item.ICBCode = Number(found[0].ICBCode)
                    } else {
                        item.ICBCode = null
                    }
                    return item
                })
            })
            .catch(error => {
                console.log(error)
            })
        await axios({
            url: getLastestFinancialInfoFilterUrl(),
            method: 'post',
            data: {
                symbols: data.map(item => item.Stock)
            }
        })
            .then(response => {
                console.log(response)
                data.map(item => {
                    const found = response.data.filter(i => i.Symbol === item.Stock)
                    if (found.length === 1) {
                        item.ROE = Number((Number(found[0].ROE) * 100).toFixed(2))
                        item.EPS = Number((Number(found[0].EPS)).toFixed(0))
                    } else {
                        item.ROE = null
                        item.EPS = null
                    }
                    return item
                })
            })
            .catch(error => {
                console.log(error)
            })
        let dataSetState
        if (startDate) {
            dataSetState = {
                rowData: data
            }
        } else {
            dataSetState = {
                rowData: data,
                startDate: moment(lastUpdatedDate).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z',
                endDate: lastUpdatedDate
            }
        }

        this.setState(dataSetState, () => this.gridApi.hideOverlay());
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.crawData();
    };

    onChange = (date, dateString) => {
        if (dateString && dateString.length === 2) {
            this.setState({
                startDate: dateString[0] + 'T00:00:00Z',
                endDate: dateString[1] + 'T00:00:00Z'
            })
        }
    }

    handleOk = e => {
        this.setState({
            visibleChart: false,
            visibleInfo: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visibleChart: false,
            visibleInfo: false,
        });
    };

    render() {
        const { startDate, endDate, rowData,
            modules, columnDefs, defaultColDef,
            visibleChart, visibleInfo
        } = this.state;
        return (
            <div>
                <div>
                    <h1>
                        Danh sach nhung co phieu trong ngay MarketCap > 5 ty, ChangePrice > 1%
                    </h1>
                    <h2>TONG CP: {rowData.length}</h2>
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
                {visibleChart ?
                    <Modal
                        className="chartTVModal"
                        title="Basic Modal"
                        visible={visibleChart}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        header={null}
                        footer={null}
                        width={1500}
                    >
                        <div className="chartTV-container">
                            <ChartTV symbol={this.state.symbol} />
                        </div>


                    </Modal>
                    : null}
                {visibleInfo
                    ? <Modal
                        title="Basic Modal"
                        visible={visibleInfo}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                    >
                        <Profile />
                    </Modal>
                    : null}
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