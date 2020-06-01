import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button, Modal, Input, Radio, Select, Spin, Icon } from 'antd';
import { debounce, get, each } from 'lodash';
import moment from 'moment'

import {
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
    updateStock,
    scanStock
} from '../reducers/stocks';
import ChartTV from './ChartTV/ChartTV';
import Profile from './Profile';
import { IStock } from '../types'
import { analysis5ColumnDefs } from '../utils/columnDefs';

import { AgGridReact } from '@ag-grid-community/react';
import { AllModules } from '@ag-grid-enterprise/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

const { Option } = Select;
const { RangePicker } = DatePicker;


interface IProps {
    selectedSymbol: string,
    stocks: IStock,
    filterStocks: any,
    updateStock: any,
    lastUpdatedDate: any,
    scanStock: any,
    companies: any,
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
    addVN30Stock: any,
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
            columnDefs: analysis5ColumnDefs(this),
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
            addVN30Stock: [],
            data: []
        }
        this.scan = debounce(this.scan, 300);
        // this.fetchUser = debounce(this.fetchUser, 800);

    }

    fetchUser = value => {
        // this.setState({
        //     data: [],
        //     fetching: true
        // }, () => {
        //     const filteredStocks = Object.values(this.props.stocks).filter(item => {
        //         return (item.Symbol || '').toLowerCase().includes((value || '').toLowerCase())
        //     })
        //     this.setState({
        //         data: filteredStocks,
        //         fetching: false
        //     })
        // });
    };

    crawData = async (startDate = '', endDate = '') => {
        // this.gridApi.showLoadingOverlay();
        // const { lastUpdatedDate } = this.props;
        // const { stocks } = this.props;
        // let data1 = [];
        // let data2 = []

        // if (!lastUpdatedDate.value) return

        // await axios({
        //     url: getStockFilter(),
        //     method: 'post',
        //     data: {
        //         Date: endDate ? endDate : lastUpdatedDate.value
        //     }
        // })
        //     .then(response => {
        //         data1 = response.data.sort((a, b) => a.Stock - b.Stock)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        // await axios({
        //     url: getStockFilter(),
        //     method: 'post',
        //     data: {
        //         Date: startDate ? startDate : moment(lastUpdatedDate.value).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z'
        //     }
        // })
        //     .then(response => {
        //         data2 = response.data.sort((a, b) => a.Stock - b.Stock)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        // let mappedData = mapDataTwoDate(data1, data2, mapArrayToKeyValue(Object.values(stocks)));
        // if (!mappedData.length) return;
        // let data = mappedData.filter(item => item.TodayCapital > 5 && item.PriceChange > 1).sort((a, b) => b.TodayCapital - a.TodayCapital)
        // await axios({
        //     url: getCompanyInfoFilterUrl(),
        //     method: 'post',
        //     data: {
        //         symbols: data.map(item => item.Stock)
        //     }
        // })
        //     .then(response => {
        //         console.log(response)
        //         data.map(item => {
        //             const found = response.data.filter(i => i.Symbol === item.Stock)
        //             if (found.length === 1) {
        //                 item.ICBCode = Number(found[0].ICBCode)
        //             } else {
        //                 item.ICBCode = null
        //             }
        //             return item
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        // await axios({
        //     url: getLastestFinancialInfoFilterUrl(),
        //     method: 'post',
        //     data: {
        //         symbols: data.map(item => item.Stock)
        //     }
        // })
        //     .then(response => {
        //         console.log(response)
        //         data.map(item => {
        //             const found = response.data.filter(i => i.Symbol === item.Stock)
        //             if (found.length === 1) {
        //                 item.ROE = Number((Number(found[0].ROE) * 100).toFixed(2))
        //                 item.EPS = Number((Number(found[0].EPS)).toFixed(0))
        //             } else {
        //                 item.ROE = null
        //                 item.EPS = null
        //             }
        //             return item
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        // let dataSetState
        // if (startDate) {
        //     dataSetState = {
        //         rowData: data
        //     }
        // } else {
        //     dataSetState = {
        //         rowData: data,
        //         startDate: moment(lastUpdatedDate.value).add(-1, 'days').format('YYYY-MM-DD') + 'T00:00:00Z',
        //         endDate: lastUpdatedDate.value
        //     }
        // }

        // this.setState(dataSetState, () => this.gridApi.hideOverlay());
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.scan();
    };

    mapData = (data) => {
        const { companies, stocks } = this.props;
        each(data, i => {
            i.ICBCode = (companies[i.Stock] || {}).ICBCode
            i.Symbol = (stocks[i.Stock] || {}).Symbol
            return i
        })
        return data
    }

    onChange = (date, dateString) => {
        // if (dateString && dateString.length === 2) {
        //     this.setState({
        //         startDate: dateString[0] + 'T00:00:00Z',
        //         endDate: dateString[1] + 'T00:00:00Z'
        //     })
        // }
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

    changeInput = (e, index) => {
        const data = {};
        if (index === 'Symbol') {
            data[index] = e.target.value.toUpperCase();
        } else if (index === 'TodayCapital') {
            if (e.target.value.match(/\D/)) return
            data[index] = Number(e.target.value);
        } else {
            data[index] = e.target.value
        }

        const dataRequest = { ...this.state, ...data }
        this.scan(dataRequest)
        this.setState(data)
    }

    scan = async (data = null) => {
        let defaultFilter = {
            TodayCapital: 5000000000
        }
        data = { ...defaultFilter, ...data }
        this.gridApi.showLoadingOverlay();
        const res = await this.props.scanStock(data);
        this.gridApi.hideOverlay()
        this.setState({
            rowData: this.mapData(res.data)
        })
    }

    changeType = async (e) => {
        const data = { type: e.target.value };
        const dataRequest = { ...this.state, ...data }
        this.scan(dataRequest)
        this.setState({
            type: e.target.value
        })
        //     const data = {}
        //     data[type.target.value] = true
        //     console.log(type.target.value, data)
        //     const res = await this.props.filterStocks(data)
        //     await axios({
        //         url: getLastestFinancialInfoFilterUrl(),
        //         method: 'post',
        //         data: {
        //             symbols: res.data.map(item => item.Symbol)
        //         }
        //     })
        //         .then(response => {
        //             console.log(response)
        //             this.setState({
        //                 rowData: response.data
        //             })
        //         })
        //         .catch(error => {
        //             console.log(error)
        //         })

    }

    handleChangeVN30 = value => {
        // console.log(value)
        // this.setState({
        //     data: [],
        //     fetching: false,
        //     addVN30Stock: value
        // })
    }

    handleAdd = async () => {
        // await this.props.updateStock(this.state.addVN30Stock)
        // this.setState({ addVN30Stock: [] })
        // const data = {}
        // data[this.state.type] = true
        // const res = await this.props.filterStocks(data)
        // await axios({
        //     url: getLastestFinancialInfoFilterUrl(),
        //     method: 'post',
        //     data: {
        //         symbols: res.data.map(item => item.Symbol)
        //     }
        // })
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //             rowData: response.data
        //         })
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    render() {
        const { startDate, endDate, rowData,
            modules, columnDefs, defaultColDef,
            visibleChart, visibleInfo, type,
            fetching, data, addVN30Stock
        } = this.state;
        return (
            <div>
                <div>
                    <div>Count: {rowData.length}</div>
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
                            <Input addonBefore="TodayCapital" onChange={(e) => this.changeInput(e, 'TodayCapital')} defaultValue={5000000000} />
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
                    value={addVN30Stock}
                    placeholder="Select stock"
                    notFoundContent={fetching ? <Spin size="small" /> : null}
                    filterOption={false}
                    onSearch={this.fetchUser}
                    onChange={this.handleChangeVN30}
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
        lastUpdatedDate: get(state, 'lastUpdatedDate'),
        companies: get(state, 'companies')
    }
}

const mapDispatchToProps = {
    filterStocks,
    updateStock,
    scanStock

}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis5);


