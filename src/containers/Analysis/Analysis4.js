import React from 'react';
import { connect } from 'react-redux';
import { DatePicker, Button } from 'antd';
import moment from 'moment';
import axios from 'axios';
import {
    BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import { AgGridReact } from '@ag-grid-community/react';
import { AllCommunityModules } from '@ag-grid-community/all-modules';
import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';

import {
    mapColorPriceChange,
    formatNumber,
    mapArrayToKeyValue,
    mapDataTwoDate
} from '../../utils/all';
import { BILLION_UNIT } from '../../utils/unit';
import {
    getYearlyFinancialInfoColumnDefs,
    getQuarterlyFinancialInfoColumnDefs
} from '../../utils/columnDefs';
import {
    getYearlyFinancialInfoFilterUrl,
    getQuarterlyFinancialInfoFilterUrl
} from '../../utils/request';

import {
    // setSymbol,
} from '../../actions/stock';

import AnalysisComponent from '../../components/Analysis';

const { RangePicker } = DatePicker;


class Analysis4 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modules: AllCommunityModules,
            columnDefs: [],
            defaultColDef: {
                flex: 1,
                filter: true,
                sortable: true,
            },
            rowData: [],
        }
    }

    componentDidMount() {
        this.crawData()
    }

    componentDidUpdate(preProps) {
        console.log('componentDidUpdate Analysis4', this.props, preProps)
        if (this.props.Symbol !== preProps.Symbol) {
            this.crawData();
        }
    }

    crawData = () => {
        const { AllStocksObj, Symbol: symbol } = this.props;
        // axios({
        //     method: 'post',
        //     url: getYearlyFinancialInfoFilterUrl(),
        //     data: {
        //         ICBCode: 8777,
        //     }
        // })
        //     .then(response => {
        //         console.log(response)
        //         this.setState({
        //             columnDefs: getYearlyFinancialInfoColumnDefs(),
        //             rowData: response.data.filter(item => item.Year === '2018').map(item => {
        //                 item.Stock = AllStocksObj[item.Stock].Symbol
        //                 return item
        //             })
        //         })

        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        axios({
            method: 'post',
            url: getQuarterlyFinancialInfoFilterUrl(),
            data: {
                symbol
            }
        })
            .then(response => {
                console.log(response)
                let data = response.data.map(item => {
                    item.Stock = AllStocksObj[item.Stock].Symbol
                    return item
                }).sort((a, b) => {
                    if (a.Year < b.Year) return 1
                    if (a.Year > b.Year) return -1
                    if (a.Quarter < b.Quarter) return 1
                    if (a.Quarter > b.Quarter) return -1
                    return 0
                })
                console.log(data)
                this.setState({
                    columnDefs: getQuarterlyFinancialInfoColumnDefs(),
                    rowData: data
                })

            })
            .catch(error => {
                console.log(error)
            })
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
    };

    render() {
        return (
            <div>
                <h1>Analysis3</h1>
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
        AllStocksObj: state.stock.AllStocksObj
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Analysis4);