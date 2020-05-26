import React from 'react';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import { DatePicker, Button, Modal, Input, Radio, Select, Spin } from 'antd';
import { debounce, get } from 'lodash';
import {
    BarChartOutlined,
    InfoCircleOutlined
} from '@ant-design/icons';
import moment from 'moment'
    ;
import {
    mapColorPriceChange,
    formatNumber,
    mapArrayToKeyValue,
    mapDataTwoDate
} from '../utils/all';
import {
    getConfigGetCreateUrl,
    getStockFilter,
    getCompanyInfoFilterUrl,
    getLastestFinancialInfoFilterUrl,
    getStockScanUrl
} from '../utils/request';
import {
    filterStocks,
    updateStock
} from '../reducers/stocks';
import axios from 'axios';

import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';

import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
import ChartTV from './ChartTV/ChartTV';
import Profile from './Profile';
import { IStock } from '../types'

const { Option } = Select;

const { RangePicker } = DatePicker;

interface IProps {
    selectedSymbol: string,
    stocks: IStock,
    filterStocks: any,
    updateStock: any,
}

interface IState {
    modules: any,
    columnDefs: any,
    defaultColDef: any,
    rowData: any,
    visibleChart: boolean,
    visibleInfo: boolean,
    symbol: string,
    startDate: string,
    endDate: string,
    type: string,
    addVN30Stock: string,
    value?: any,
    data?: any,
    fetching?: boolean,

}

class Analysis5 extends React.Component<IProps, IState> {
    gridApi: any;
    gridColumnApi: any;

    constructor(props) {
        super(props);
        this.state = {
            type: 'default',
            symbol: '',
            modules: AllModules,
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
                minWidth: 100,
                enableValue: true,
                enableRowGroup: true,
                enablePivot: true,
            },
            rowData: [],
            startDate: '',
            endDate: '',
            visibleChart: false,
            visibleInfo: false,
            addVN30Stock: '',
            data: []
        }
        this.scan = debounce(this.scan, 300);
        this.fetchUser = debounce(this.fetchUser, 800);

    }

    fetchUser = value => {
        this.setState({
            data: [],
            fetching: true
        }, () => {
            const filteredStocks = Object.values(this.props.stocks).filter(item => {
                return (item.Symbol || '').toLowerCase().includes((value || '').toLowerCase())
            })
            this.setState({
                data: filteredStocks,
                fetching: false
            })
        });
    };

    crawData = async (startDate = '', endDate = '') => {
        this.gridApi.showLoadingOverlay();

        const { stocks } = this.props;
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

        let mappedData = mapDataTwoDate(data1, data2, mapArrayToKeyValue(Object.values(stocks)));
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

    scan = () => {
        console.log(this.state)
        axios({
            url: getStockScanUrl(),
            method: 'post',
            data: this.state
        })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    changeInput = (e, index) => {
        const data = {};
        data[index] = e.target.value;
        this.setState(data, () => this.scan());
    }

    changeType = (type) => {
        this.setState({
            type: type.target.value
        }, () => {
            const data = {}
            data[type.target.value] = true
            console.log(type.target.value, data)
            this.props.filterStocks(data)
        })
    }

    handleChange = (e) => {
        console.log(e)
        this.setState({
            addVN30Stock: e[0].key
        })
    }

    handleAdd = () => {
        this.props.updateStock({ data: this.state.addVN30Stock })
    }



    render() {
        const { startDate, endDate, rowData,
            modules, columnDefs, defaultColDef,
            visibleChart, visibleInfo, type,
            value, fetching, data
        } = this.state;
        return (
            <div>
                <div>
                    <div>

                        <Radio.Group value={type} onChange={this.changeType}>
                            <Radio.Button value="IsVN30">VN30</Radio.Button>
                            <Radio.Button value="IsFavorite">Favorite</Radio.Button>
                            <Radio.Button value="default">Default</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div>
                        <div className="flex">
                            <Input addonBefore="Symbol" onChange={(e) => this.changeInput(e, 'Symbol')} />
                            <Input addonBefore="ICBCode" onChange={(e) => this.changeInput(e, 'ICBCode')} />
                            <Input addonBefore="Price" onChange={(e) => this.changeInput(e, 'Price')} />
                            <Input addonBefore="%ChangePrice" onChange={(e) => this.changeInput(e, 'ChangePrice')} />
                            <Input addonBefore="TodayCapital" onChange={(e) => this.changeInput(e, 'TodayCapital')} />
                        </div>
                        <div className="flex">
                            <Input addonBefore="%Volume" onChange={(e) => this.changeInput(e, 'ChangeVolume')} />
                            <Input addonBefore="ROE" onChange={(e) => this.changeInput(e, 'ROE')} />
                            <Input addonBefore="EPS" onChange={(e) => this.changeInput(e, 'EPS')} />
                            <Input addonBefore="TT EPS" onChange={(e) => this.changeInput(e, 'ChangeEPS')} />
                            <Input addonBefore="TT LNST nam" onChange={(e) => this.changeInput(e, 'ChangeYearlyProfit')} />
                        </div>
                        <div className="flex">
                            <Input addonBefore="Buy Foreigner" onChange={(e) => this.changeInput(e, 'BuyForeigner')} />
                            <Input addonBefore="Sell Foreigner" onChange={(e) => this.changeInput(e, 'SellForeinger')} />
                            <Input addonBefore="None" onChange={(e) => this.changeInput(e, 'None')} />
                            <Input addonBefore="None" onChange={(e) => this.changeInput(e, 'None')} />
                            <Input addonBefore="None" onChange={(e) => this.changeInput(e, 'None')} />
                        </div>


                    </div>
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
                            sideBar={true}
                            onFirstDataRendered={params => params.api.sizeColumnsToFit()}
                        />
                    </div>
                </div>
                {type === 'IsVN30' ? <><Select
                    mode="multiple"
                    labelInValue
                    value={value}
                    placeholder="Select stock"
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={this.fetchUser}
                    onChange={this.handleChange}
                    style={{ width: '200px' }}
                >
                    {data.map(d => (
                        <Option key={d.Symbol}>{d.Symbol}</Option>
                    ))}
                </Select><Button onClick={this.handleAdd}>Add</Button></> : null}
                {visibleChart ?
                    <Modal
                        className="chartTVModal"
                        title="Basic Modal"
                        visible={visibleChart}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
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
    return {
        selectedSymbol: get(state, 'selectedSymbol'),
        stocks: get(state, 'stocks'),
    }
}

const mapDispatchToProps = {
    filterStocks,
    updateStock
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis5);


